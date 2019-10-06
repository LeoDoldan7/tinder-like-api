cat > ./src/database/migrations/$(date +"%Y%m%d%H%M%S")-$1.ts << EOF
import { QueryInterface, DataTypes } from 'sequelize';
export default {
  up: (queryInterface: QueryInterface, Sequelize: typeof DataTypes): Promise<void> => {
  // Write migration code here.
  },
  down: (queryInterface: QueryInterface, Sequelize: typeof DataTypes): Promise<void> => {
  // If migration fails, this will be called. Rollback your migration changes.
  },
};
