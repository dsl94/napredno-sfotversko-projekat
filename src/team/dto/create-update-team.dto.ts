import { IsString } from "class-validator";

export class CreateUpdateTeamDto {
  @IsString()
  name: string;
}
