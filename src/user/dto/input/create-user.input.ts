import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  age: number;
}
