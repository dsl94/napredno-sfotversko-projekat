import { EntityRepository, Repository } from "typeorm";
import { Team } from "./team.entity";
import { RoleEnum } from "../auth/role.enum";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CreateUpdateTeamDto } from "./dto/create-update-team.dto";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async createTeam(dto: CreateUpdateTeamDto): Promise<Team> {
    const { name } = dto;
    const team = this.create({
      name
    });

    try {
      await this.save(team);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return team;
  }
}
