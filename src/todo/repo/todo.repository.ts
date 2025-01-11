import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Todo } from "../entities/todo.entity";


@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor(private dataSource: DataSource) {
    super(Todo, dataSource.createEntityManager());
  }

//   async saveUser(todo: Todo): Promise<Todo> {
//     return await this.save(todo);
//   }

}