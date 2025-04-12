import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo {
  _id?: string;
  task: string;
  status?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todos';

  constructor() {}

  // Fetch Todos using native fetch API
  getTodos(): Observable<Todo[]> {
    return new Observable(observer => {
      fetch(this.apiUrl)
        .then(response => response.json())
        .then(todos => {
          observer.next(todos);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error fetching todos: ' + error);
        });
    });
  }

  // Create a new Todo using native fetch API
  createTodo(todo: Todo): Observable<Todo> {
    return new Observable(observer => {
      fetch(`${this.apiUrl}/createTodo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
        .then(response => response.json())
        .then(newTodo => {
          observer.next(newTodo);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error creating todo: ' + error);
        });
    });
  }

  // ✅ Update Todo
  updateTodo(todo: Todo): Observable<Todo> {
    return new Observable(observer => {
      fetch(`${this.apiUrl}/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: todo.task })
      })
        .then(response => response.json())
        .then(updatedTodo => {
          observer.next(updatedTodo);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error updating todo: ' + error);
        });
    });
  }

  // ✅ Delete Todo
  deleteTodo(id: string): Observable<any> {
    return new Observable(observer => {
      fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(result => {
          observer.next(result);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error deleting todo: ' + error);
        });
    });
  }
}
