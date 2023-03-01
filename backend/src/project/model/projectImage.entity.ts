import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity()
export class ProjectImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'}) 
    created: Date;

    @ManyToOne(() => ProjectEntity, project => project.images)
    project: ProjectEntity;
}