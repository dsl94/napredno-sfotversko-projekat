export class LoginResponseDto {
  token: string;
  role: string;
  name: string;


  constructor(token: string, role: string, name: string) {
    this.token = token;
    this.role = role;
    this.name = name;
  }
}
