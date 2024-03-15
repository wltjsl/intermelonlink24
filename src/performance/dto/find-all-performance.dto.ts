import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Category } from '../types/performance-category.type';

export class FindAllPerformanceDto {

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;
}