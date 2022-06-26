import { Injectable } from '@nestjs/common';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { User } from './models/user';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  // for now, this represents our stored users
  private users: User[] = [];

  public createUser(createUserInput: CreateUserInput): User {
    const user: User = {
      userId: uuid(),
      ...createUserInput,
    };

    this.users.push(user);

    return user;
  }

  public updateUser(updateUserInput: UpdateUserInput): User {
    const user = this.getUser({ userId: updateUserInput.userId });

    Object.assign(user, updateUserInput);

    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find(({ userId }) => userId === getUserArgs.userId);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userIds.map((userId) => this.getUser({ userId }));
  }

  public deleteUser(deleteUserInput: DeleteUserInput): User {
    const indexOfUserToDelete = this.users.findIndex(
      ({ userId }) => userId === deleteUserInput.userId,
    );

    const userToDelete = this.users[indexOfUserToDelete];

    this.users.splice(indexOfUserToDelete);

    return userToDelete;
  }
}
