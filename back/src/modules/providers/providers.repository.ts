import { Injectable } from '@nestjs/common';
import { Provider } from './entities/provider.entity';

const providers: Provider[] = [
  {
    id: 'd2012d7a-855b-43cf-b2f0-3c9615ba23c9', // ID generado
    name: 'Sample Corporation',
    cuit: '30-98765432-1',
    email: 'info@samplecorp.com',
    phoneNumber: '+9876543210',
    address: '456 Oak St, Sampletown',
    balance: 20000.0, // Ejemplo de balance
    active: true,
  },
  {
    id: '34053c6a-fa75-4ef1-b77a-746f0b36d688', // ID generado
    name: 'Test Industries',
    cuit: '40-12345678-9',
    email: 'contact@testindustries.com',
    phoneNumber: '+1234567890',
    address: '789 Elm St, Testville',
    balance: 7500.5, // Ejemplo de balance
    active: true,
  },
  {
    id: 'da8f60e3-b1d6-4230-be6a-93c302af0978', // ID generado
    name: 'Demo Company Ltd.',
    cuit: '50-55555555-5',
    email: 'support@democompany.com',
    phoneNumber: '+5555555555',
    address: '101 Pine St, Demotown',
    balance: 30000.75, // Ejemplo de balance
    active: false,
  },
];

@Injectable()
export class ProvidersRepository {
  constructor() {} // Inyectar repositorio de typeorm correspondiente

  async findAll(): Promise<Provider[]> {
    return providers;
  }

  async findOne(id: string): Promise<Provider> {
    return providers.find((provider) => provider.id === id);
  }
}
