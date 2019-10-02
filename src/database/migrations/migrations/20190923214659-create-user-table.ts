import { QueryInterface, DataTypes } from 'sequelize';
import uuid from 'uuid';

export default {
  up: (queryInterface: QueryInterface, Sequelize: typeof DataTypes): Promise<void> => {
    return queryInterface.createTable('User', {
      id: {
        type:         Sequelize.UUID,
        primaryKey:   true,
        allowNull:    false,
        defaultValue: uuid()
      },
      firstName: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      email: {
        type:      Sequelize.STRING,
        allowNull: false,
        unique:    true
      },
      password: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      age: {
        type:      Sequelize.INTEGER,
        allowNull: false
      },
      securityCode: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      elo: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable('User');
  }
};
