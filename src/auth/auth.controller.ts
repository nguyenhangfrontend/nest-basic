import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCridentalsDto } from "./dto/credentials.dto";
import { LoginPayload } from "./user.model";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }
  @Post("/signup")
  async signUp(@Body() data: AuthCridentalsDto): Promise<string> {
    await this.authService.signUp(data);
    return `Create user ${data.username} has been successfully!`;
  }
  @Post("/signin")
  async signIn(@Body() data: AuthCridentalsDto): Promise<LoginPayload> {
    const dataLogin = await this.authService.signin(data);
    return dataLogin;
  }
  @Post("/test")
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
