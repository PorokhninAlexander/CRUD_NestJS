import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserMDto, UpdateUserMDto } from './dto/create-user-m.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserMDocument, UserM } from './schemas/user-m.schema';
import { GroupM, GroupMDocument } from '../group-m/schemas/group-m.schema';
import { UpdateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class UserMService {
  constructor(
    @InjectModel(UserM.name)
    private readonly userMModel: Model<UserMDocument>,
    @InjectModel(GroupM.name)
    readonly groupMModel: Model<GroupMDocument>,
  ) {}
  async create(createUserMDto: any) {
    await this.checkIdArrInBase(createUserMDto);
    const newUserM = new this.userMModel(createUserMDto);
    const result = await newUserM.save();
    await this.groupMModel.updateMany(
      {
        _id: { $in: createUserMDto.groups },
      },
      { $push: { members: Types.ObjectId(result._id) } },
    );
    return this.userMModel
      .findById(result._id)
      .populate('groups', ['group_name'])
      .populate('friends', ['user_name']);
  }

  async findAll(): Promise<UserM[]> {
    return this.userMModel
      .find()
      .populate('groups', ['group_name'])
      .populate('friends', ['user_name'])
      .exec();
  }

  async findOne(id: string): Promise<UserM> {
    await this.checkId(id);
    return this.userMModel
      .findById(id)
      .populate('groups', ['group_name'])
      .populate('friends', ['user_name']);
  }

  async update(id: string, updateUserMDto: any): Promise<UserM> {
    await this.checkId(id);
    await this.checkIdArrInBase(updateUserMDto);
    const result = await this.userMModel
      .findByIdAndUpdate(id, updateUserMDto, {
        new: true,
        useFindAndModify: false,
      })
      .populate('groups', ['group_name'])
      .populate('friends', ['user_name']);
    await this.groupMModel.bulkWrite([
      {
        updateMany: {
          filter: {
            _id: {
              $in: result.groups,
            },
            members: {
              $not: {
                $elemMatch: { $eq: result._id },
              },
            },
          },
          update: {
            $push: { members: result._id },
          },
        },
      },
      {
        updateMany: {
          filter: {
            members: {
              $elemMatch: { $eq: result._id },
            },
            _id: {
              $not: {
                $in: result.groups,
              },
            },
          },
          update: {
            $pullAll: { members: [Types.ObjectId(id)] },
          },
        },
      },
    ]);
    return this.userMModel
      .findById(id)
      .populate('groups', ['group_name'])
      .populate('friends', ['user_name']);
  }

  async remove(id: string): Promise<UserM> {
    await this.checkId(id);
    const userObj = await this.userMModel.findById(id);
    await this.groupMModel.updateMany(
      {
        _id: { $in: userObj.groups },
      },
      { $pullAll: { members: [Types.ObjectId(id)] } },
    );

    return this.userMModel.findByIdAndRemove(id);
  }

  //  HELP FUNCTION

  async checkIdArrInBase(user): Promise<any> {
    const groupsIdArr = user.groups;
    const friendsIdArr = user.friends;
    if (friendsIdArr) {
      const friends = await this.userMModel.find({
        _id: { $in: friendsIdArr },
      });
      if (friends.length !== friendsIdArr.length) {
        throw new BadRequestException('One or any friends not found');
      }
    }

    if (groupsIdArr) {
      const groups = await this.groupMModel.find({
        _id: { $in: groupsIdArr },
      });
      if (groups.length !== groupsIdArr.length) {
        throw new BadRequestException('One or any groups not found');
      }
    }
  }

  async checkId(id) {
    const object = await this.userMModel.findById(id);
    if (!object) throw new BadRequestException(`User with id ${id} not found`);
  }
}
