/* copyright (c) 2012, Jim Armstrong.  All Rights Reserved.
 *
 * THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * This software may be modified for commercial use as long as the above copyright notice remains intact.
 */

/**
 *
 * A simple Point class that can be used in a variety of applications requiring 2D (x,y) coordinates
 * (no computations are modified to handle potential overflow or underflow).  Lazy validation is used
 * so that l-2 norm, for example, is only recomputed when one of the coordinates changes.  This may also
 * be used as a vector class.
 *
 * @param first: number - first or, most often, x-coordinate of the Point
 * @default 0
 *
 * @param second: number - second or, most often, y-coordinate of the Point
 *
 * @returns nothing The x- and y-coordinates of the Point are assigned to the respective input values
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
  function TSMT$Point(x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    this._x = x;
    this._y = y;
    this._invalidated = true;
    this._norm = this.length();
  }
  /**
   * Return a copy of the current Point
   *
   * @returns Point - New Point instance with identical x- and y-coordinates as the current Point
   */
  TSMT$Point.prototype.clone = function () {
    return new TSMT$Point(this._x, this._y);
  };
  Object.defineProperty(TSMT$Point.prototype, "x", {
    /**
     * Access the current x-coordinate
     *
     * @returns number - Current x-coordinate value
     */
    get: function () {
      return this._x;
    },
    /**
     * Set the current x-coordinate
     *
     * @param value: number - x-coordinate value
     *
     * @returns nothing Assigns internal x-coordinate
     */
    set: function (value) {
      this._x = this.__assign(value);
      this._invalidated = true;
    },
    enumerable: true,
    configurable: true
  });
  // just in case
  TSMT$Point.prototype.__assign = function (value) {
    switch (typeof value) {
      case "number":
        return !isNaN(value) && isFinite(value) ? value : 0;
      case "string":
        var t = parseFloat(value);
        return !isNaN(t) ? t : 0;
      case "boolean":
        return value ? 0 : 1;
    }
    return value;
  };
  Object.defineProperty(TSMT$Point.prototype, "y", {
    /**
     * Access the current y-coordinate
     *
     * @returns number - Current y-coordinate value
     */
    get: function () {
      return this._y;
    },
    /**
     * Assign the current y-coordinate
     *
     * @param y: number - y-coordinate value
     *
     * @returns nothing Assigns internal y-coordinate
     */
    set: function (value) {
      this._y = this.__assign(value);
      this._invalidated = true;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Return the Euclidean length or l-2 norm of the Point
   *
   * @returns number - Euclidean length with the coordinate values interpreted as endpoints of a vector in 2D space)
   * and the origin as the origin-point of the vector.
   */
  TSMT$Point.prototype.length = function () {
    if (this._invalidated) {
      this._norm = Math.sqrt(this._x * this._x + this._y * this._y);
      this._invalidated = false;
    }
    return this._norm;
  };
  /**
   * Return the l-1 norm of the Point (interpreted as a vector in 2D space)
   *
   * @returns number - l-1 norm of the Point
   */
  TSMT$Point.prototype.l1Norm = function () {
    return Math.abs(this._x) + Math.abs(this._y);
  };
  /**
   * Return the l-infinity norm of the Point (interpreted as a vector in 2D space)
   *
   * @returns number - l-infinity norm of the Point
   */
  TSMT$Point.prototype.lInfNorm = function () {
    var absX = Math.abs(this._x);
    var absY = Math.abs(this._y);
    return Math.max(absX, absY);
  };
  /**
   * Return the Euclidean distance between the current Point and an input Point
   *
   * @param point: TSMT$Point - Input Point
   *
   * @returns number - Euclidean distance between the current and input Point
   */
  TSMT$Point.prototype.distance = function (__point) {
    var dx = __point.x - this._x;
    var dy = __point.y - this._y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  /**
   * Compute dot or inner product of the current Point and another Point (both Points interpreted as vectors with
   * the origin as initial points)
   *
   * @param point: TSMT$Point - Input Point
   *
   * @return Number - Inner product of the current and input Points (as vectors)
   */
  TSMT$Point.prototype.dot = function (point) {
    return this._x * point.x + this._y * point.y;
  };
  /**
   * Cross or outer product of the current Point and another Point (both Points interpreted as vectors with the origin
   * as initial points)
   *
   * @param point: Point - Input Point
   *
   * @return Number - Outer product of the current and input Points (vectors); mathematically, the output is a vector
   * that is normal to the two input vectors whose direction is computed via the right-hand rule.  This method returns
   * the magnitude of that vector.
   */
  TSMT$Point.prototype.cross = function (point) {
    return this._x * point.y - this._y * point.x;
  };
  /**
   * Return a String representation of the current Point
   *
   * @return String - "(x, y)" where 'x' and 'y' are replaced by String representations of the x- and y-coordinates
   */
  TSMT$Point.prototype.toString = function () {
    var s1 = this._x.toString();
    var s2 = this._y.toString();
    return "(" + s1 + " , " + s2 + ")";
  };

/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
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
 * Typescript Math Toolkit: Utilities for floating-point number comparison
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
  function TSMT$ApproxEqual() {
    // empty
  }
  /**
   * Compare two floating-point numbers within a tolerance
   *
   * @param a : Number - Floating-point number
   *
   * @param b : Number - Floating-point number for comparison with first number
   *
   * @param tol : Number - Relative-error tolerance (defaults to 0.001).
   *
   * @return Boolean - True if the two input numbers are equal within the prescribed relative error or false if either input is undefined.  This
   * comparison is slower relative to straight relative error, but more numerically robust.  There is modest checking on input validity.
   */
  TSMT$ApproxEqual.compare = function (a, b, tol) {
    if (tol === void 0) { tol = 0.001; }
    if (a === undefined || a == null || isNaN(a) ||
      b === undefined || b == null || isNaN(b)) {
      // no comparison possible
      return false;
    }
    if (a == b) {
      // that was easy
      return true;
    }
    if (Math.abs(b) > Math.abs(a)) {
      return Math.abs((a - b) / b) <= tol;
    }
    else {
      return Math.abs((a - b) / a) <= tol;
    }
  };

/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
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
 * Typescript Math Toolkit: Low-level utility methods for coordinate operations using the core TSMT$Point structure.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
var TSMT$PointUtils = (function () {
  function TSMT$PointUtils() {
    // empty
  }
  /**
   * Compute the Euclidean distance between two points
   *
   * @param p0: TSMT$Point - First point
   *
   * @param p1: TSMT$Point - Second point
   *
   * @returns number - Euclidean distance between the input points or 0 if either input is null
   */
  TSMT$PointUtils.l2Norm = function (p0, p1) {
    if (!p0 || !p1) {
      return 0;
    }
    var dx = p0.x - p1.x;
    var dy = p0.y - p1.y;
    return Math.sqrt((dx * dx) + (dy * dy));
  };
  /**
   * Return the interior (minimum) angle between the origin and the two input points
   *
   * @param p0: TSMT$Point - First point
   *
   * @param p1: TSMT$Point - Second point
   *
   * @param toDegree: boolean - true if the result is to be returned in degrees
   * @efault true
   *
   * @return Number - Angle between two vectors from the origin to the first point and origin to the second point
   * in radians unless toDegree is true (in which case answer is in degrees)
   */
  TSMT$PointUtils.angle = function (p0, p1, toDegree) {
    if (toDegree === void 0) { toDegree = true; }
    var value = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    return toDegree ? 180 * value / Math.PI : value;
  };
  /**
   * Compute the (distance) ratio between two line segments
   *
   * @param p0: TSMT$Point - First point
   *
   * @param p1: TSMT$Point - Second point
   *
   * @param p2: TSMT$Point - Third point
   *
   * @returns number - Ratio of the distance from line segment P0-P2 to the distance of line segment P0-P1
   */
  TSMT$PointUtils.ratio = function (p0, p1, p2) {
    var l1 = this.l2Norm(p0, p1);
    var l2 = this.l2Norm(p0, p2);
    return (l2 / l1);
  };
  /**
   * Are two line segments parallel
   *
   * @param p0: TSMT$Point - First endpoint of first line segment
   *
   * @param p1: TSMT$Point - Second endpoint of first line segment
   *
   * @param p2: TSMT$Point - First endpoint of second line segment
   *
   * @param p3: TSMT$Point - Second endpoint of second line segment
   *
   * @returns boolean - true of the two line segments are (approximately) parallel
   */
  TSMT$PointUtils.isParallel = function (p0, p1, p2, p3) {
    var a1 = this.angle(p0, p1);
    var a2 = this.angle(p2, p3);
    return TSMT$ApproxEqual.compare(a1, a2, 0.0001);
  };
  /**
   * Is the input point on the line segment between two other points?
   *
   * @param p0: TSMT$Point - First endpoint of line segment
   *
   * @param p1: TSMT$Point - Second endpoint of line segment
   *
   * @param p: TSMT$Point - Test point
   *
   * @returns boolean - true if the test point is (numerically) on the line segment IN BETWEEN AND INCLUDING P0 to P1.
   */
  TSMT$PointUtils.pointOnLine = function (p0, p1, p) {
    // if p is on line segment from p0 to p1, then it must satisfy p = (1-t)*p0 + t*p1 for t in [0,1] - the process
    // is, of course, complicated by nearly horizontal/vertical lines and numerical issues.
    var tx = -1;
    var ty = -2;
    // endpoint tests
    var dx0 = p.x - p0.x;
    var dy0 = p.y - p0.y;
    if (Math.abs(dx0) < 0.00000001 && Math.abs(dy0) < 0.00000001) {
      tx = 0;
    }
    var dx1 = p1.x - p.x;
    var dy1 = p1.y - p.y;
    if (Math.abs(dx1) < 0.00000001 && Math.abs(dy1) < 0.00000001) {
      ty = 1;
    }
    if (tx == 0 || ty == 1) {
      return true;
    }
    var dx = (p1.x - p0.x);
    var dy = (p1.y - p0.y);
    if (Math.abs(dx) < 0.00000001) {
      if (Math.abs(dy) < 0.00000001) {
        // otherwise coincident point test
        return false;
      }
      else {
        ty = dy0 / (p1.y - p0.y);
        return ty >= 0 && ty <= 1;
      }
    }
    else {
      tx = dx0 / (p1.x - p0.x);
      if (Math.abs(dy) < 0.00000001) {
        // same as above
        return tx >= 0 && tx <= 1;
      }
      else {
        ty = dy0 / (p1.y - p0.y);
        if (tx >= 0 && tx <= 1 && ty >= 0 && ty <= 1) {
          return TSMT$ApproxEqual.compare(tx, ty, 0.001);
        }
        else {
          return false;
        }
      }
    }
  };
  /**
   * Is a point to the left of the line through two other points?
   *
   * @param p0: TSMT$Point - Initial point of line segment
   *
   * @param p1: TSMT$Point - Terminal point of line segment
   *
   * @param p: TSMT$Point - Test point
   *
   * @returns boolean - true if the point is strictly to the left of the line segment
   */
  TSMT$PointUtils.isLeft = function (p0, p1, p2) {
    var amt = (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
    return amt > 0;
  };
  /**
   * Project a Point a specified distance in the direction of it and another Point
   *
   * @param p0: TSMT$Point - Origin point
   *
   * @param p1: TSMT$Point - Direction point
   *
   * @param d: Number - Projection distance
   *
   * @return TSMT$Point - new Point, whose coordinates are the the first point projected a distance, d,
   * in the direction from P0 to P1
   */
  TSMT$PointUtils.project = function (p0, p1, d) {
    // trig. approach vs. unit vectors
    var a = this.angle(p0, p1);
    return new TSMT$Point(p0.x + Math.cos(a) * d, p0.y + Math.sin(a) * d);
  };
  /**
   * Return the index of the 'bottom left' element in an array of Points representing 2D coordinates
   * (this presumes a y-up coordinate system)
   *
   * @param points: Array<TSMT$Point> - Point collection
   *
   * @returns number - Index of bottom-left coordinate value
   */
  TSMT$PointUtils.bottomLeft = function (points) {
    var i = 0;
    var index = 0;
    var len = points.length;
    var pt;
    for (i = 0; i < len; ++i) {
      pt = points[i];
      if (pt.y < points[index].y || (pt.y <= points[index].y && pt.x < points[index].x)) {
        index = i;
      }
    }
    return index;
  };
  /**
   * Return the index of the 'bottom right' element in an array of Points representing 2D coordinates
   * (this presumes a y-up coordinate system)
   *
   * @param points: Array<TSMT$Point> - Point collection
   *
   * @return number - Index of bottom-right coordinate value
   */
  TSMT$PointUtils.bottomRight = function (points) {
    var i = 0;
    var index = 0;
    var len = points.length;
    var pt;
    for (i = 0; i < len; ++i) {
      pt = points[i];
      if (pt.y < points[index].y || (pt.y <= points[index].y && pt.x > points[index].x)) {
        index = i;
      }
    }
    return index;
  };
  /**
   * Return the index of the closest point from a point collection to an infinite line passing through two other points
   *
   * @points: Array<TSMT$Point> - Point collection
   *
   * @p0: TSMT$Point - First point on line
   *
   * @p1: TSMT$Point - Second point on line
   *
   * @returns number - Index of closest point to the infinite line passing through P0 and P1
   */
  TSMT$PointUtils.closestPointToLine = function (points, p0, p1) {
    var a = p0.y - p1.y;
    var b = p1.x - p0.x;
    var c = p0.x * p1.y - p1.x * p0.y;
    var len = points.length;
    var i;
    var d;
    var p;
    var minIndex = 0;
    var min = Math.abs(a * points[0].x + b * points[0].y + c);
    for (i = 1; i < len; ++i) {
      p = points[i];
      d = Math.abs(a * p[i].x + b * p[i].y + c);
      if (d < min) {
        minIndex = i;
        min = d;
      }
    }
    return minIndex;
  };
  /**
   * Return the distance from a single point to the infinite line passing through two other points
   *
   * @param p0: TSMT$Point - First point of line
   *
   * @param p1: TSMT$Point - Second point of line
   *
   * @param p: TSMT$Test point
   *
   * @returns number - Distance from P to the infinite line passing through P0 and P1
   */
  TSMT$PointUtils.pointToLineDistancee = function (p0, p1, p) {
    var vx = p1.x - p0.x;
    var vy = p1.y - p0.y;
    var wx = p.x - p0.x;
    var wy = p.y - p0.y;
    ;
    var c1 = vx * wx + vy * wy;
    var c2 = vx * vx + vy * vy;
    var b = c1 / c2;
    var px = p0.x + b * vx;
    var py = p0.y + b * vy;
    var dx = p.x - px;
    var dy = p.y - py;
    return Math.sqrt(dx * dx + dy * dy);
  };
  /**
   * Return the distance from a single point to a line segment
   *
   * @param p0: TSMT$Point - First point of line segment
   *
   * @param p1: TSMT$Point - Second point of line segment
   *
   * @param p: TSMT$Point - Test point
   *
   * @returns number - Distance from P to line segment between P0 and P1, which could be greater than the distance
   * between P and the infinite line between P0 and P1
   */
  TSMT$PointUtils.pointToSegmentDistance = function (p0, p1, p) {
    var vx = p1.x - p0.x;
    var vy = p1.y - p0.y;
    var wx = p.x - p0.x;
    var wy = p.y - p0.y;
    var c1 = wx * vx + wy * vy;
    if (c1 <= 0) {
      return Math.sqrt(wx * wx + wy * wy);
    }
    var c2 = vx * vx + vy * vy;
    if (c2 <= c1) {
      wx = p1.x - p.x;
      wy = p1.y - p.y;
      return Math.sqrt(wx * wx + wy * wy);
    }
    var b = c1 / c2;
    var px = p0.x + b * vx;
    var py = p0.y + b * vy;
    var dx = p.x - px;
    var dy = p.y - py;
    return Math.sqrt(dx * dx + dy * dy);
  };
  /**
   *
   * Return the intersection point from projecting a point onto a line
   *
   * @param p0: TSMT$Point - First point of line segment
   *
   * @param p1: TSMT$Point - Second point of line segment
   *
   * @param p: TSMT$Point - Input point
   *
   * @return TSMT$Point - Intersection point from the perpendicular projection of P onto the infinite line passing
   * through P0 and P1.
   */
  TSMT$PointUtils.pointSegmentProjection = function (p0, p1, p) {
    var p0x = p0.x;
    var p0y = p0.y;
    var p1x = p1.x;
    var p1y = p1.y;
    var px = p.x;
    var py = p.y;
    var t;
    var dx = p1x - p0x;
    var dy = p1y - p0y;
    var d = dx * dx + dy * dy;
    if (d < 0.0000001) {
      return new TSMT$Point(p0x, p0y);
    }
    t = ((px - p0x) * (p1x - p0x) + (py - p0y) * (p1y - p0y)) / d;
    if (t < 0) {
      return new TSMT$Point(p0x, p0y);
    }
    if (t > 1) {
      return new TSMT$Point(p1x, p1y);
    }
    px = (1 - t) * p0x + t * p1x;
    py = (1 - t) * p0y + t * p1y;
    return new TSMT$Point(px, py);
  };
  /**
   * Reflect a point cloud about a line passing through P0 and P1
   *
   * @param points: Array<TSMT$Point> - Array of Points
   *
   * @param p0: TSMT$Point - First point of line
   *
   * @param p1: TSMT$Point - Second point of line
   *
   * @return Array<TSMT$Point> - Reflected point cloud, provided that the line segment is (numerically) distinct;
   * otherwise, the original array is returned.
   */
  TSMT$PointUtils.reflect = function (points, p0, p1) {
    var p1x;
    var p1y;
    var x0 = p0.x;
    var y0 = p0.y;
    var x1 = p1.x;
    var y1 = p1.y;
    var dx = x1 - x0;
    var dy = y1 - y0;
    var d = dx * dx + dy * dy;
    if (Math.abs(d) < 0.00000001) {
      return points;
    }
    var a = (dx * dx - dy * dy) / d;
    var b = 2 * dx * dy / d;
    var len = points.length;
    var i;
    var p;
    // reflection of point cloud
    var reflect = new Array();
    for (i = 0; i < len; ++i) {
      p = points[i];
      dx = p.x - x0;
      dy = p.y - y0;
      p1x = (a * dx + b * dy + x0);
      p1y = (b * dx - a * dy + y0);
      reflect.push(new TSMT$Point(p1x, p1y));
    }
    return reflect;
  };
  return TSMT$PointUtils;
}());
