import { SignUpRequestDTO } from './../dto/user-dto';
import { CreateUserUseCase } from './../use-cases/create-user';
import { NextFunction, Response } from 'express';
import Container, { Inject, Service } from 'typedi';
import { Result } from '../../core/result';
import { AuthService } from '../services/auth-service';

@Service()
export class AuthController {

  async signup(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const createUserUseCase = Container.get(CreateUserUseCase);
      const userData: SignUpRequestDTO = req.body;
      const result = await createUserUseCase.execute(userData);
      if (result.isSuccess) {
        res.sendStatus(201);
      } else {
        next(result.error);
      }
    } catch (err) {
      if (err instanceof Result) {
        next(err.error);
      } else {
        next(err);
      }
    }
  }

  generateToken(req: any, res: Response, next: NextFunction): void {
    try {
      const authService = Container.get(AuthService);
      const token = authService.createToken(req.user);
      res.status(200).send(token);
    } catch (err) {
      if (err instanceof Result) {
        next(err.error);
      } else {
        next(err);
      }
    }
  }
}
