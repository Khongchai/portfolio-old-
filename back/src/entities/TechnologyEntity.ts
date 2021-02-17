import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { ProjectEntity } from "./ProjectEntity";

@ObjectType()
@Entity()
export class TechnologyEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Field(() => [ProjectEntity], { nullable: true })
  @ManyToMany(() => ProjectEntity, (proj) => proj.technologiesUsed, {
    cascade: true,
  })
  @JoinTable()
  usedIn: ProjectEntity[];
}
