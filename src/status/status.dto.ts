import { IsInt, IsString, IsOptional } from 'class-validator';

/* eslint-disable indent */

export class SetStatusDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  s1?: number;

  @IsOptional()
  @IsInt()
  s2?: number;
}
