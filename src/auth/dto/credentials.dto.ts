import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const stringValidate = `Passwords will contain at least 1 upper case letter, Passwords will contain at least 1 lower case letter, Passwords will contain at least 1 number or special character`

export class AuthCridentalsDto {
  
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: stringValidate})
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
