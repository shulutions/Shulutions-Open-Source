import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectRequestDto } from './create-project-request.dto';

export class UpdateProjectRequestDto extends PartialType(CreateProjectRequestDto) {}
