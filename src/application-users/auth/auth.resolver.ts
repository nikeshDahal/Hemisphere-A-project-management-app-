import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ApplicationUserOutput } from 'src/admin/users/dto/response-user.output';
import { User } from 'src/admin/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/currentUser';
import { UserLoginInput } from './dto/userLogin-input';
import { UserLoginOutput } from './dto/userLogin-output';
import { JwtAuthGuardUser } from './guard/jwt-authGuard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProjectsService } from 'src/admin/projects/projects.service';
import { AssignedProjectsOutput } from './dto/assignedProject-output';

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

  @UseGuards(JwtAuthGuardUser)
  @Query(() => [AssignedProjectsOutput], { name: 'listingProjectAssignedToUser' })
  async projectList(@CurrentUser() currentUser: any) {
    const assignedProject =  await this.projectService.findAssignedProjects(currentUser._id);
    console.log("assignedProjects=>",assignedProject);
    return assignedProject
  }
}
