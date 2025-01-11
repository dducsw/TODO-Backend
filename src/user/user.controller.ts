import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

/*
Controller handle HTTP request from client, mapped to endpoints.
recieve request -> handle -> call service -> return response.

*/

@Controller('user') // Define /use
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp') // /user/signUp
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get()
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req() req) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('id') id: string, @Req() req) {
    console.log(req.user);
    return this.userService.remove(+id);
  }
}