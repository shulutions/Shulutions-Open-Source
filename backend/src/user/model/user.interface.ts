import { Project } from "src/project/model/project.interface";

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    roles?: Role[];
    projectsManaging?: Project[];
}

export enum Role {
    ADMIN = 'admin',
    PROJECTMANAGER = 'projectmanager',
    USER = 'user'
}