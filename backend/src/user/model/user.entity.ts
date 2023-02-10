import { ProjectEntity } from "src/project/model/project.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { Role } from "./user.interface";

@Entity()
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column( {unique: true} )
    username: string;

    @Column()
    email: string;

    @Column({select:  false})
    password: string;

    @ManyToMany(() => RoleEntity, (role) => role.users, {cascade: true, eager: true})
    @JoinTable()
    roles: RoleEntity[];

    @OneToMany(type => ProjectEntity, project => project.projectManager)
    projectsManaging: ProjectEntity[];

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}