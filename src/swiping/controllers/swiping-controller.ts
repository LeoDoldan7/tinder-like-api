import { UserSwipedUseCase } from './../use-cases/user-swiped';
import { Response, NextFunction } from 'express';
import Container, { Service } from 'typedi';
import { Result } from '../../core/result';

@Service()
export class SwipingController {

  async userSwiped(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const userSwipedUseCase = Container.get(UserSwipedUseCase);
      await userSwipedUseCase.execute(req.body);
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof Result) {
        next(err.error);
      } else {
        next(err);
      }
    }
  }
}
