import { User } from "src/user/model/user.interface";
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectRequestDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    skills: string | null;

    @IsOptional()
    @IsString()
    goals: string | null;

    @IsOptional()
    @IsString()
    additionalInfo: string | null;
    
    submittedBy?: User;
}
