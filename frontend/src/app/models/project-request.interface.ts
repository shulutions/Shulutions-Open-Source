import { User } from "./user.interface";

export interface ProjectRequestComment {
    id?: number;
    comment?: string;
    created?: Date;
    postedBy?: User;
    projectRequest?: ProjectRequest;
}

export interface ProjectRequest {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    skills?: string | null;
    goals?: string | null;
    additionalInfo?: string | null;
    created?: Date;
    reviewed?: boolean;
    submittedBy?: User;
    comments?: ProjectRequestComment[];
    reactionTotal?: number;
}

export interface ProjectRequestForm {
    title: string;
    description: string;
    skills: string | null;
    goals: string | null;
    additionalInfo: string | null;
  }
  