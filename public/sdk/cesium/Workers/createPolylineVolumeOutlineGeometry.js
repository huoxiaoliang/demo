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
define(["./defaultValue-9e6a554b","./Matrix2-474e79ca","./arrayRemoveDuplicates-46e19274","./BoundingRectangle-87258bfe","./Transforms-8ac604cd","./ComponentDatatype-bd805364","./PolylineVolumeGeometryLibrary-cb97b197","./GeometryAttribute-571d93bc","./GeometryAttributes-aa146789","./IndexDatatype-83664323","./PolygonPipeline-3d63eaa7","./RuntimeError-671c2607","./combine-e8ef3dac","./WebGLConstants-f98c7b4b","./EllipsoidTangentPlane-e4e1fe52","./AxisAlignedBoundingBox-628d0e2c","./IntersectionTests-6be980fd","./Plane-6d3de2d4","./PolylinePipeline-70715b91","./EllipsoidGeodesic-8b0f51fe","./EllipsoidRhumbLine-d4d28c7f"],(function(e,t,n,i,o,a,l,r,s,p,c,d,u,y,g,h,f,m,E,P,_){"use strict";function b(n){const i=(n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT)).polylinePositions,o=n.shapePositions;this._positions=i,this._shape=o,this._ellipsoid=t.Ellipsoid.clone(e.defaultValue(n.ellipsoid,t.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(n.cornerType,l.CornerType.ROUNDED),this._granularity=e.defaultValue(n.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";let r=1+i.length*t.Cartesian3.packedLength;r+=1+o.length*t.Cartesian2.packedLength,this.packedLength=r+t.Ellipsoid.packedLength+2}b.pack=function(n,i,o){let a;o=e.defaultValue(o,0);const l=n._positions;let r=l.length;for(i[o++]=r,a=0;a<r;++a,o+=t.Cartesian3.packedLength)t.Cartesian3.pack(l[a],i,o);const s=n._shape;for(r=s.length,i[o++]=r,a=0;a<r;++a,o+=t.Cartesian2.packedLength)t.Cartesian2.pack(s[a],i,o);return t.Ellipsoid.pack(n._ellipsoid,i,o),o+=t.Ellipsoid.packedLength,i[o++]=n._cornerType,i[o]=n._granularity,i};const k=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),C={polylinePositions:void 0,shapePositions:void 0,ellipsoid:k,height:void 0,cornerType:void 0,granularity:void 0};b.unpack=function(n,i,o){let a;i=e.defaultValue(i,0);let l=n[i++];const r=new Array(l);for(a=0;a<l;++a,i+=t.Cartesian3.packedLength)r[a]=t.Cartesian3.unpack(n,i);l=n[i++];const s=new Array(l);for(a=0;a<l;++a,i+=t.Cartesian2.packedLength)s[a]=t.Cartesian2.unpack(n,i);const p=t.Ellipsoid.unpack(n,i,k);i+=t.Ellipsoid.packedLength;const c=n[i++],d=n[i];return e.defined(o)?(o._positions=r,o._shape=s,o._ellipsoid=t.Ellipsoid.clone(p,o._ellipsoid),o._cornerType=c,o._granularity=d,o):(C.polylinePositions=r,C.shapePositions=s,C.cornerType=c,C.granularity=d,new b(C))};const L=new i.BoundingRectangle;return b.createGeometry=function(e){const d=e._positions,u=n.arrayRemoveDuplicates(d,t.Cartesian3.equalsEpsilon);let y=e._shape;if(y=l.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y),u.length<2||y.length<3)return;c.PolygonPipeline.computeWindingOrder2D(y)===c.WindingOrder.CLOCKWISE&&y.reverse();const g=i.BoundingRectangle.fromPoints(y,L);return function(e,t){const n=new s.GeometryAttributes;n.position=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});const i=t.length,l=n.position.values.length/3,c=e.length/3/i,d=p.IndexDatatype.createTypedArray(l,2*i*(c+1));let u,y,g=0;u=0;let h=u*i;for(y=0;y<i-1;y++)d[g++]=y+h,d[g++]=y+h+1;for(d[g++]=i-1+h,d[g++]=h,u=c-1,h=u*i,y=0;y<i-1;y++)d[g++]=y+h,d[g++]=y+h+1;for(d[g++]=i-1+h,d[g++]=h,u=0;u<c-1;u++){const e=i*u,t=e+i;for(y=0;y<i;y++)d[g++]=y+e,d[g++]=y+t}return new r.Geometry({attributes:n,indices:p.IndexDatatype.createTypedArray(l,d),boundingSphere:o.BoundingSphere.fromVertices(e),primitiveType:r.PrimitiveType.LINES})}(l.PolylineVolumeGeometryLibrary.computePositions(u,y,g,e,!1),y)},function(n,i){return e.defined(i)&&(n=b.unpack(n,i)),n._ellipsoid=t.Ellipsoid.clone(n._ellipsoid),b.createGeometry(n)}}));
