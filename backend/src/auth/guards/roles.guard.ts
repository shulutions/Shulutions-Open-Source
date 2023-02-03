import { ExecutionContext, forwardRef, Inject } from "@nestjs/common";
import { CanActivate, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Role, User } from "src/user/model/user.interface";
import { UserService } from "src/user/service/user.service";
import { Roles } from "../decorator/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector, 
        
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);
        if(!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        console.log(request);
        const user: User = request.user;

        return this.userService.findOne(user.id).pipe(
            map((user: User) => {
                 // const hasRole = () => roles.includes(user.roles);
                 const hasRole = roles.some(role => user.roles.includes(role))

                 let hasPermission: boolean = false;

                 if(hasRole) hasPermission = true;
                 return user && hasPermission;
            })
        )
    }
    
}