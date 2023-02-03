import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { Role, User } from "./user.interface";

@Entity()
export class RoleEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: Role;

    @ManyToMany(() => UserEntity, user => user.roles)
    users: User[];
}
    // @Column({ enum: Role, default: Role.USER})
    // role: Role
