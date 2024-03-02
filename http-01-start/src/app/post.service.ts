import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}
  createAndStorePost(title: string, content: string) {
    const postData: Post = {
      title: title,
      content: content,
    };

    this.http
      .post<{ name: string }>(
        'https://angular-udemy-4be22-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response', // zwraca cały boiekt z httpresponse ; domyślnie body
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
          console.log(responseData.body);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('read', 'slow');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-udemy-4be22-default-rtdb.firebaseio.com/posts.json',
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Custom-Header': 'Hello',
          }),
          params: searchParams,
          // params: new HttpParams().set('print', 'pretty'),
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          // send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        'https://angular-udemy-4be22-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
          // responseType: 'text',
        }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            console.log('sent');
          }
          if (event.type === HttpEventType.Response) {
            console.log('response');
            console.log(event.body);
          }
        })
      );
  }
}
