import { FUNCTIONAL_UNIT_TYPE } from "src/utils/constants";

export class FunctionalUnitWhitUserIdDto {
  /**
   * El id de la Unidad Funcional (UUID v4)
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  id: string;

  /**
   * El código de la Unidad Funcional (único)
   * @example "UF123456"
   */
  code: string;

  /**
   * El id del Usuario (UUID v4)
   * @example "d3f9a1b2-4b8e-4b8f-b3e6-2e5c3f9f8d7c"
   */
  user_id: string;
}
