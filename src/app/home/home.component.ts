import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import { Observable, noop, of, throwError, timer } from 'rxjs';
import { map, shareReplay, tap, catchError, finalize, retry, retryWhen, delayWhen } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;


    constructor() {

    }

    ngOnInit() {

      const http$: Observable<Course[]> = createHttpObservable('/api/courses');

      const courses$ = http$
        .pipe(
          tap(() => console.log('HTTP request executed')),
          map(res => res["payload"]),
          shareReplay(),
          retryWhen(errors => errors.pipe(
            delayWhen(() => timer(2000))
          ))
        );

      this.beginnerCourses$ = courses$
         .pipe(
             map((courses) => courses.
             filter((course) => course["category"] == 'BEGINNER'))
         );


      this.advancedCourses$ = courses$
         .pipe(
             map((courses) => courses.
             filter((course) => course["category"] == 'ADVANCED'))
         );


    }

}
