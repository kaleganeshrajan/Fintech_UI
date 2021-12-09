import { Injectable } from "@angular/core";
import { rootRenderNodes } from "@angular/core/src/view";
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class ResetHomeMenuIconService{

    private subject=new Subject<any>();
    constructor(){}
    
    setHomePageMenu(menu){
        this.subject.next(menu);
    }

    getHomePageMenu():Observable<any>{
       return this.subject.asObservable();
    }
    
    unsubscribe(){
        this.subject.subscribe()
    }

}