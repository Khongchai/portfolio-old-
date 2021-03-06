import { TechnologyEntity } from "../entities/TechnologyEntity";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { ProjectEntity } from "../entities/ProjectEntity";
import {
  AddTechInput,
  PaginatedProjects,
  ProjectCreationInput,
  ProjResponse,
} from "../inputAndObjectTypes/ProjectResolver";
import { Context } from "../types";
import { getTechListForEachProp } from "../utils/getTechnologiesByTitle";
import { Like } from "typeorm";

@InputType()
class PaginatedProjectsInput {
  @Field()
  limit: number;

  @Field()
  skip: number;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field({ nullable: true })
  order?: "ASC" | "DESC";

  @Field({ nullable: true })
  sort?: "Title" | "Date";
}

@Resolver()
export class ProjectsResolver {
  @Query(() => PaginatedProjects)
  async projects(
    @Arg("input") input: PaginatedProjectsInput
  ): Promise<PaginatedProjects> {
    const { limit, skip, order, search, sort } = input;
    const realLimit = Math.min(5, limit);
    const realLimitPlusOne = realLimit + 1;
    const searchCap = search
      ? `%${search.charAt(0).toUpperCase() + search.slice(1)}%`
      : "%";

    //change to query builder and do like
    const projects = await ProjectEntity.find({
      where: { title: Like(searchCap) },
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
      take: realLimitPlusOne,
      skip,
      //if not equal to date or not provided
      order: sort === "Date" ? { startDate: order } : { title: order },
    });

    const isFirstQuery = skip === 0;
    const isLastQuery = projects.length < realLimitPlusOne;

    return {
      projects: projects.slice(0, realLimit),
      isFirstQuery,
      isLastQuery,
    };
  }

  @Query(() => ProjResponse)
  async getSingleProjectByTitle(
    @Arg("title", () => String) title: string
  ): Promise<ProjResponse | undefined> {
    const project = await ProjectEntity.findOne({
      where: { title },
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
    });
    if (!project) {
      return {
        errors: [
          {
            message: `Project with name ${title} does not exist`,
          },
        ],
      };
    }
    return { proj: project };
  }

  @Query(() => [ProjectEntity])
  async getHighlightedProjects(): Promise<ProjectEntity[] | undefined> {
    const highlightedProjects = await ProjectEntity.find({
      where: { isHighlight: true },
      relations: [
        "frontEndTechnologies",
        "backEndTechnologies",
        "languages",
        "hostingServices",
      ],
    });
    return highlightedProjects;
  }

  @Mutation(() => ProjResponse, { nullable: true })
  async createProject(
    @Arg("projectData") projectData: ProjectCreationInput,
    @Ctx() {}: Context
  ): Promise<ProjResponse | null | boolean> {
    const {
      description,
      endDate,
      startDate,
      title,
      isHighlight,
      shortDescription,
      githubLink,
      websiteLink,
    } = projectData;
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
      shortDescription,
      githubLink,
      websiteLink,
    }).save();

    return { proj: newProj };
  }

  @Mutation(() => ProjResponse, { nullable: true })
  async addOrRemoveTechnologies(
    @Arg("projectData") input: AddTechInput,
    @Arg("operation") operation: boolean
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

    if (operation) {
      proj.backEndTechnologies = [
        ...proj.backEndTechnologies,
        ...(backEnd as TechnologyEntity[]),
      ];
      proj.frontEndTechnologies = [
        ...proj.frontEndTechnologies,
        ...(frontEnd as TechnologyEntity[]),
      ];
      proj.languages = [
        ...proj.languages,
        ...(languages as TechnologyEntity[]),
      ];
      proj.hostingServices = [
        ...proj.hostingServices,
        ...(hostingServices as TechnologyEntity[]),
      ];
    } else {
      //TODO implement remove logic
    }

    await proj.save();

    return { proj };
  }

  @Mutation(() => ProjResponse)
  async setProjectHighlight(
    @Arg("title") title: string,
    @Arg("operation") operation: boolean
  ): Promise<ProjResponse> {
    const project = await ProjectEntity.findOne({ where: { title } });
    if (project) {
      project.isHighlight = operation;
      await project.save();
      return { proj: project };
    }
    return { errors: [{ message: "Project not found" }] };
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
}
