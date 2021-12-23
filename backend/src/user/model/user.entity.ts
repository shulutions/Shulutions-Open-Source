import { ProjectEntity } from "src/project/model/project.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user.interface";

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

    //update this to only allow the roles stored within the enum
    @Column({ enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @OneToMany(type => ProjectEntity, project => project.projectManager)
    projectsManaging: ProjectEntity[];


    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}