import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

let idCount: number = 4;

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    { id: 1, description: 'todo1', done: false },
    { id: 2, description: 'todo2', done: false },
    { id: 3, description: 'todo3', done: false },
  ];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo();
    todo.id = idCount++;
    todo.description = createTodoDto.description;
    this.todos.push(todo);

    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id)
    if(!todo) throw new NotFoundException(`todo with id ${id} not found`);
    
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const { done, description } = updateTodoDto;
    
    const todo = this.findOne(id);

    if (done !== undefined) todo.done = done;

    if (description) todo.description = description;

    this.todos = this.todos.map(dbTodo => dbTodo.id !== id ? dbTodo : todo);
    
    return todo;
  }

  remove(id: number) {
    this.findOne(id);
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
