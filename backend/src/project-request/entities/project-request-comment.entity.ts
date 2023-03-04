import { UserEntity } from "src/user/model/user.entity";
import { User } from "src/user/model/user.interface";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectRequestComment {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created: Date;

    @ManyToOne(() => UserEntity, user => user.projectRequestComments)
    postedBy: User;
}