import { IsNotEmpty, IsNumber, IsUUID, IsString } from 'class-validator';

export class CreateSupplierConsortiumDto {
  /**
   * El saldo inicial entre el Proveedor y el Consorcio
   * @example "1000.50"
   */
  @IsNotEmpty({ message: 'El saldo inicial es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El saldo inicial debe ser un número con hasta 2 decimales',
    },
  )
  initial_balance: number;

  /**
   * El Consorcio a relacionar
   * @example "5e4d5f8b-2e6d-4f49-9b3e-8d6c6f7e8a5b"
   */
  @IsNotEmpty({ message: 'El id del consorcio es requerido' })
  @IsUUID()
  @IsString({
    message:
      'El id del consorcio debe ser un valor alfanumérico',
  })
  consortium_id: string;
}
