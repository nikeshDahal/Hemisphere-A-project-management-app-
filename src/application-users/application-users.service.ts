import { Injectable } from '@nestjs/common';
import { CreateApplicationUserInput } from './dto/create-application-user.input';
import { UpdateApplicationUserInput } from './dto/update-application-user.input';

@Injectable()
export class ApplicationUsersService {
  create(createApplicationUserInput: CreateApplicationUserInput) {
    return 'This action adds a new applicationUser';
  }

  findAll() {
    return `This action returns all applicationUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationUser`;
  }

  update(id: number, updateApplicationUserInput: UpdateApplicationUserInput) {
    return `This action updates a #${id} applicationUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationUser`;
  }
}
