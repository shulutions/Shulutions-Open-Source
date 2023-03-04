import { UserEntity } from "src/user/model/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectRequestReaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reaction: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @ManyToOne(() => UserEntity, user => user.projectRequestReactions)
    postedBy: UserEntity;
}