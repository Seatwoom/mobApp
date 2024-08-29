import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  user!: User;

  @Column("text")
  task!: string;

  @Column({ default: false })
  completed!: boolean;
}
