import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from "bcrypt";
import { RoleEnum } from "./role.enum";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      email,
      name,
      role: RoleEnum.USER,
      password: hashedPassword
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException("Username not unique");
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }
}
