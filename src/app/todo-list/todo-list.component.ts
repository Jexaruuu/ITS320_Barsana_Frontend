import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from '../services/todo.service';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  item = new FormControl("");
  list: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.list = todos;
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
      }
    });
  }

  pushToList() {
    const task = this.item.value;
    if (task) {
      const newTodo: Todo = { task };
      this.todoService.createTodo(newTodo).subscribe({
        next: (response) => {
          console.log('Todo created:', response);
          this.item.setValue("");
          this.fetchTodos();
        },
        error: (error) => {
          console.error('Error creating todo:', error);
        }
      });
    }
  }

  updateTodo(todo: Todo) {
    const updatedTask = prompt('Edit your task:', todo.task);
    if (updatedTask && updatedTask !== todo.task) {
      const updatedTodo: Todo = { ...todo, task: updatedTask };
      this.todoService.updateTodo(updatedTodo).subscribe({
        next: (response) => {
          console.log('Todo updated:', response);
          this.fetchTodos();
        },
        error: (error) => {
          console.error('Error updating todo:', error);
        }
      });
    }
  }

  deleteTodo(todoId: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(todoId).subscribe({
        next: (response) => {
          console.log('Todo deleted:', response);
          this.fetchTodos();
        },
        error: (error) => {
          console.error('Error deleting todo:', error);
        }
      });
    }
  }

  trackById(index: number, item: Todo): string {
    return item._id!;
  }
}
