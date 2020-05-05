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
 * A simple function to determine a script or CSS file by extension (.js or .css).
 *
 * @author Jim Armstrong
 *
 * @version 1.0
 */

import { EXTENSION_ENUM } from './extension-enum';

export function getExtension(file: string): EXTENSION_ENUM
{
  if (file === undefined || file == null || file == '') {
    return EXTENSION_ENUM.NONE;
  }

  const index: number = file.indexOf('.');

  if (index === -1) {
    return EXTENSION_ENUM.NONE;
  }

  const ext: string = file.substr(index+1, file.length);

  switch (ext.toLowerCase())
  {
    case 'js':
      return EXTENSION_ENUM.SCRIPT;

    case 'css':
      return EXTENSION_ENUM.CSS;

    default:
      return EXTENSION_ENUM.NONE;
  }
}
