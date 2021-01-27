import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Group } from '../../group/entities/group.entity';

@Entity({ name: 'user', synchronize: true })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_name: string;
  //

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  friends: User[];

  @ManyToMany(() => Group, { nullable: true })
  @JoinTable({
    name: 'user_group_join',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'group',
      referencedColumnName: 'group_id',
    },
  })
  groups: Group[];
}
