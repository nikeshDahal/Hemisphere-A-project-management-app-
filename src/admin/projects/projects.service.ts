import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
  create(createProjectInput: CreateProjectInput) {
    return 'This action adds a new project';
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
