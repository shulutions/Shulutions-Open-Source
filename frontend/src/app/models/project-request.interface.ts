import { User } from "./user.interface";

export interface ProjectRequestComment {
    id?: number;
    comment?: string;
    created?: Date;
    postedBy?: User;
    projectRequest?: ProjectRequest;
}

export interface ProjectRequest {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    created?: Date;
    reviewed?: boolean;
    submittedBy?: User;
    comments?: ProjectRequestComment[];
}