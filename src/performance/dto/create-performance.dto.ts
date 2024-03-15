import { CreateScheduleDto } from "./create-schedule.dto";
export class CreatePerformanceDto {
  title: string;
  description: string;
  category: string;
  place: string;
  price: number;
  thumbnail: string;
  schedules: CreateScheduleDto[];
  seats: number;
}
