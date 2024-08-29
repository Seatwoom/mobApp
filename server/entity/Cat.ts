import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.cats, { onDelete: "CASCADE" })
  user!: User;

  @Column("jsonb")
  cat_data!: object;
}
