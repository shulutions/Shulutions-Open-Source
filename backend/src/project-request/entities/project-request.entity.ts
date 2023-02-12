import { UserEntity } from "src/user/model/user.entity";
import { User } from "src/user/model/user.interface";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectRequest {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) 
    created: Date;

    @Column({ default: false })
    reviewed: boolean;

    @ManyToOne(() => UserEntity, user => user.projectRequests)
    submittedBy: User;

}
