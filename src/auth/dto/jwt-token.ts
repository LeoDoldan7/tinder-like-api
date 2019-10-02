import { User } from './../domain/user';
export interface JWTToken {
    user: User;
    token: string;
}
