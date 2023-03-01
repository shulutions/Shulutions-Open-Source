import { User } from "src/user/model/user.interface";
import { ProjectImage } from "./projectImage.entity";

export interface Project {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    created?: Date;
    image?: string;
    images?: ProjectImage[];
    isActive?: boolean;
    projectManager?: User;
}

export enum ProjectStage {  
    PROPOSAL = 'Proposal',
    SETUP = 'Setup',
    REQUIREMENTS = 'Requirements',
    DESIGN = 'Design',
    DEVELOPMENT = 'Development',
    TESTING = 'Testing',
    DEPLOYMENT = 'Deployment',
    COMPLETED = 'Completed'
}