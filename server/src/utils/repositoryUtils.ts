import { Repository } from "typeorm";

export const checkIfExists = async (
  repository: Repository<any>,
  conditions: any,
  entityName: string
) => {
  const existingRecord = await repository.findOneBy(conditions);
  if (existingRecord) {
    console.error("${entityName} with the specified values already exists");
  }
  return existingRecord;
};
