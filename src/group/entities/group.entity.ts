import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity({ name: 'group', synchronize: true })
export class Group {
  @PrimaryGeneratedColumn()
  group_id: number;

  @Column()
  group_name: string;

  @ManyToMany(() => User, { nullable: true })
  @JoinTable({
    name: 'user_group_join',
    joinColumn: {
      name: 'group',
      referencedColumnName: 'group_id',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'user_id',
    },
  })
  members: User[];
}
