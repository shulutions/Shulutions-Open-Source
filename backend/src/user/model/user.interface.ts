import { Project } from "src/project/model/project.interface";

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    projectsManaging?: Project[];
}

export enum UserRole {
    ADMIN = 'admin',
    PROJECTMANAGER = 'projectmanager',
    USER = 'user'
}