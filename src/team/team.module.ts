import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamRepository } from "./team.repository";
import { UserRepository } from "../auth/user.repository";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([TeamRepository, UserRepository])],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
