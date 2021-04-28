import { Context } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { TechnologyEntity } from "../entities/TechnologyEntity";

@ObjectType()
export class ErrorField {
  @Field()
  error?: string;

  @Field({ nullable: true })
  description?: string;
}

@Resolver()
export class TechnologyResolver {
  @Query(() => [TechnologyEntity])
  async technologies(): Promise<TechnologyEntity[]> {
    const technologies = await TechnologyEntity.find({
      relations: ["frontEndIn", "backEndIn", "languageOf", "hosting"],
    });
    return technologies;
  }

  @Mutation(() => TechnologyEntity, { nullable: true })
  async createTechnology(
    @Arg("title") title: string,
    @Arg("projectName", () => [String], { nullable: true }) projName?: string[]
  ): Promise<TechnologyEntity | null> {
    const tech = await TechnologyEntity.create({
      title: title,
    }).save();

    //TODO check if proj exists, if not, returns error, else add to the new technology.
    //Should be achieved with a query builder
    return tech;
  }

  @Mutation(() => String)
  async deleteAllTechnologies(@Ctx() {}: Context): Promise<string> {
    const techToBeDeleted = await TechnologyEntity.find({});
    if (techToBeDeleted.length === 0) {
      return "No more technologies left to delete.";
    } else {
      await TechnologyEntity.remove(techToBeDeleted);
      return "All technologies deleted successfully.";
    }
  }

  @Mutation(() => String)
  async deleteTechnolgy(@Arg("title") title: string): Promise<string> {
    const techToBeDeleted = await TechnologyEntity.findOne({
      where: { title },
    });
    if (!techToBeDeleted) {
      return `Technology ${title} does not exist.`;
    } else {
      await TechnologyEntity.remove(techToBeDeleted);
      return "Technology deleted successfully.";
    }
  }
}
