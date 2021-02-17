import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from "typeorm";
import { TechnologyEntity } from "./TechnologyEntity";

@ObjectType()
@Entity()
export class ProjectEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => [TechnologyEntity], { nullable: true })
  @ManyToMany(() => TechnologyEntity, (tech) => tech.usedIn)
  technologiesUsed: TechnologyEntity[];

  //format: YYYY-MM-DD
  @Field()
  @Column()
  startDate!: string;

  @Field()
  @Column()
  endDate!: string;
}
