import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectResponse } from './dto/response-project.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { CurrentAdmin } from '../authentication/Decorator/current.admin';
import { profileEnd } from 'console';

@UseGuards(JwtAuthGuard)
@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

 
  @Mutation(() => ProjectResponse)
  async createProject(@CurrentAdmin() currentAdmin:any,@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    const [projects] = await this.projectsService.create(currentAdmin._id , createProjectInput);
    return projects
  }

  @Query(() => [ProjectResponse], { name: 'list_projects' })
  async findAll() {
     const projects= await this.projectsService.findAll();
     console.log("projects=>",projects)
     return projects
  }

  @Query(() => ProjectResponse, { name: 'getThisProject' })
  async findOne(@Args('id') id: string) {
    const [project] = await this.projectsService.findOne(id);
    console.log("project=>",project)
    return project
  }

  @Mutation(() => ProjectResponse)
  updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
    return this.projectsService.update(updateProjectInput._id, updateProjectInput);
  }

  @Mutation(() => ProjectResponse)
  removeProject(@Args('id') id: string) {
    return this.projectsService.remove(id);
  }
}
