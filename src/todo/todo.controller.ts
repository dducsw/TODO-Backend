import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
// import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
@ApiTags('User')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(":userId")
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Param("userId") userId: number) {
    return this.todoService.create(createTodoDto, Number(userId));
  }

  @Get("/findAllNotCompleted/:userId")
  findAllTodosByUserIdNotCompleted(@Param("userId") userId: number) {
    return this.todoService.findAllTodoByUserNotCompleted(Number(userId));
  }
  @Get("/findAllCompleted/:userId")
  findAllTodosByUserCompeleted(@Param("userId") userId: number) {
    return this.todoService.findAllTodoByUserCompleted(Number(userId));
  }


  @Patch(':id')
  update(@Param('id') id: number) {
    return this.todoService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(Number(id));
  }
}
