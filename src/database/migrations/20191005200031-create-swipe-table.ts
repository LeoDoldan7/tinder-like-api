import { QueryInterface, DataTypes } from 'sequelize';
import uuid from 'uuid';

export default {
  up: (queryInterface: QueryInterface, Sequelize: typeof DataTypes): Promise<void> => {
    return queryInterface.createTable('Swipe', {
      id: {
        type:         Sequelize.UUID,
        primaryKey:   true,
        allowNull:    false,
        defaultValue: uuid()
      },
      right: {
        type:      Sequelize.BOOLEAN,
        allowNull: false
      },
      userId: {
        type:       Sequelize.UUID,
        allowNull:  false,
        references: {
          model: 'User',
          key:   'id'
        }
      },
      candidateId: {
        type:       Sequelize.UUID,
        allowNull:  false,
        references: {
          model: 'User',
          key:   'id'
        }
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
    return queryInterface.dropTable('Swipe');
  }
};
