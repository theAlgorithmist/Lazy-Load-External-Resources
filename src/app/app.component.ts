/**
 * Copyright 2020 Jim Armstrong (https://www.linkedin.com/in/jimarmstrong/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This simulates any application Component that lazy-loads a JS or CSS library.  In this demo, the main
 * app component is responsible for defining a point cloud and a line segment about which that cloud will
 * be reflected.  An external JS library is loaded to perform the reflection computations.  Some external
 * CSS is loaded to enhance the appearance of the drawing area.
 *
 * @author Jim Armstrong
 *
 * @version 1.0
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';

import {
  IPointUtils, Point
} from './shared/point-utils';

import { ADT$LazyLoadLibs } from './shared/libs/lazy-load-libs';

import { forkJoin } from 'rxjs';

import { ReflectDirective } from './shared/directives/reflect-directive';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit
{
  public libraryRef: boolean;                  // do we have a valid external library reference?
  public available: boolean;                   // is the drawing directive fully available for use?
  public instructions: string;                 // instructions shown to the user

  @ViewChildren(ReflectDirective)
  private _reflector: QueryList<ReflectDirective>;

  private _pointReflector: ReflectDirective;   // Point cloud reflection drawing

  private _pointUtils: IPointUtils;            // Point utilities

  private _pointCloud: Array<Point>;           // Point cloud to be reflected about a line

  // define a segment representing the reflection line
  private _x0: number;
  private _y0: number;
  private _x1: number;
  private _y1: number;

  constructor(private _loader: ADT$LazyLoadLibs,
              private _chgDetectorRef: ChangeDetectorRef)
  {
    this.libraryRef  = false;
    this.available   = false;
    this._pointUtils = null;

    this.instructions = "Click 'Reflect' button to reflect point cloud about line segment";

    this._pointCloud = [
      {x: 20, y: 10},
      {x: 30, y: 45},
      {x: 100, y: 100},
      {x: 24, y: 125},
      {x: 50, y: 50},
      {x: 150, y: 35},
      {x: 200, y: 90},
      {x: 180, y: 150},
      {x: 220, y: 30},
      {x: 75, y: 150},
      {x: 100, y: 180}
    ];

    [this._x0, this._y0, this._x1, this._y1] = [50, 325, 500, 100];
  }

  public ngOnInit(): void
  {
    forkJoin([
      this._loader.load('assets/libs/point-libs.js'),
      this._loader.load('assets/styles/container-styles.css')
    ]).
    subscribe( (arr: any[]) => this.__onLibraryLoaded(arr) );
  }

  public ngAfterViewInit(): void
  {
    this._reflector.changes.subscribe( () => this.__onReflector() )
  }

  /**
   * Handle user clicking the 'Reflect' button in the UI
   */
  public onReflect(): void
  {
    // transform the cloud by reflecting about the line segment and then redraw
    this._pointCloud = this._pointUtils.reflect(this._pointCloud, {x: this._x0, y: this._y0}, {x: this._x1, y: this._y1});

    this._pointReflector.drawPoints(this._pointCloud);
  }

  // The Reflect drawing directive is fully defined
  private __onReflector(): void
  {
    // extract the view child from the view children collection and indicate it is available for use
    this._pointReflector = this._reflector.first;
    this.available       = true;

    // draw the initial point cloud and reflection line
    this._pointReflector.drawPoints(this._pointCloud);
    this._pointReflector.defineLineSegment(this._x0, this._y0, this._x1, this._y1);

    // this all happens well outside the normal Angular component lifecycle due to lazy-loading external JS and CSS
    this._chgDetectorRef.detectChanges();
  }

  // the array from fork-join is not used; it is only necessary to know when the observable completes
  private __onLibraryLoaded(arr: any[]): void
  {
    // Some usage examples are provided, some of which are not relevant to the point-cloud reflection; they are for instructional benefit

    // TSMT$PointUtils is an IIFE
    this._pointUtils = window['TSMT$PointUtils'];

    if (this._pointUtils !== undefined)
    {
      this.libraryRef = true;

      // example usage
      const d: number = this._pointUtils.l2Norm({x: 0, y: 1}, {x: 1, y: 0});
      console.log('distance between (0,1) and (1,0) is sqrt(2):', d);

      // TSMT$Point is a function; we don't have a definitions file or an interface for a TSMT$Point, so it has to be typed to 'any'
      const point: any = new window['TSMT$Point'](1, 1);

      console.log('point length:', point.length());
    }
  }
}
