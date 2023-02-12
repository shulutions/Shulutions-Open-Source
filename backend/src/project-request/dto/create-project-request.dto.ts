import { User } from "src/user/model/user.interface";

export class CreateProjectRequestDto {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    created?: Date;
    reviewed?: boolean;
    submittedBy?: User;
}
