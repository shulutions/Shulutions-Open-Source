import { UserEntity } from "src/user/model/user.entity";
import { User } from "src/user/model/user.interface";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectRequestComment } from "./project-request-comment.entity";
import { ProjectRequestReaction } from "./project-request-reaction.entity";

@Entity()
export class ProjectRequest {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @Column({ default: false })
    reviewed: boolean;

    @ManyToOne(() => UserEntity, user => user.projectRequests)
    submittedBy: User;

    @OneToMany(() => ProjectRequestComment, projectRequestComment => projectRequestComment.projectRequest)
    comments: ProjectRequestComment[];

    @OneToMany(() => ProjectRequestReaction, projectRequestReaction => projectRequestReaction.projectRequest)
    reactions: ProjectRequestReaction[];
}
