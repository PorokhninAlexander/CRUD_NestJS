import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupMDto } from './dto/create-group-m.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GroupM, GroupMDocument } from './schemas/group-m.schema';
import { Model, Types } from 'mongoose';
import { UserM, UserMDocument } from '../user-m/schemas/user-m.schema';

@Injectable()
export class GroupMService {
  constructor(
    @InjectModel(GroupM.name)
    public readonly groupMModel: Model<GroupMDocument>,
    @InjectModel(UserM.name)
    public readonly userMModel: Model<UserMDocument>,
  ) {}
  async create(createGroupMDto: CreateGroupMDto) {
    await this.checkIdArrInBase(createGroupMDto);
    const newGroupM = new this.groupMModel(createGroupMDto);
    const result = await newGroupM.save();
    await this.userMModel.updateMany(
      {
        _id: { $in: createGroupMDto.members },
      },
      { $push: { groups: Types.ObjectId(result._id) } },
    );
    return this.groupMModel
      .findById(result._id)
      .populate('members', 'user_name');
  }

  async findAll() {
    return await this.groupMModel
      .find()
      .populate('members', 'user_name')
      .exec();
  }

  async findOne(id: string) {
    await this.checkId(id);
    return this.groupMModel.findById(id).populate('members', 'user_name');
  }

  async update(id: string, updateGroupMDto: Partial<CreateGroupMDto>) {
    await this.checkId(id);
    await this.checkIdArrInBase(updateGroupMDto);
    const result = await this.groupMModel
      .findByIdAndUpdate(id, updateGroupMDto, {
        new: true,
        useFindAndModify: false,
      })
      .populate('members', ['user_name']);
    await this.userMModel.bulkWrite([
      {
        updateMany: {
          filter: {
            _id: {
              $in: result.members,
            },
            groups: {
              $not: {
                $elemMatch: { $eq: result._id },
              },
            },
          },
          update: {
            $push: { groups: result._id },
          },
        },
      },
      {
        updateMany: {
          filter: {
            groups: {
              $elemMatch: { $eq: result._id },
            },
            _id: {
              $not: {
                $in: result.members,
              },
            },
          },
          update: {
            $pullAll: { groups: [id] },
          },
        },
      },
    ]);
    return this.groupMModel.findById(id).populate('members', 'user_name');
  }

  async remove(id: string) {
    await this.checkId(id);
    const result = await this.groupMModel.findByIdAndRemove(id);
    await this.userMModel.updateMany(
      {
        _id: { $in: result.members },
      },
      { $pullAll: { groups: [id] } },
    );
    return { deleted: true };
  }

  //  HELP FUNCTIONS

  async checkIdArrInBase(group): Promise<any> {
    const membersIdArr = group.members;
    if (membersIdArr) {
      const members = await this.userMModel.find({
        _id: { $in: membersIdArr },
      });
      if (members.length !== membersIdArr.length) {
        throw new BadRequestException('One or any members not found');
      }
    }
  }

  async checkId(id) {
    const object = await this.groupMModel.findById(id);
    if (!object) throw new BadRequestException(`Group with id ${id} not found`);
  }
}
