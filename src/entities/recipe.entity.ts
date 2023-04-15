import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

export interface IRecipe {
  title: string;
  ingredients: string[];
  instructions: { type: string; text: string }[];
  times: string[];
  image: string;
}

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
