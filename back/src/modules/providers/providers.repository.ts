import { Injectable } from '@nestjs/common';
import { Provider } from './entities/provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProvidersRepository {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async createProvider(newProvider: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepository.create(newProvider);
    return this.providerRepository.save(provider);
  }

  async findAll(): Promise<Provider[]> {
    return this.providerRepository.find();
  }

  async findOne(id: string): Promise<Provider> {
    return this.providerRepository.findOneBy({ id });
  }

  async updateProvider(
    existingProvider: Provider,
    providerToUpdate: CreateProviderDto,
  ): Promise<Provider> {
    const mergedProvider: Provider = this.providerRepository.merge(
      existingProvider,
      providerToUpdate,
    );

    return await this.providerRepository.save(mergedProvider);
  }

  async toggleStatus(id: string, status: boolean): Promise<void> {
    await this.providerRepository.update(id, { active: !status });
  }
}
