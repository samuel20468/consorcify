import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesRepository } from './expenses.repository';
import { Consortium } from '../consortiums/entities/consortium.entity';
import checkEntityExistence from 'src/helpers/check-entity-existence.helper';
import { Expense } from './entities/expense.entity';
import { TPagination } from 'src/utils/types';
import { EXPENSE_STATUS } from 'src/utils/constants';
import { MailsService } from '../mails/mails.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly mailsService: MailsService,
    private readonly expensesRepository: ExpensesRepository,
    @InjectRepository(Consortium)
    private readonly consortiumRepository: Repository<Consortium>,
  ) {}

  async create(expenseToCreate: CreateExpenseDto) {
    const { name, issue_date, expiration_date, consortium_id } =
      expenseToCreate;

    const consortium: Consortium = await this.consortiumRepository.findOne({
      where: { id: consortium_id },
      relations: { functional_units: true },
    });

    if (!consortium)
      throw new NotFoundException(`El Consorcio id ${consortium_id} no existe`);

    if (consortium.ufs > consortium.functional_units.length) {
      throw new ConflictException(
        `Aún le restan cargar ${consortium.ufs - consortium.functional_units.length} unidades funcionales para crear una expensa. Cargue las UF antes de crear una expensa.`,
      );
    }

    const foundConsortiumWithOpenExpense: Consortium =
      await this.consortiumRepository.findOne({
        where: {
          id: consortium_id,
          expenses: { active: true, status: EXPENSE_STATUS.OPEN },
        },
        relations: { expenses: true },
      });

    if (foundConsortiumWithOpenExpense)
      throw new ConflictException(
        `El Consorcio "${foundConsortiumWithOpenExpense.name}" tiene la expensa "${foundConsortiumWithOpenExpense.expenses[0].name}" abierta. No se puede crear una nueva.`,
      );

    const newExpense: Expense = new Expense();
    newExpense.name = name;
    newExpense.issue_date = issue_date;
    newExpense.expiration_date = expiration_date;
    newExpense.consortium = consortium;

    return await this.expensesRepository.createExpense(newExpense);
  }
  async findAll({ page, limit }: TPagination): Promise<Expense[]> {
    const expenses: Expense[] = await this.expensesRepository.findAll();

    if (expenses.length == 0)
      throw new NotFoundException('Expensas no encontradas');

    page = Math.max(1, page);

    limit = Math.max(1, limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return expenses.slice(startIndex, endIndex);
  }

  async findAllByConsortium(consortiumId: string): Promise<Expense[]> {
    return await this.expensesRepository.findAllByConsortium(consortiumId);
  }

  async findOne(id: string): Promise<Expense> {
    if (!id) {
      throw new BadRequestException('El Id es requerido');
    }

    const expense: Expense = await this.expensesRepository.findOne(id);
    if (!expense) {
      throw new NotFoundException('Expensa no encontrada');
    }

    return expense;
  }

  async undoExpense(expenseId: string) {
    if (!expenseId) {
      throw new BadRequestException('El Id es requeridox');
    }

    const expense: Expense = await checkEntityExistence(
      this.expensesRepository,
      expenseId,
      'la expensa',
    );

    if (expense.status === EXPENSE_STATUS.CLOSED)
      throw new ConflictException(
        'No se puede deshacer una expensa que esta cerrada',
      );

    if (expense.functional_units_expenses.length <= 0)
      throw new ConflictException(
        'No se puede deshacer una expensa que no se ha generado',
      );

    await this.expensesRepository.undoExpense(expenseId);

    return expense;
  }

  async closeExpense(id: string): Promise<Expense> {
    const foundExpense: Expense = await this.findOne(id);
    const consortium = foundExpense.consortium;

    if (foundExpense.status === EXPENSE_STATUS.CLOSED)
      throw new ConflictException(
        'No se puede cerrar una expensa que ya se encuentra cerrada',
      );

    await this.expensesRepository.closeExpense(id);

    foundExpense.status = EXPENSE_STATUS.CLOSED;
    const { c_admin } = await this.consortiumRepository.findOne({
      where: { id: consortium.id },
      relations: { c_admin: true },
    });

    if (!c_admin)
      throw new NotFoundException(
        'Administrador no encontrado para enviar mail',
      );

    await this.mailsService.sendNewExpense(
      c_admin.name,
      c_admin.email,
      foundExpense.total_amount,
      consortium.name,
      foundExpense.name,
    );

    return foundExpense;
  }

  async settleExpense(id: string) {
    const foundExpense: Expense = await this.findOne(id);

    if (foundExpense.status === EXPENSE_STATUS.CLOSED)
      throw new ConflictException(
        'No se puede liquidar una expensa que esta cerrada',
      );

    return await this.expensesRepository.settleExpense(foundExpense);
  }

  async toggleStatus(id: string) {
    let status: boolean;

    if (!id) {
      throw new BadRequestException('id is required');
    }

    const foundExpense: Expense = await checkEntityExistence(
      this.expensesRepository,
      id,
      'la expensa',
    );

    status = foundExpense.active;

    await this.expensesRepository.toggleStatus(id, status);

    return foundExpense;
  }
}
