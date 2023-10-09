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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
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
  async signin(userdata: AuthCridentalsDto): Promise<string> {
    const { username, password } = userdata;
    const user = await this.userRepo.findOneBy({ username });
    if(user && bcrypt.compare(password, user.password)){
      return 'success'
    }else {
      throw new UnauthorizedException('please check your cridentials exception')
    }
  }
}
