import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private _todosUrl = 'http://localhost:3000/todo/api'
  constructor(private http: HttpClient) { }

  getTodos(userId){
    console.log(userId)
    return this.http.get<any>(`${this._todosUrl}/gettodos/${userId}`)
  }

  saveTodos(data){
    console.log(data)
    return this.http.post<any>(this._todosUrl, data)
  }
  
  updateTodo(todoId, data){
    return this.http.put<any>(`${this._todosUrl}/${todoId}`, data)
  }

  deleteTodo(todoId){
    return this.http.delete<any>(`${this._todosUrl}/${todoId}`)
  }

}
