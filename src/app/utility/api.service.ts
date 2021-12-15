import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable, throwError ,Subject} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { AlertDialogs } from './alert-dialogs';
import { Utility } from './utility';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.apiBaseUrl;
  private httpOptions: any;
  constructor(
    private http: HttpClient,
    public loading: LoadingService,
    public alerDialogs: AlertDialogs,
    public utility: Utility,
    private router: Router
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  /****** Get api call******/
  getApiwithoutauthencticate(myUrl: String): Observable<any> {
    
    return this.http.get<any>(this.url + myUrl).pipe(
      map(data => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        this.utility.dissmissLoader();
        if (!this.utility.checkStringNullEmpty(error.error.message)) {
          this.alerDialogs.alertDialog('', error.error.message);
        }
        return throwError(error.error.message);
      })
    );
  }
  
  /****** Get api call******/
  getApi(myUrl: String, authToken: any): Observable<any> {
    if (!this.utility.checkStringNullEmpty(authToken)) {
      this.httpOptions = {
        headers: new HttpHeaders({ Authorization: authToken })
      };
    }

    return this.http.get<any>(this.url + myUrl, this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        this.utility.dissmissLoader();
        if (!this.utility.checkStringNullEmpty(error.error.message)) {
          this.alerDialogs.alertDialog('', error.error.message);
        }
        return throwError(error.error.message);
      })
    );
  }

  getApiOnlyWithContentType(myUrl: String): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<any>(this.url + myUrl, this.httpOptions).pipe(
      map(data => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => {
        if (!this.utility.checkStringNullEmpty(error.error.message)) {
          this.alerDialogs.alertDialog('', error.error.message);
        }
        // return an observable with a user-facing error message
        return throwError(error.error.message);
      })
    );
  }

  
  /****** Post api call without authentication******/
  postApiwithoutauthencticate(myUrl: String, postData: any): Observable<any> {     
    
    return this.http
      .post<any>(this.url + myUrl, postData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          this.utility.dissmissLoader();
          if (
            error.error.message.Authorization &&
            !this.utility.checkStringNullEmpty(
              error.error.message.Authorization.msg
            )
          ) {
            this.alerDialogs.alertDialog(
              '',
              error.error.message.Authorization.msg
            );
            return;
          } else if (
            !this.utility.checkStringNullEmpty(error.error.message) &&
            error.error.status != 401
          ) {
            this.alerDialogs.alertDialog('', error.error.message);
            return;
          } else if (error.error.status == 401) {
            this.alerDialogs.alertDialog('', error.error.message);
            localStorage.clear();
            this.router.navigate(['/login']);
            return;
          }
          // return an observable with a user-facing error message
          return throwError(error.error.message);
        })
      );
  }


  /****** Post api call******/
  postApi(myUrl: String, postData: any, authToken: any): Observable<any> {
     

    if (!this.utility.checkStringNullEmpty(authToken)) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: authToken
        })
      };
    }

    return this.http
      .post<any>(this.url + myUrl, postData, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          this.utility.dissmissLoader();
          if (
            error.error.message.Authorization &&
            !this.utility.checkStringNullEmpty(
              error.error.message.Authorization.msg
            )
          ) {
            this.alerDialogs.alertDialog(
              '',
              error.error.message.Authorization.msg
            );
            return;
          } else if (
            !this.utility.checkStringNullEmpty(error.error.message) &&
            error.error.status != 401
          ) {
            this.alerDialogs.alertDialog('', error.error.message);
            return;
          } else if (error.error.status == 401) {
            this.alerDialogs.alertDialog('', error.error.message);
            localStorage.clear();
            this.router.navigate(['/login']);
            return;
          }
          // return an observable with a user-facing error message
          return throwError(error.error.message);
        })
      );
  }

  /****** Post api call******/
  postApiOnlyWithContentType(myUrl: String, postData: any): Observable<any> {
    
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
    };
     
    return this.http
      .post<any>(this.url + myUrl, postData, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (!this.utility.checkStringNullEmpty(error.error.message)) {
            this.alerDialogs.alertDialog('', error.error.message);
          }
          return throwError(error.error.message);
        })
      );
  }

  /****** Patch api call******/
  patchApi(myUrl: String, postData: any, authToken: any): Observable<any> {
     
    if (!this.utility.checkStringNullEmpty(authToken)) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: authToken
        })
      };
    }
    return this.http
      .patch<any>(this.url + myUrl, postData, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (!this.utility.checkStringNullEmpty(error.error.message)) {
            this.alerDialogs.alertDialog('Warning', error.error.message);
          }
          return throwError(error.error.message);
        })
      );
  }

  /****** Upload Image POST api call******/
  uploadImagePostApi(
    myUrl: String,
    postData: any,
    authToken: any
  ): Observable<any> {
    if (!this.utility.checkStringNullEmpty(authToken)) {
      this.httpOptions = {
        headers: new HttpHeaders({ Authorization: authToken })
      };
    }
     

    return this.http
      .post<any>(this.url + myUrl, postData, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (!this.utility.checkStringNullEmpty(error.error.message)) {
            this.alerDialogs.alertDialog('', error.error.message);
          }
          // return an observable with a user-facing error message
          return throwError(error.error.message);
        })
      );
  }

  
  /****** Upload Image POST api without authentication call******/
  uploadImagePostApiWithoutAuthentication(
    myUrl: String,
    postData: any
  ): Observable<any> {        

    return this.http
      .post<any>(this.url + myUrl, postData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (!this.utility.checkStringNullEmpty(error.error.message)) {
            this.alerDialogs.alertDialog('', error.error.message);
          }
          // return an observable with a user-facing error message
          return throwError(error.error.message);
        })
      );
  }

  /****** Upload Image PATCH api call******/
  uploadImagePatchApi(
    myUrl: String,
    postData: any,
    authToken: any
  ): Observable<any> {
    if (!this.utility.checkStringNullEmpty(authToken)) {
      this.httpOptions = {
        headers: new HttpHeaders({ Authorization: authToken })
      };
    }
     
    return this.http
      .patch<any>(this.url + myUrl, postData, this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (!this.utility.checkStringNullEmpty(error.error.message)) {
            this.alerDialogs.alertDialog('', error.error.message);
          }
          // return an observable with a user-facing error message
          return throwError(error.error.message);
        })
      );
  }

  deleteApi(myUrl: String, authToken: any): Observable<any> {
    if (!this.utility.checkStringNullEmpty(authToken)) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: authToken
        })
      };
    }
    return this.http
      .delete<any>(this.url + myUrl,this.httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          if (!this.utility.checkStringNullEmpty(error.error.message)) {
            this.alerDialogs.alertDialog('', error.error.message);
          }
          return throwError(error.error.message);
        })
      );
  }

  public getExcel(myUrl: string, data: any, authToken: any) {
    return fetch(this.url + myUrl, {
        method: 'POST',
        headers: {
            observe: 'response', responseType: 'blob',
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: authToken
        },
        body: JSON.stringify(data),
    })
}
}
