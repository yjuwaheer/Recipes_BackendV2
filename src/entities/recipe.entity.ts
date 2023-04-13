import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text", {
    array: true,
  })
  ingredients!: string[];

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  instructions!: Array<{ type: string; text: string }>;

  @Column("text", {
    array: true,
  })
  times!: string[];

  @Column()
  image!: string;
}
