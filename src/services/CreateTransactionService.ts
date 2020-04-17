// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';

interface Request {
  title: string;
}
class CreateTransactionService {
  public async execute({ title }: Request): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const findCategoryWithSameTitle = await categoriesRepository.findByTitle(
      title,
    );

    if (findCategoryWithSameTitle) {
      return findCategoryWithSameTitle;
    }

    const category = categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateTransactionService;
