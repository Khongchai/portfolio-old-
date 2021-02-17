import { TechnologyEntity } from "../entities/TechnologyEntity";
import { getManager } from "typeorm";

export default async function getTechnologiesByTitle(
  titles: string[]
): Promise<TechnologyEntity[]> {
  return await getManager()
    .createQueryBuilder(TechnologyEntity, "tech")
    .where("tech.title IN (:...titles)", { titles })
    .orderBy("tech.title")
    .getMany();
}
