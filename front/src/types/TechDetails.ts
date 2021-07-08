import { TechnologyEntity } from "../generated/graphql";

export interface TechDetails {
  frontEnd: TechnologyEntity[] | null | undefined;
  backEnd: TechnologyEntity[] | null | undefined;
  languages: TechnologyEntity[] | null | undefined;
  hostingServices: TechnologyEntity[] | null | undefined;
}
