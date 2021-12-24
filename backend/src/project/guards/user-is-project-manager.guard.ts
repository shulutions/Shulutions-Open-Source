import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { map } from "rxjs";
import { Observable, switchMap } from "rxjs";
import { User } from "src/user/model/user.interface";
import { UserService } from "src/user/service/user.service";
import { Project } from "../model/project.interface";
import { ProjectService } from "../service/project.service";

@Injectable()
export class UserIsProjectManagerGuard implements CanActivate {

    constructor(private userService: UserService, private projectService: ProjectService) {}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const projectId: number = Number(params.id);
        const user: User = request.user;
        console.log(projectId)

        return this.userService.findOne(user.id).pipe(
            switchMap((user: User) => this.projectService.findOne(projectId).pipe(
                map((project: Project) => {
                    let hasPermission = false;

                    if(user.id === project.projectManager.id) {
                        hasPermission = true;
                    }

                    return user && hasPermission; 
                })
            ))
        )
        
    }
}