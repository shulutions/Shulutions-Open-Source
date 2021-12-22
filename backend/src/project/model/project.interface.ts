import { User } from "src/user/models/user.interface";

export interface Project {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    created?: Date;
    image?: string;
    isActive?: boolean;
    projectManager?: User;
}