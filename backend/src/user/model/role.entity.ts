import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { User } from "./user.interface";

@Entity()
export class RoleEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => UserEntity, user => user.roles)
    users: User[];
}