import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

export const checkForDuplicates = async (
  repository: Repository<any>,
  value: string,
  field: string,
  errorMessage: string,
): Promise<void> => {
  const foundItem = await repository.findOne({ where: { [field]: value } });
  if (foundItem) {
    throw new ConflictException(`${errorMessage} ya se encuentra registrado.`);
  }
};
