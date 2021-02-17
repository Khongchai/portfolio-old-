import { Context } from "src/types";
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
  async technologies(@Ctx() {}: Context): Promise<TechnologyEntity[]> {
    const technologies = await TechnologyEntity.find({ relations: ["usedIn"] });
    return technologies;
  }
  @Mutation(() => TechnologyEntity, { nullable: true })
  async createTechnology(
    @Arg("title") title: string,
    @Arg("projectName", () => [String], { nullable: true }) projName?: string[]
  ): Promise<TechnologyEntity | null> {
    const tech = await TechnologyEntity.create({ title }).save();

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
}
