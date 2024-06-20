import { Injectable } from '@nestjs/common';
import { MailsService } from '../mails/mails.service';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Expense } from '../expenses/entities/expense.entity';

@Injectable()
export class RemindersService {
    constructor(
        @InjectRepository(Expense)
        private readonly expensesRepository: Repository<Expense>,
        private readonly mailsService: MailsService,
    ) {}

    @Cron('10 15 * * *')
    async sendPaymentReminders() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const expensesDueTomorrow = await this.expensesRepository.find({
            where: { expiration_date: tomorrow },
            relations: [
                'functional_units_expenses',
                'functional_units_expenses.functional_unit',
                'functional_units_expenses.functional_unit.user',
            ],
        });

        for (const expense of expensesDueTomorrow) {
            for (const functionalUnitExpense of expense.functional_units_expenses) {
                const user = functionalUnitExpense.functional_unit.user;
                if (user && user.email) {
                    await this.mailsService.sendPaymentReminder(
                        user.first_name,
                        user.email,
                        functionalUnitExpense.total_amount,
                        expense.expiration_date,
                    );
                }
            }
        }
    }

    @Cron('30 14 20 * *')
    async sendPaymentSoonTest() {
        const today = new Date();

        const expensesDueTomorrow = await this.expensesRepository.find({
            where: { expiration_date: MoreThan(today) },
            relations: [
                'functional_units_expenses',
                'functional_units_expenses.functional_unit',
                'functional_units_expenses.functional_unit.user',
            ],
        });

        for (const expense of expensesDueTomorrow) {
            for (const functionalUnitExpense of expense.functional_units_expenses) {
                const user = functionalUnitExpense.functional_unit.user;
                if (user && user.email) {
                    await this.mailsService.sendPaymentReminder(
                        user.first_name,
                        user.email,
                        functionalUnitExpense.total_amount,
                        expense.expiration_date,
                    );
                }
            }
        }
    }

    @Cron('05 18 20 * *')
    async sendPaymentSoon() {
        const today = new Date();

        const expensesDueTomorrow = await this.expensesRepository.find({
            where: { expiration_date: MoreThan(today) },
            relations: [
                'functional_units_expenses',
                'functional_units_expenses.functional_unit',
                'functional_units_expenses.functional_unit.user',
            ],
        });

        for (const expense of expensesDueTomorrow) {
            for (const functionalUnitExpense of expense.functional_units_expenses) {
                const user = functionalUnitExpense.functional_unit.user;
                if (user && user.email) {
                    await this.mailsService.sendPaymentReminder(
                        user.first_name,
                        user.email,
                        functionalUnitExpense.total_amount,
                        expense.expiration_date,
                    );
                }
            }
        }
    }
}
