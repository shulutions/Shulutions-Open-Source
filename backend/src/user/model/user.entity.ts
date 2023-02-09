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

    //@Column({select:  false})
    @Column()
    password: string;

    //update this to only allow the roles stored within the enum
    @ManyToMany(() => RoleEntity, (role) => role.users, {cascade: true})
    @JoinTable()
    roles: RoleEntity[];

    @OneToMany(type => ProjectEntity, project => project.projectManager)
    projectsManaging: ProjectEntity[];

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}