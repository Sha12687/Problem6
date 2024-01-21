import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface ApiResponse {
  data: {
    university: string;
    // Add other properties if any
  };
  // Add other properties if any
}
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private _http: HttpClient) {}

  getUserList(): Observable<any> {
    return this._http.get('https://someurl/api/users');
  }

  getUserDetails(id: string): Observable<any> {
    return this._http.get(`https://someurl/api/users/${id}`)
      .pipe(map(data => this.transformResponseToAddUniversity(data)));
  }
  transformResponseToAddUniversity(response: any): any {
    response.data.university = 'IIT';
    return response;
  }


  getDepartmentMapping(deptid: string, studentid: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('deptId', deptid);
    // Add more parameters if needed
    return this._http.get('https://someurl/api/departmentMapping', { params });
  }
}


// need to create a student service in Angular that includes
// methods for fetching user lists, user details, and department
// mapping. Additionally, there's a transformResponseToAddUniversity
// method that transforms the response by adding a "university" property to the JSON.