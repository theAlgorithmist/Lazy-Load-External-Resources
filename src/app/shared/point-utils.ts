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
 * An interface for point utilities
 *
 * @author Jim Armstrong
 *
 * @version 1.0
 */
export type Point = {x: number, y: number};

export interface IPointUtils
{
 l2Norm(p0: Point, p1: Point): number;
 
 angle(p0: Point, p1: Point, toDegree: boolean): number;
 
 ratio(p0: Point, p1: Point, p2: Point): number;
 
 isParallel(p0: Point, p1: Point, p2: Point, p3: Point): boolean;

 pointOnLine(p0: Point, p1: Point, p: Point): boolean;

 isLeft(p0: Point, p1: Point, p2: Point): boolean;

 project(p0: Point, p1: Point, d: number): Point;

 bottomLeft(points: Array<Point>): number;

 bottomRight(points: Array<Point>): number;

 closestPointToLine(points: Array<Point>, p0: Point, p1: Point): number;

 pointToLineDistancee(p0: Point, p1: Point, p: Point): number;

 pointToSegmentDistance(p0: Point, p1: Point, p: Point): number;

 pointSegmentProjection(p0: Point, p1: Point, p: Point): Point;

 reflect(points: Array<Point>, p0: Point, p1: Point): Array<Point>;
}
