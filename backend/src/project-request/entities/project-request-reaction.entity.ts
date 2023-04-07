import { UserEntity } from "src/user/model/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectRequest } from "./project-request.entity";

@Entity()
export class ProjectRequestReaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    reaction: 'up' | 'down';

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @ManyToOne(() => UserEntity, user => user.projectRequestReactions, { onDelete: 'CASCADE' })
    postedBy: UserEntity;

    @ManyToOne(() => ProjectRequest, projectRequest => projectRequest.reactions, { onDelete: 'CASCADE' })
    projectRequest: ProjectRequest;
}