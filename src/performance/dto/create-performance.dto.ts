import { IsNotEmpty, IsString, IsArray, IsDateString } from 'class-validator';

export class CreatePerformanceDto {
  @IsNotEmpty({ message: '공연의 제목을 입력해주세요.' })
  @IsString()
  readonly title: string;

  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  @IsString()
  readonly description: string;

  @IsNotEmpty({ message: '공연 날짜 및 시간을 입력해주세요.' })
  @IsArray()
  @IsDateString()
  readonly performanceDates: string[];

  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  @IsString()
  readonly venue: string;

  @IsNotEmpty({ message: '좌석 정보를 입력해주세요.' })
  @IsArray()
  readonly seats: { seatNumber: string; seatType: string }[];

  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  @IsString()
  readonly imageUrl: string;

  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  @IsString()
  readonly category: string;
}
