import { Server } from './../server';
import { testingDbSettings } from '../config';
import { Sequelize } from 'sequelize-typescript';

describe('Testing Server class', () => {

  let mockServer: Server;

  beforeAll(() => {
    mockServer = new Server(testingDbSettings);
    mockServer.init();
  });

  test('Sequelize instance was set', () => {
    const sequelize: Sequelize = mockServer.sequelize;
    // They should be two classes: Server, and database manager. 
    // This way, if I change the ORM I dont have to change this class.
    expect(sequelize).toBeDefined();
  });
});
