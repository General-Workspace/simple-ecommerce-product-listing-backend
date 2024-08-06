import {
  Table,
  Column,
  PrimaryKey,
  IsUUID,
  Default,
  DataType,
  Model,
  HasMany,
} from "sequelize-typescript";
import { Product } from "./products.model";

@Table
export class User extends Model {
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
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @HasMany(() => Product)
  products!: Product[];
}
