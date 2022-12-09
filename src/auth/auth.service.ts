import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { JwtPayload } from "./jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService) {
  }
  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.createUser(createUserDto);
  }

  async signIn(credentialsDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {email};
      const accessToken = this.jwtService.sign(payload);
      await this.userRepository.save(user);
      return new LoginResponseDto(
        accessToken,
        user.role,
        user.name
      )
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }
}
