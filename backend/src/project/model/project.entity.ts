import { UserEntity } from 'src/user/models/user.entity';
import { ManyToOne } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @Column()
    slug: string;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    body: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) 
    created: Date;

    @Column()
    image: string;

    @Column()
    isActive: boolean;

    @ManyToOne(type => UserEntity, user => user.projectsManaging)
    projectManager: UserEntity
    
}
