import {
  Table,
  Column,
  PrimaryKey,
  IsUUID,
  DataType,
  Default,
  Model,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./users.model";

@Table
export class Product extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;
}
