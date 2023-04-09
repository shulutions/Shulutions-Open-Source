import { User } from "src/user/model/user.interface";
import { ProjectRequest } from "../entities/project-request.entity";

export class CreateProjectRequestCommentDto {
    id?: number;
    comment?: string;
    projectRequest?: ProjectRequest;
    postedBy?: User;
}
