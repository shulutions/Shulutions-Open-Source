import { ProjectRequest } from "./project-request.interface";
import { User } from "./user.interface";

export interface ProjectRequestReaction {    
    id?: number;
    reaction?: "up" | "down";
    created?: Date;
    postedBy?: User;
    projectRequest?: ProjectRequest;
}