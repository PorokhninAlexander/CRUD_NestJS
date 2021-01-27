import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}
  async create(createGroupDto) {
    const newGroupDto = this.updateArrForCU(createGroupDto);
    const newGroup = await this.groupRepository.save(newGroupDto);
    return this.groupRepository.findOne(newGroup.group_id, {
      relations: ['members'],
    });
  }

  async update(id: number, updateGroupDto: any) {
    const newGroupDto = this.updateArrForCU(updateGroupDto);
    newGroupDto.group_id = id;
    await this.groupRepository.save(newGroupDto);
    return this.groupRepository.findOne(id, { relations: ['members'] });
  }

  findAll() {
    return this.groupRepository.find({ relations: ['members'] });
  }

  findOne(id: number) {
    return this.groupRepository.findOne(id, { relations: ['members'] });
  }

  async remove(id: number) {
    await this.groupRepository.delete(id);
    return { deleted: true };
  }

  //  HELP FUNCTION

  updateArrForCU(groupDto): any {
    if (groupDto.members) {
      groupDto.members = groupDto.members.map((userId) => {
        return {
          user_id: userId,
        };
      });
    }
    return groupDto;
  }
}
