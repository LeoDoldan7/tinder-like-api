import { SequelizeOptions, Sequelize } from 'sequelize-typescript';
import Container from 'typedi';

export class Server {
  public sequelize: Sequelize;

  private sequelizeOptions: SequelizeOptions

  constructor(sequelizeOptions: SequelizeOptions) {
    this.sequelizeOptions = sequelizeOptions;
  }

  init(): void {
    this.initSequelize();

  }

  initSequelize(): void {
    this.sequelize = new Sequelize(this.sequelizeOptions);
    Container.set(Sequelize, this.sequelize);
  }
}
