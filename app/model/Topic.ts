import { Table, Model, PrimaryKey, AutoIncrement, Column, BelongsToMany } from 'sequelize-typescript';
import { Post } from './Post';
import { PostTopic } from './PostTopic';

@Table({
  tableName: 'Thing'
})
export class Topic extends Model<Topic> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({
    field: 'comment'
  })
  description: string;

  @BelongsToMany(() => Post, () => PostTopic)
  post: Post[];

}
