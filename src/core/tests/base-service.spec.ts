import { BaseService } from './../base-service';
import { Sequelize, Table, Column, Model } from 'sequelize-typescript';
import { testingDbSettings } from '../../config';
import Container from 'typedi';

describe('Testing Base Service', () => {
  @Table
  class MockModel extends Model<MockModel> {
    @Column
    name: string;
  }

  const sequelize = new Sequelize(testingDbSettings);
  Container.set(Sequelize, sequelize);

  class MockService extends BaseService<MockModel> { }

  let mockService: MockService;

  beforeAll(async() => {
    sequelize.addModels([MockModel]);
    await sequelize.sync({ force: true });
  });

  beforeEach(() => {
    mockService = new MockService(MockModel);
  });

  afterAll(() => {
    sequelize.close();
  });

  test('Service creates entity', async() => {
    const entityResult = await mockService.create({ name: 'Mock' });
    expect(entityResult.isSuccess).toBe(true);
  });

  test('Service saves entity', async() => {
    const entity = await MockModel.build({ name: 'Mock' });
    entity.name = 'Not Mock';
    await entity.save();
    expect(!!entity).toBe(true);
  });

  test('Service retrieves one', async() => {
    const entityResult = await mockService.create({ name: 'Mock' });
    const foundEntityResult = await mockService.findOne({
      where: { name: entityResult.getValue().name }
    });
    expect(foundEntityResult.getValue().name).toBe(entityResult.getValue().name);
  });

  test('Service should return transaction', async() => {
    const transaction = await mockService.newTransaction;
    expect(transaction).toBeDefined();
  });
});
