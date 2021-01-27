import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.groupMModel.find().populate('members', 'user_name').exec();
  }

  findOne(id: string) {
    return this.groupMModel.findById(id).populate('members', 'user_name');
  }

  async update(id: string, updateGroupMDto: Partial<CreateGroupMDto>) {
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
    const result = await this.groupMModel.findByIdAndRemove(id);
    await this.userMModel.updateMany(
      {
        _id: { $in: result.members },
      },
      { $pullAll: { groups: [id] } },
    );
    return { deleted: true };
  }
}
