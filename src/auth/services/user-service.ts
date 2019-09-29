import { BaseService } from './../../core/base-service';
import { User as UserModel } from '../../database/models/User';
import { Service } from 'typedi';

@Service()
export class UserService extends BaseService<UserModel> {
  constructor() {
    super(UserModel);
  }
}
