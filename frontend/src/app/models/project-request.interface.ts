import { User } from "./user.interface";

export interface ProjectRequest {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    created?: Date;
    reviewed?: boolean;
    submittedBy?: User;
}