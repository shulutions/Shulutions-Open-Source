import { UserEntity } from "src/user/model/user.entity";
import { User } from "src/user/model/user.interface";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectRequest } from "./project-request.entity";

@Entity()
export class ProjectRequestComment {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @ManyToOne(() => ProjectRequest, projectRequest => projectRequest.comments, { onDelete: 'CASCADE' })
    projectRequest: ProjectRequest;

    @ManyToOne(() => UserEntity, user => user.projectRequestComments, { onDelete: 'CASCADE' })
    postedBy: User;
}