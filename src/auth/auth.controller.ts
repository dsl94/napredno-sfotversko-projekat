import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { AuthGuard } from "@nestjs/passport";
import RoleGuard from "./role.guard";
import { RoleEnum } from "./role.enum";

@Controller('auth')
export class AuthController {
  constructor(private  authService: AuthService) {
  }

  @Post("/signin")
  signIn(@Body() credentialsDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.signIn(credentialsDto);
  }

  @Post()
  @UseGuards(RoleGuard(RoleEnum.ADMIN))
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.create(createUserDto);
  }

}
