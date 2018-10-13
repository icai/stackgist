import { Model, Table, PrimaryKey, Column, ForeignKey } from 'sequelize-typescript';
import { Author } from './Author';

@Table
export class AuthorFriend extends Model<AuthorFriend> {

  @ForeignKey(() => Author)
  @PrimaryKey
  @Column
  authorId: number;

  @ForeignKey(() => Author)
  @PrimaryKey
  @Column
  friendId: number;
}
