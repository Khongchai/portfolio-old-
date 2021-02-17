import { TechnologyEntity } from "../entities/TechnologyEntity";
import { Context } from "../types";
import {
  Resolver,
  Query,
  Ctx,
  InputType,
  Mutation,
  Arg,
  Field,
  ObjectType,
} from "type-graphql";
import { ProjectEntity } from "../entities/ProjectEntity";
import { getManager } from "typeorm";

//for project creation input, create a separate inputtype
@InputType()
class ProjectCreationInput {
  @Field()
  startDate!: string;

  @Field()
  endDate!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => [String])
  technologiesNames: string[];
}

@InputType()
class AddTechInput {
  @Field()
  projName!: string;

  @Field(() => [String])
  technologiesNames!: string[];
}

@ObjectType()
class ErrorField {
  @Field()
  message: string;
}

@ObjectType()
class ProjResponse {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => ProjectEntity, { nullable: true })
  proj?: ProjectEntity;
}

@Resolver()
export class ProjectsResolver {
  @Query(() => [ProjectEntity])
  async projects(): Promise<ProjectEntity[]> {
    //include relations if you want the ORM to include the join table
    return await ProjectEntity.find({ relations: ["technologiesUsed"] });
  }

  @Mutation(() => ProjectEntity, { nullable: true })
  async createProject(
    @Arg("projectData") projectData: ProjectCreationInput,
    @Ctx() {}: Context
  ): Promise<ProjectEntity | null | boolean> {
    const {
      description,
      endDate,
      startDate,
      title,
      technologiesNames,
    } = projectData;

    const technologies = await getManager()
      .createQueryBuilder(TechnologyEntity, "tech")
      .where("tech.title IN (:...titles)", { titles: technologiesNames })
      .orderBy("tech.title")
      .getMany();

    const newProj = await ProjectEntity.create({
      description,
      endDate,
      title,
      startDate,
      technologiesUsed: technologies,
    }).save();

    return newProj;
  }

  @Mutation(() => ProjResponse, { nullable: true })
  async addTechnologies(
    @Arg("projectData") input: AddTechInput
  ): Promise<ProjResponse> {
    const { projName, technologiesNames } = input;
    const proj = await ProjectEntity.findOne({
      where: { title: projName },
      relations: ["technologiesUsed"],
    });

    if (!proj) {
      return {
        errors: [
          {
            message: "No projects found",
          },
        ],
      };
    }

    const technologies = await getManager()
      .createQueryBuilder(TechnologyEntity, "tech")
      .where("tech.title IN (:...titles)", { titles: technologiesNames })
      .orderBy("tech.title")
      .getMany();

    const length = technologiesNames.length;

    for (let i = 0; i < length; i++) {
      //check if any technology with the name of technologiesNames exists
      if (!technologiesNames.includes(technologies[i]?.title)) {
        return {
          errors: [
            {
              message: `Technology ${technologiesNames[i]} does not exist`,
            },
          ],
        };
      }
    }
    proj.technologiesUsed = [...proj.technologiesUsed, ...technologies];
    await proj.save();

    return { proj };
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg("id") id: number): Promise<boolean> {
    const projectToBeDeleted = await ProjectEntity.findOne({ id });
    if (!projectToBeDeleted) {
      return false;
    } else {
      await projectToBeDeleted.remove();
      return true;
    }
  }

  /////////////////////resolvers for testing below////////////////////////////////////////////////////////////////////////////////////

  @Mutation(() => String)
  async deleteAllProjects(): Promise<string> {
    const projectsToBeDeleted = await ProjectEntity.find({});
    if (projectsToBeDeleted.length === 0) {
      return "No more projects left to delete.";
    } else {
      await ProjectEntity.remove(projectsToBeDeleted);
      return "All projects deleted successfully.";
    }
  }

  @Mutation(() => [ProjectEntity])
  async addRandomTechToAllProjects(): Promise<ProjectEntity[]> {
    const allProjects = await ProjectEntity.find({
      relations: ["technologiesUsed"],
    });
    const allTechnologies = await TechnologyEntity.find({});
    const length = allProjects.length;
    for (let i = 0; i < length; i++) {
      const ranNum = Math.floor(Math.random() * allTechnologies.length);
      allProjects[i].technologiesUsed = [
        ...allProjects[i].technologiesUsed,
        allTechnologies[ranNum],
      ];
      await allProjects[i].save();
    }
    return allProjects;
  }
}
