import { Result } from './result';
import { Model, Sequelize } from 'sequelize-typescript';
import {
  SaveOptions,
  FindOptions,
  ModelCtor,
  CreateOptions,
  Transaction

} from 'sequelize/types';
import Container from 'typedi';

export class BaseService<T extends Model> {
  protected repository: ModelCtor<T>;

  private _sequelize: Sequelize;

  constructor(baseClass: ModelCtor<T>) {
    this.repository = baseClass;
  }

  get sequelize(): Sequelize {
    if (!this._sequelize) {
      this._sequelize = Container.get(Sequelize);
    }
    return this._sequelize;
  }

  get newTransaction(): Promise<Transaction> {
    return this.sequelize.transaction();
  }

  async create(
    entityData: object | undefined,
    options: CreateOptions = {}
  ): Promise<Result<T>> {
    try {
      const entity = await this.repository.create<T>(entityData, options);
      return Result.ok<T>(entity);
    } catch (err) {
      return Result.fail<T>(err);
    }
  }

  async save(entity: T, options: SaveOptions = {}): Promise<Result<T>> {
    try {
      await entity.save(options);
      return Result.ok<T>();
    } catch (err) {
      return Result.fail<T>(err);
    }
  }

  async findOne(options: FindOptions = {}): Promise<Result<T>> {
    try {
      const foundEntity = await this.repository.findOne<T>(options);
      if (foundEntity) {
        return Result.ok<T>(foundEntity);
      } else {
        return Result.fail<T>('Not found');
      }
    } catch (err) {
      return Result.fail<T>(err);
    }
  }
}
