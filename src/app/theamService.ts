import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class TheamService {

    constructor() { }
    private subject = new Subject<any>();

    setTheamColor(obj) {
        this.subject.next(obj);
    }

    clearMessages() {
        this.subject.next();
    }

    getTheamColor(): Observable<any> {
        return this.subject.asObservable();
    }

    

}