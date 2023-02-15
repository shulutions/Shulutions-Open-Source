import { User } from 'src/app/models/user.interface';
import { Project } from './project.interface';

export interface PaginationData {
  items: any[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
};

