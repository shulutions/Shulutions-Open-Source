import { User } from "src/user/model/user.interface";
import { ProjectRequest } from "../entities/project-request.entity";

export class CreateProjectRequestReactionDto {
    id?: number;
    reaction?: "up" | "down";
    created?: Date;
    postedBy?: User;
    projectRequest?: ProjectRequest;
}
