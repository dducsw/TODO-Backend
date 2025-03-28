import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repo/todo.repository';
import { UserService } from 'src/user/user.service';
import { Todo } from './entities/todo.entity';


@Injectable()
export class TodoService {
  constructor(
    private todoRepository: TodoRepository,
    private userService: UserService,
  ) {};

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();

    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserByID(userId);

    return this.todoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number){
    return this.todoRepository.find({
      relations: ['user'],
      where: {user: {id : userId}, completed: false}
    });
  }
  findAllTodoByUserCompleted(userId: number){
    return this.todoRepository.find({
      relations: ['user'],
      where: {user: {id : userId}, completed: true}
    });
  }

  update(todoId: number) {
    return this.todoRepository.update(todoId, {completed: true});
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
