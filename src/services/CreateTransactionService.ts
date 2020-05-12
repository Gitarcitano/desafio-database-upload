import { getCustomRepository, getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const getBalance = await transactionRepository.getBalance();

    if (type === 'outcome' && value > getBalance.total)
      throw new AppError('This transaction was not authorized', 400);

    const checkCategoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: '',
    });

    if (!checkCategoryExists) {
      const createCategory = await categoryRepository.save({ title: category });

      transaction.category_id = createCategory.id;
    } else {
      transaction.category_id = checkCategoryExists.id;
    }

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
