import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(newPayment: Payment): Promise<Payment> {
    return await this.paymentRepository.save(newPayment);
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { active: true },
      relations: { functional_unit_expense: { functional_unit: { user: true } } },
    });
  }

  async findAllByUser(user: User): Promise<Payment[]> {
    const paymentsByUser: Payment[] = await this.paymentRepository
      .createQueryBuilder('payment')
      .innerJoinAndSelect(
        'payment.functional_unit_expense',
        'functional_unit_expense',
      )
      .innerJoinAndSelect(
        'functional_unit_expense.functional_unit',
        'functional_unit',
      )
      .innerJoinAndSelect('functional_unit.user', 'user')
      .where('user.id = :id', { id: user.id })
      .getMany();

    return paymentsByUser;
  }

  async findOne(id: string): Promise<Payment> {
    return await this.paymentRepository.findOne({
      where: { id },
      relations: { functional_unit_expense: { functional_unit: { user: true } } },
    });
  }

  async toggleStatus(id: string, status: boolean): Promise<void> {
    await this.paymentRepository.update(id, { active: !status });
  }
}
