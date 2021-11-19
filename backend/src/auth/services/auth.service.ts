import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { of } from 'rxjs';
import { from, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12))
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
        return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
    }

}
