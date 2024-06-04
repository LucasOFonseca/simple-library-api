import { AvailabilityStatus } from './availabilityStatus';

export interface BookRequestDTO {
  title: string;
  author: string;
  summary: string;
}

export interface BookDTO extends BookRequestDTO {
  id: string;
  status: AvailabilityStatus;
}
