import { UserSwipedUseCase } from './../use-cases/user-swiped';
import { Response, NextFunction } from 'express';
import Container, { Service } from 'typedi';
import { Result } from '../../core/result';

@Service()
export class SwipingController {

  async userSwiped(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const userSwipedUseCase = Container.get(UserSwipedUseCase);
      await userSwipedUseCase.execute({
        userId:      req.body.userId,
        candidateId: req.body.candidateId,
        right:       req.body.right
      });
      res.status(200).send();
    } catch (err) {
      if (err instanceof Result) {
        next(err.error);
      } else {
        next(err);
      }
    }
  }
}
