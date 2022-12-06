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
define(["./arrayRemoveDuplicates-46e19274","./Transforms-8ac604cd","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./CoplanarPolygonGeometryLibrary-6fa3e4f0","./defaultValue-9e6a554b","./GeometryAttribute-571d93bc","./GeometryAttributes-aa146789","./GeometryInstance-f2f89e81","./GeometryPipeline-a7d0ab2d","./IndexDatatype-83664323","./PolygonGeometryLibrary-a777e007","./combine-e8ef3dac","./RuntimeError-671c2607","./WebGLConstants-f98c7b4b","./OrientedBoundingBox-69d83d2f","./EllipsoidTangentPlane-e4e1fe52","./AxisAlignedBoundingBox-628d0e2c","./IntersectionTests-6be980fd","./Plane-6d3de2d4","./AttributeCompression-d23e49ed","./EncodedCartesian3-56641829","./ArcType-ca475ddd","./EllipsoidRhumbLine-d4d28c7f","./PolygonPipeline-3d63eaa7"],(function(e,t,n,o,r,i,a,y,c,l,s,d,u,p,m,f,g,b,h,P,G,L,C,T,E){"use strict";function A(e){const t=e.length,n=new Float64Array(3*t),r=s.IndexDatatype.createTypedArray(t,2*t);let i=0,c=0;for(let o=0;o<t;o++){const a=e[o];n[i++]=a.x,n[i++]=a.y,n[i++]=a.z,r[c++]=o,r[c++]=(o+1)%t}const l=new y.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new a.Geometry({attributes:l,indices:r,primitiveType:a.PrimitiveType.LINES})}function H(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=d.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}H.fromPositions=function(e){return new H({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions}})},H.pack=function(e,t,o){return o=i.defaultValue(o,0),t[o=d.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const k={polygonHierarchy:{}};return H.unpack=function(e,t,o){t=i.defaultValue(t,0);const r=d.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const a=e[t];return i.defined(o)||(o=new H(k)),o._polygonHierarchy=r,o.packedLength=a,o},H.createGeometry=function(o){const i=o._polygonHierarchy;let y=i.positions;if(y=e.arrayRemoveDuplicates(y,n.Cartesian3.equalsEpsilon,!0),y.length<3)return;if(!r.CoplanarPolygonGeometryLibrary.validOutline(y))return;const s=d.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(i,!1);if(0===s.length)return;const u=[];for(let e=0;e<s.length;e++){const t=new c.GeometryInstance({geometry:A(s[e])});u.push(t)}const p=l.GeometryPipeline.combineInstances(u)[0],m=t.BoundingSphere.fromPoints(i.positions);return new a.Geometry({attributes:p.attributes,indices:p.indices,primitiveType:p.primitiveType,boundingSphere:m})},function(e,t){return i.defined(t)&&(e=H.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),H.createGeometry(e)}}));
