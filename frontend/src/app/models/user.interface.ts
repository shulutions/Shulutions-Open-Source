import { Role } from "./role.interface";

export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
    roles?: Role[];
};
