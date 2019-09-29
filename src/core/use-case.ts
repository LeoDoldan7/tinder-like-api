export interface UseCase<Request, Response> {
  execute(req?: Request): Promise<Response> | Response;
}
