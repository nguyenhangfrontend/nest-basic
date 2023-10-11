import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginPayload } from "./user.model";

@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super({
      secretOrKey: "TopSecret51",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validateToken(payload: LoginPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepo.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
