import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import { Observable, noop} from 'rxjs';
import { map, filter} from 'rxjs/operators';
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

      const http$ = createHttpObservable('/api/courses');

      const courses$ = http$
        .pipe(
          map(res => Object.values(res["payload"]))
        );



      this.beginnerCourses$ = http$
        .pipe(
            map(courses => courses)
                    ,filter(course => course == '')
        );

        console.log(this.advancedCourses$)

     /* this.advancedCourses$ = http$
        .pipe(
            map(courses => courses
                .filter(course => course.category == 'ADVANCED'))
        ); */

      courses$.subscribe(
        courses => {

            console.log(courses);

        },
        noop,
        () => console.log('completed')
      );



    }

}
