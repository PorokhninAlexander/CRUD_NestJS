import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createGroupDto) {
    const newGroupDto = await this.updateArrForCU(createGroupDto);
    const newGroup = await this.groupRepository.save(newGroupDto);
    return this.groupRepository.findOne(newGroup.group_id, {
      relations: ['members'],
    });
  }

  async update(id: number, updateGroupDto: any) {
    await this.checkId(id);
    const newGroupDto = await this.updateArrForCU(updateGroupDto);
    newGroupDto.group_id = id;
    await this.groupRepository.save(newGroupDto);
    return this.groupRepository.findOne(id, { relations: ['members'] });
  }

  async findAll() {
    return await this.groupRepository.find({ relations: ['members'] });
  }

  async findOne(id: number) {
    await this.checkId(id);
    return this.groupRepository.findOne(id, { relations: ['members'] });
  }

  async remove(id: number) {
    await this.checkId(id);
    await this.groupRepository.delete(id);
    return { deleted: true };
  }

  //  HELP FUNCTIONS

  async updateArrForCU(groupDto) {
    await this.checkIdArrInBase(groupDto);
    if (groupDto.members) {
      groupDto.members = groupDto.members.map((userId) => {
        return {
          user_id: userId,
        };
      });
    }
    return groupDto;
  }

  async checkIdArrInBase(groupDto): Promise<any> {
    const membersIdArr = groupDto.members;
    if (membersIdArr) {
      const members = await this.userRepository.findByIds(membersIdArr);
      if (members.length !== membersIdArr.length) {
        throw new BadRequestException('One or any members not found');
      }
    }
  }

  async checkId(id) {
    const object = await this.groupRepository.findOne(id);
    if (!object) throw new BadRequestException(`Group with id ${id} not found`);
  }
}
