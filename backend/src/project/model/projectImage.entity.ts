import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity()
export class ProjectImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUrl: string;

    @ManyToOne(() => ProjectEntity, project => project.images)
    project: ProjectEntity;
}