/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.97
 *
 * Copyright 2011-2022 Cesium Contributors
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
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["./CylinderGeometry-cdeac4eb","./defaultValue-9e6a554b","./Transforms-8ac604cd","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./WebGLConstants-f98c7b4b","./RuntimeError-671c2607","./combine-e8ef3dac","./CylinderGeometryLibrary-f7ec3b26","./GeometryAttribute-571d93bc","./GeometryAttributes-aa146789","./GeometryOffsetAttribute-2ef72ea5","./IndexDatatype-83664323","./VertexFormat-32d2e9ac"],(function(e,t,r,a,n,c,o,i,d,y,b,m,f,u){"use strict";return function(r,a){return t.defined(a)&&(r=e.CylinderGeometry.unpack(r,a)),e.CylinderGeometry.createGeometry(r)}}));
