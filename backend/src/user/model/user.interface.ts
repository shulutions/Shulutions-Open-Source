import { Project } from "src/project/model/project.interface";
import { RoleEntity } from "./role.entity";

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    roles?: RoleEntity[];
    projectsManaging?: Project[];
}

export enum Role {
    ADMIN = 'admin',
    PROJECTMANAGER = 'projectmanager',
    USER = 'user'
}