import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/model/user.interface';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }
}
