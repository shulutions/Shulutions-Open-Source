import { UserEntity } from 'src/user/model/user.entity';
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

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'}) 
    created: Date;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    isActive: boolean;

    @ManyToOne(type => UserEntity, user => user.projectsManaging)
    projectManager: UserEntity

}
