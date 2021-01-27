import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['groups', 'friends'] });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id, {
      relations: ['groups', 'friends'],
    });
  }

  async create(createUserDto: any): Promise<User> {
    const newUserDto = this.updateArrForCU(createUserDto);
    const result = await this.userRepository.save(newUserDto);
    return this.userRepository.findOne(result.user_id, {
      relations: ['groups', 'friends'],
    });
  }

  async update(id: number, updateUserDto: any) {
    const newUserDto = this.updateArrForCU(updateUserDto);
    newUserDto.user_id = id;
    await this.userRepository.save(newUserDto);
    return this.userRepository.findOne(id, {
      relations: ['groups', 'friends'],
    });
  }

  async remove(id: number): Promise<any> {
    await this.userRepository.delete(id);
    return { deleted: true };
  }

  //  HELP FUNCTION
  updateArrForCU(userDto): any {
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
}
