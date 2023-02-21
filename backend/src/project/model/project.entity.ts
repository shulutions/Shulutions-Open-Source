import { UserEntity } from 'src/user/model/user.entity';
import { ManyToOne, OneToMany } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectStage } from './project.interface';
import { ProjectImage } from './projectImage.entity';

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

    @Column({default: false, nullable: true}) // update all projects to be active=true then remove nullable
    isActive: boolean;

    @Column({default: ProjectStage.PROPOSAL})
    stage: string;

    @Column({nullable: true})
    githubLink: string;

    @Column({nullable: true})
    discordLink: string;

    @Column({nullable: true})
    figmaLink: string;

    @ManyToOne(type => UserEntity, user => user.projectsManaging)
    projectManager: UserEntity

    @OneToMany(() => ProjectImage, image => image.project)
    images: ProjectImage[];

}
