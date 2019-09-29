cat > ./src/database/seeders/seeders/$(date +"%Y%m%d%H%M%S")-$1.ts << EOF
import { QueryInterface, DataTypes } from 'sequelize';
module.exports = {
  // tslint:disable-next-line:variable-name
  up: (queryInterface: QueryInterface, Sequelize: any) => {
  // Write seeder code here.
  },
  // tslint:disable-next-line:variable-name
  down: (queryInterface: QueryInterface, Sequelize: any) => {
  // If seeder fails, this will be called. Rollback your seeder changes.
  },
};