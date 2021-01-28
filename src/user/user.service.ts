import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Group } from '../group/entities/group.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['groups', 'friends'] });
  }

  async findOne(id: number): Promise<User> {
    await this.checkId(id);
    return await this.userRepository.findOne(id, {
      relations: ['groups', 'friends'],
    });
  }

  async create(createUserDto: any): Promise<User> {
    const newUserDto = await this.updateArrForCU(createUserDto);
    const result = await this.userRepository.save(newUserDto);
    return this.userRepository.findOne(result.user_id, {
      relations: ['groups', 'friends'],
    });
  }

  async update(id: number, updateUserDto: any) {
    await this.checkId(id);
    const newUserDto = await this.updateArrForCU(updateUserDto, id);
    newUserDto.user_id = id;
    await this.userRepository.save(newUserDto);
    return this.userRepository.findOne(id, {
      relations: ['groups', 'friends'],
    });
  }

  async remove(id: number): Promise<any> {
    await this.checkId(id);
    await this.userRepository.delete(id);
    return { deleted: true };
  }

  //  HELP FUNCTIONS
  async updateArrForCU(userDto, id?): Promise<any> {
    await this.checkIdArrInBase(userDto, id);
    const groupsIdArr = userDto.groups;
    const friendsIdArr = userDto.friends;

    if (groupsIdArr) {
      userDto.groups = groupsIdArr.map((groupId) => {
        return {
          group_id: groupId,
        };
      });
    }

    if (friendsIdArr) {
      userDto.friends = friendsIdArr.map((friendId) => {
        return {
          user_id: friendId,
        };
      });
    }

    return userDto;
  }

  async checkIdArrInBase(userDto, id?): Promise<any> {
    const groupsIdArr = userDto.groups;
    const friendsIdArr = userDto.friends;
    if (id && friendsIdArr.includes(id)) {
      throw new BadRequestException(`Friends array can't have id ${id}`);
    }
    if (friendsIdArr) {
      const friends = await this.userRepository.findByIds(friendsIdArr);
      if (friends.length !== friendsIdArr.length) {
        throw new BadRequestException('One or any friends not found');
      }
    }

    if (groupsIdArr) {
      const groups = await this.groupRepository.findByIds(groupsIdArr);
      if (groups.length !== groupsIdArr.length) {
        throw new BadRequestException('One or any groups not found');
      }
    }
  }

  async checkId(id) {
    const object = await this.userRepository.findOne(id);
    if (!object) throw new BadRequestException(`User with id ${id} not found`);
  }
}
