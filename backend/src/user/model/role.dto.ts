export class RoleDto {
    id?: number;
    role?: Role;
}

export enum Role {
    ADMIN = 'admin',
    PROJECTMANAGER = 'projectmanager',
    USER = 'user'
}