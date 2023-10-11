import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthCridentalsDto } from "./dto/credentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginPayload } from "./user.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(userdata: AuthCridentalsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userdata.password, salt);
    const user = this.userRepo.create({
      ...userdata,
      password: hashedPassword,
    });
    try {
      await this.userRepo.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Dupplicate username");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async signin(userdata: AuthCridentalsDto): Promise<LoginPayload> {
    const { username, password } = userdata;
    const user = await this.userRepo.findOneBy({ username });
    if (user && bcrypt.compare(password, user.password)) {
      const payload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { username, accessToken };
    } else {
      throw new UnauthorizedException(
        "please check your cridentials exception",
      );
    }
  }
}
