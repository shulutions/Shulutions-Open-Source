import { User } from "./user.interface";

export interface Project {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    created?: Date;
    image?: string;
    isActive?: boolean;
    projectManager: User;
    discordLink?: string;
    githubLink?: string;
    figmaLink?: string;
    stage?: string;
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