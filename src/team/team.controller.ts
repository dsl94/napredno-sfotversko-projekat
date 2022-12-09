import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateUpdateTeamDto } from "./dto/create-update-team.dto";
import { Team } from "./team.entity";
import { AuthGuard } from "@nestjs/passport";
import RoleGuard from "../auth/role.guard";
import { RoleEnum } from "../auth/role.enum";

@Controller('team')
@UseGuards(AuthGuard())
export class TeamController {
  constructor(private teamService: TeamService) {
  }
  @Post()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  create(@Body() dto: CreateUpdateTeamDto): Promise<Team> {
    return this.teamService.create(dto);
  }
  @Put("/:id")
  update(@Param('id') id: string, @Body() dto: CreateUpdateTeamDto): Promise<Team> {
    return this.teamService.update(id, dto);
  }
  @Get("/:id")
  getOne(@Param('id') id: string): Promise<Team> {
    return this.teamService.getOneTeam(id);
  }
  @Get()
  getAll(): Promise<Team[]> {
    return this.teamService.getAllTeams();
  }
  @Delete("/:id")
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  delete(@Param('id') id: string): Promise<void> {
    return this.teamService.delete(id);
  }
  @Put("/:teamId/user/:userId")
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  adUser(@Param('teamId') teamId: string,@Param('userId') userId: string ): Promise<void> {
    return this.teamService.addUserToTeam(teamId, userId);
  }
  @Delete("/:teamId/user/:userId")
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  removeUser(@Param('teamId') teamId: string,@Param('userId') userId: string ): Promise<void> {
    return this.teamService.removeUserFromTeam(teamId, userId);
  }
}
