import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { catchError, Observable, of, map } from 'rxjs';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserIsUserGuard } from 'src/auth/guards/UserIsUser.guard';
import { User, Role } from '../model/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }

    @Get()
    index(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/backend/users'});
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<User> {
        return this.userService.deleteOne(Number(id));
    }

    @UseGuards(JwtAuthGuard, UserIsUserGuard)
    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateOne(Number(id), user);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
}
