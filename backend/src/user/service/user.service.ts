import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, switchMap, throwError, from, Observable, map, of, mergeMap, concatMap } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { User, Role } from '../model/user.interface';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { RoleEntity } from '../model/role.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>,
        private authService: AuthService
    ) { }

    create(user: User): Observable<User> {
        return from(this.roleRepository.findOne({ name: Role.USER })).pipe(
            concatMap((userRole: RoleEntity) => {
                return from(bcrypt.hash(user.password, 12)).pipe(
                    concatMap((hashedPassword: string) => {
                        const newUser = new UserEntity();
                        newUser.name = user.name;
                        newUser.username = user.username;
                        newUser.email = user.email;
                        newUser.password = hashedPassword;
                        newUser.roles = [userRole];
    
                        return from(this.userRepository.save(newUser)).pipe(
                            map((user: UserEntity) => {
                                const { password, ...result } = user;
                                return result;
                            }),
                            catchError(err => throwError(err))
                        );
                    })
                );
            })
        );
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne({id}, {relations: ['projectsManaging']})).pipe(
            map((user: User) => {
                const { password, ...result } = user;
                return result
            })
        )
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find({relations: ['roles']})).pipe(
            map((users: User[]) => {
                users.forEach((u) => delete u.password)
                return users
            })
        )
    }

    paginate(options: IPaginationOptions): Observable<Pagination<User>> {
        return from(paginate<User>(this.userRepository, options)).pipe(
            map((usersPageable: Pagination<User>) => {
                usersPageable.items.forEach((v) => delete v.password);

                return usersPageable;
            })
        )
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateOne(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        delete user.roles;

        return from(this.userRepository.update(id, user));
    }

    updateRoleOfUser(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user));
    }

    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong credentials';
                }
            })
        )
    }

    validateUser(email: string, loginPassword: string): Observable<User> {
        return this.findByEmail(email).pipe(
            switchMap((user: UserEntity) => {
                if (user && user.checkPassword(loginPassword)) {
                    const { password, ...result } = user;
                    return of(result);
                } else {
                    throw new Error('Invalid email or password');
                }
            })
        );
    }
    
    findByEmail(email: string): Observable<User> {
        return from(this.userRepository.findOne({ email }));
    }

}
