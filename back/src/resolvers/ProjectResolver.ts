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
import { getTechListForEachProp } from "../utils/getTechnologiesByTitle";
import {
  AddTechInput,
  ProjectCreationInput,
  ProjResponse,
} from "../inputAndObjectTypes/ProjectResolver";

@Resolver()
export class ProjectsResolver {
  @Query(() => [ProjectEntity])
  async projects(): Promise<ProjectEntity[]> {
    //include relations if you want the ORM to include the join table
    return await ProjectEntity.find({
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
    });
  }

  @Mutation(() => ProjectEntity, { nullable: true })
  async createProject(
    @Arg("projectData") projectData: ProjectCreationInput,
    @Ctx() {}: Context
  ): Promise<ProjectEntity | null | boolean> {
    const { description, endDate, startDate, title, isHighlight } = projectData;
    const {
      frontEndNames,
      backEndNames,
      languagesNames,
      hostingServiceNames,
    } = projectData.techProps;

    const {
      backEnd,
      frontEnd,
      languages,
      hostingServices,
    } = await getTechListForEachProp(
      frontEndNames,
      backEndNames,
      languagesNames,
      hostingServiceNames
    );

    const newProj = await ProjectEntity.create({
      description,
      endDate,
      title,
      startDate,
      frontEndTechnologies: frontEnd,
      backEndTechnologies: backEnd,
      hostingServices: hostingServices,
      languages,
      isHighlight: isHighlight || false,
    }).save();

    return newProj;
  }

  @Mutation(() => ProjResponse, { nullable: true })
  async addTechnologies(
    @Arg("projectData") input: AddTechInput
  ): Promise<ProjResponse> {
    const { projName } = input;
    const {
      backEndNames,
      frontEndNames,
      hostingServiceNames,
      languagesNames,
    } = input.techProps;

    const proj = await ProjectEntity.findOne({
      where: { title: projName },
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
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

    const {
      backEnd,
      frontEnd,
      languages,
      hostingServices,
      error,
    } = await getTechListForEachProp(
      frontEndNames,
      backEndNames,
      languagesNames,
      hostingServiceNames
    );
    if (error)
      return {
        errors: [
          {
            message: error,
          },
        ],
      };

    //TODO::: persist and save
    //proj. = [...proj.technologiesUsed, ...technologies];
    //await proj.save();
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
