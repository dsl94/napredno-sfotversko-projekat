import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../auth/dto/create-user.dto";
import { TeamRepository } from "./team.repository";
import { Team } from "./team.entity";
import { CreateUpdateTeamDto } from "./dto/create-update-team.dto";
import { UserRepository } from "../auth/user.repository";
import { User } from "../auth/user.entity";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository) private teamRepository: TeamRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository) {
  }
  async create(dto: CreateUpdateTeamDto): Promise<Team> {
    return await this.teamRepository.createTeam(dto);
  }

  async update(id: string, dto: CreateUpdateTeamDto): Promise<Team> {
    const team = await this.teamRepository.findOne(id);
    if (team) {
      team.name = dto.name;
      return await this.teamRepository.save(team);
    } else {
      throw new NotFoundException("Team not found")
    }
  }

  async getOneTeam(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne(id);
    if (team) {
      return team;
    } else {
      throw new NotFoundException("Team not found")
    }
  }
  async getAllTeams(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async delete(id: string): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Team not found")
    }
  }

  async addUserToTeam(teamId: string, userId: string): Promise<void> {
    const team = await this.getOneTeam(teamId);
    const user = await this.getUser(userId);
    user.team = team;
    await this.userRepository.save(user);
  }

  async removeUserFromTeam(teamId: string, userId: string): Promise<void> {
    const team = await this.getOneTeam(teamId);
    const user = await this.getUser(userId);
    if (user.team === null) {
      throw new BadRequestException("Given user is not a member of any team");
    }
    if (user.team.id === team.id) {
      user.team = null;
    } else {
      throw new BadRequestException("Given user is not a member of given team");
    }
    await this.userRepository.save(user);
  }

  async getUser(id): Promise<User> {
    const user = await this.userRepository.findOne(id, {relations: ['team']});
    if (user) {
      return user;
    } else {
      throw new NotFoundException("User not found")
    }
  }
}

