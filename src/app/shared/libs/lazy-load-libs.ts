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
 * Angular Dev Toolkit: Lazy-load Javascript or CSS/SCSS files.  Note that this is a 'lite' version of the actual ADT
 * code that has error handling and some other minor features removed.
 *
 * @author Jim Armstrong
 *
 * @version 1.0
 */

import {
  Injectable,
  Inject
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import {
  ReplaySubject,
  Observable,
  of
} from 'rxjs';

import { EXTENSION_ENUM } from './extension-enum';

import { getExtension } from './get-extension';

@Injectable({
  providedIn: 'root',
  deps: [DOCUMENT]
})
export class ADT$LazyLoadLibs
{
  protected _loaded: Record<string, ReplaySubject<any>>;

  constructor(@Inject(DOCUMENT) protected readonly _document: any)
  {
    this._loaded = {};
  }

  /**
   * Load an external resource (.js or .css) and return an Observable to indicate later completion; note that error
   * handling has been removed from this version.
   *
   * @param url URL of the resource, which should have only a .js or .css file extension
   */
  public load(url: string): Observable<any>
  {
    if (this._loaded[url] !== undefined) {
      return this._loaded[url].asObservable();
    }

    // check extension
    const ext: string = getExtension(url);
    if (ext === EXTENSION_ENUM.NONE) {
      return of(null);
    }

    this._loaded[url] = new ReplaySubject();

    if (ext === EXTENSION_ENUM.SCRIPT)
    {
      const script: HTMLScriptElement = this._document.createElement('script');

      script.type  = 'text/javascript';
      script.src   = url;
      script.async = true;

      script.onload = () =>
      {
        this._loaded[url].next();
        this._loaded[url].complete();
      };

      this._document.body.appendChild(script);
    }
    else
    {
      const link: HTMLLinkElement = this._document.createElement('link');

      link.href = url;
      link.type = 'text/css';
      link.rel  = 'stylesheet';

      link.onload = () =>
      {
        this._loaded[url].next();
        this._loaded[url].complete();
      };

      const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
      head.appendChild(link);
    }

    return this._loaded[url].asObservable();
  }
}
