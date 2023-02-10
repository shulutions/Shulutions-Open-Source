import { ExecutionContext, forwardRef, Inject } from "@nestjs/common";
import { CanActivate, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleEntity } from "src/user/model/role.entity";
import { Role, User } from "src/user/model/user.interface";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector, 
        
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // What is the required role?
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass()
        ]);

        // If no roles are required, then allow access to controller
        if (!requiredRoles) return true;

        // Extract the current user's roles from the request
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        const userRoles = user.roles.map(role => role.name);

        // Does the current user making the request have the required role?
        return requiredRoles.some(role => userRoles.includes(role));
    } 
}