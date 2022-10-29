import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ApplicationUserOutput } from 'src/admin/users/dto/response-user.output';
import { User, UserType } from 'src/admin/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/currentUser';
import { UserLoginInput } from './dto/userLogin-input';
import { UserLoginOutput } from './dto/userLogin-output';
import { JwtAuthGuardUser } from './guard/jwt-authGuard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProjectsService } from 'src/admin/projects/projects.service';
import { AssignedProjectsOutput } from './dto/assignedProject-output';
import { ProjectResponse } from 'src/admin/projects/dto/response-project.output';
import { HasRoles } from './decorator/has-roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { ProjectResponseForUser } from 'src/admin/projects/dto/respose-projectListForUser';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly projectService: ProjectsService,
  ) {}

  @Query(() => UserLoginOutput, { name: 'LoginUser' })
  async login(@Args('loginData') loginData: UserLoginInput) {
    const userData = await this.authService.loginUser(loginData);
    console.log(
      'application user logged in sucessfully = auth resolver=>',
      userData,
    );
    return userData;
  }

  @UseGuards(JwtAuthGuardUser)
  @Query(() => ApplicationUserOutput, { name: 'userProfile' })
  async userProfile(@CurrentUser() currentUser: User) {
    console.log('currentUser=>', currentUser);
    return currentUser;
  }

  @UseGuards(JwtAuthGuardUser)
  @Query(() => UserLoginOutput, { name: 'validateRefreshTokenOfUser' })
  async validateRefreshToken(@Args('refreshToken') refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
    });
    console.log('payload check in auth resolver ', payload);
    return await this.authService.refreshTokenValidation(
      payload.userId,
      refreshToken,
    );
  }

 
  @HasRoles(UserType.PROJECT_MANAGER )
  @UseGuards(JwtAuthGuardUser , RolesGuard)
  @Query(() => [ProjectResponse], { name: 'listingProjectAssignedToPM' })
  async projectList(@CurrentUser() currentUser: any) {
    const assignedProject =  await this.projectService.findAssignedProjects(currentUser._id);
    console.log("assignedProjects=>",assignedProject);
    return assignedProject
  }

   @UseGuards(JwtAuthGuardUser )
  @Query(() => [ProjectResponseForUser], { name: 'listingProjectAssignedForUser' })
  async projectLists(@CurrentUser() currentUser: any) {
    return await this.projectService.findAssignedProjectsForUser(currentUser._id);
  }
}
