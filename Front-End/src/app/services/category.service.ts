import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from '../structs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000';
  private categoriesSource = new BehaviorSubject<Category[]>([]);
  categories = this.categoriesSource.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(){
    this.http.get<Category[]>(this.apiUrl +  '/categories').subscribe(cat => {
      this.categoriesSource.next(cat);
    })
  }
}
