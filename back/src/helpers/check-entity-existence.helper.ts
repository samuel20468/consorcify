import { NotFoundException } from '@nestjs/common';

async function checkEntityExistence<T>(
  repository: any, // Utilizamos `any` porque no sabemos el tipo exacto del repositorio/servicio
  entityId: string,
  entityName: string,
): Promise<T> {
  const entity = await repository.findOne(entityId);
  if (!entity) {
    throw new NotFoundException(
      `No se encontró ${entityName}, el cual se requiere para esta operación`,
    );
  }
  return entity;
}

export default checkEntityExistence;
