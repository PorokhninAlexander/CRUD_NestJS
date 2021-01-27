import { Injectable } from '@nestjs/common';
import { CreateUserMDto } from './dto/create-user-m.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserMDocument, UserM } from './schemas/user-m.schema';
import { GroupM, GroupMDocument } from '../group-m/schemas/group-m.schema';

@Injectable()
export class UserMService {
  constructor(
    @InjectModel(UserM.name)
    private readonly userMModel: Model<UserMDocument>,
    @InjectModel(GroupM.name)
    readonly groupMModel: Model<GroupMDocument>,
  ) {}
  async create(createUserMDto: any) {
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
      .populate('members', 'user_name');
  }

  async findAll(): Promise<UserM[]> {
    return this.userMModel
      .find()
      .populate('groups', ['group_name'])
      .populate('friends', ['user_name'])
      .exec();
  }

  async findOne(id: string): Promise<UserM> {
    return this.userMModel.findById(id);
  }

  async update(
    id: string,
    updateUserMDto: Partial<CreateUserMDto>,
  ): Promise<UserM> {
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
    const userObj = await this.userMModel.findById(id);
    await this.groupMModel.updateMany(
      {
        _id: { $in: userObj.groups },
      },
      { $pullAll: { members: [Types.ObjectId(id)] } },
    );
    return this.userMModel.findByIdAndRemove(id);
  }
}
