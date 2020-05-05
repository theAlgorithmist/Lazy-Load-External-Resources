/**
 * Copyright 2020 Jim Armstrong (www.algorithmist.net)
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
 * This directive manages drawing a point cloud and a line about which that cloud will be reflected.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */

import {
  Directive,
  ElementRef,
  OnInit,
} from '@angular/core';

import * as PIXI from 'pixi.js/dist/pixi.js';

import { Point } from '../point-utils';

@Directive({selector: '[reflect]'})
export class ReflectDirective implements OnInit
{
  protected _domContainer: HTMLDivElement;        // Container for PIXI Canvas

  // PIXI app and stage references
  protected _app: PIXI.Application;
  protected _stage: PIXI.Container;
  protected _width: number;
  protected _height: number;

  // All points in the cloud
  protected _points: PIXI.Graphics;

  // Visual representations of the line segment
  protected _line: PIXI.Graphics;

  // static PIXI options #C3E4ED
  protected static OPTIONS: Object = {
    backgroundColor: 0xF0F8FF,
    antialias: true
  };

  constructor(protected _elRef: ElementRef)
  {
    this._domContainer = <HTMLDivElement> this._elRef.nativeElement;
  }

  public ngOnInit(): void
  {
    this._width  = this._elRef.nativeElement.clientWidth;
    this._height = this._elRef.nativeElement.clientHeight;

    this.__pixiSetup();
  }

  public drawPoints(cloud: Array<Point>): void
  {
    this._points.clear();

    // plot the points and the line segment
    this._points.beginFill('0x0000ff');

    cloud.forEach( (point: Point): void => {
      this._points.drawCircle(point.x, point.y, 3);
    });

    this._points.endFill();
  }

  public defineLineSegment(x0: number, y0: number, x1: number, y1: number): void
  {
    this._line.clear();

    this._line.lineStyle(2, '0xff0000');
    this._line.moveTo(x0, y0);
    this._line.lineTo(x1, y1);
  }

  protected __pixiSetup(): void
  {
    const options = {width: this._width, height: this._height, ...ReflectDirective.OPTIONS};
    this._app     = new PIXI.Application(options);

    this._domContainer.appendChild(this._app.view);

    this._stage             = this._app.stage;
    this._stage.interactive = true;

    this._points = new PIXI.Graphics();
    this._line   = new PIXI.Graphics();

    this._stage.addChild(this._points);
    this._stage.addChild(this._line);
  }
}
