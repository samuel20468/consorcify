import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { TPagination } from 'src/utils/types';
import { Provider } from './entities/provider.entity';
import { ProvidersRepository } from './providers.repository';

@Injectable()
export class ProvidersService {
  constructor(private readonly providersRepository: ProvidersRepository) {}

  async createProvider(newProvider: CreateProviderDto): Promise<Provider> {
    return this.providersRepository.createProvider(newProvider);
  }

  async findAll({ page, limit }: TPagination): Promise<Provider[]> {
    const providers: Provider[] = await this.providersRepository.findAll();

    if (providers.length == 0)
      throw new NotFoundException('No providers found');

    page = Math.max(1, page);

    limit = Math.max(1, limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return providers.slice(startIndex, endIndex);
  }

  async findOne(id: string): Promise<Provider> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const provider: Provider = await this.providersRepository.findOne(id);

    if (!provider) throw new NotFoundException('Provider not found');

    return provider;
  }

  async updateProvider(
    id: string,
    providerToUpdate: CreateProviderDto,
  ): Promise<Provider> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const existingProvider: Provider =
      await this.providersRepository.findOne(id);

    if (!existingProvider) throw new NotFoundException('Provider not found');

    const updatedProvider: Provider =
      await this.providersRepository.updateProvider(
        existingProvider,
        providerToUpdate,
      );
    return updatedProvider;
  }

  async toggleStatus(id: string) {
    let status: boolean;

    if (!id) {
      throw new BadRequestException('id is required');
    }

    const existingProvider: Provider =
      await this.providersRepository.findOne(id);

    status = existingProvider.active;

    if (!existingProvider) throw new NotFoundException('Provider not found');

    await this.providersRepository.toggleStatus(id, status);

    return existingProvider;
  }
}
