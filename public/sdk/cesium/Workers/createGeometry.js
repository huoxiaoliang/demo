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
define(["./defaultValue-9e6a554b","./PrimitivePipeline-c6be101b","./createTaskProcessorWorker","./Transforms-8ac604cd","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./WebGLConstants-f98c7b4b","./RuntimeError-671c2607","./combine-e8ef3dac","./GeometryAttribute-571d93bc","./GeometryAttributes-aa146789","./GeometryPipeline-a7d0ab2d","./AttributeCompression-d23e49ed","./EncodedCartesian3-56641829","./IndexDatatype-83664323","./IntersectionTests-6be980fd","./Plane-6d3de2d4","./WebMercatorProjection-c43c4879"],(function(e,t,r,n,o,i,s,a,c,d,u,f,b,m,l,p,y,P){"use strict";const k={};function C(t){let r=k[t];return e.defined(r)||("object"==typeof exports?k[r]=r=require(`Workers/${t}`):require([`Workers/${t}`],(function(e){r=e,k[r]=e}))),r}return r((function(r,n){const o=r.subTasks,i=o.length,s=new Array(i);for(let t=0;t<i;t++){const r=o[t],n=r.geometry,i=r.moduleName;if(e.defined(i)){const e=C(i);s[t]=e(n,r.offset)}else s[t]=n}return Promise.all(s).then((function(e){return t.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
