import { SequelizeOptions, Sequelize } from 'sequelize-typescript';
import Container from 'typedi';

export class Server {
  public sequelize: Sequelize;

  constructor(private sequelizeOptions: SequelizeOptions) { }

  init(): void {
    this.initSequelize();

  }

  initSequelize(): void {
    this.sequelize = new Sequelize(this.sequelizeOptions);
    Container.set(Sequelize, this.sequelize);
  }
}
