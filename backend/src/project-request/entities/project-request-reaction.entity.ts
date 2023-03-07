import { UserEntity } from "src/user/model/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectRequest } from "./project-request.entity";

@Entity()
export class ProjectRequestReaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    reaction: 'up' | 'down';

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @ManyToOne(() => UserEntity, user => user.projectRequestReactions)
    postedBy: UserEntity;

    @ManyToOne(() => ProjectRequest, projectRequest => projectRequest.reactions)
    projectRequest: ProjectRequest;
}