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
define(["./defaultValue-9e6a554b","./Transforms-8ac604cd","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./FrustumGeometry-a60c9387","./GeometryAttribute-571d93bc","./GeometryAttributes-aa146789","./combine-e8ef3dac","./RuntimeError-671c2607","./WebGLConstants-f98c7b4b","./Plane-6d3de2d4","./VertexFormat-32d2e9ac"],(function(e,t,r,n,a,u,i,o,c,s,p,m){"use strict";function d(n){const u=n.frustum,i=n.orientation,o=n.origin,c=e.defaultValue(n._drawNearPlane,!0);let s,p;u instanceof a.PerspectiveFrustum?(s=0,p=a.PerspectiveFrustum.packedLength):u instanceof a.OrthographicFrustum&&(s=1,p=a.OrthographicFrustum.packedLength),this._frustumType=s,this._frustum=u.clone(),this._origin=r.Cartesian3.clone(o),this._orientation=t.Quaternion.clone(i),this._drawNearPlane=c,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+p+r.Cartesian3.packedLength+t.Quaternion.packedLength}d.pack=function(n,u,i){i=e.defaultValue(i,0);const o=n._frustumType,c=n._frustum;return u[i++]=o,0===o?(a.PerspectiveFrustum.pack(c,u,i),i+=a.PerspectiveFrustum.packedLength):(a.OrthographicFrustum.pack(c,u,i),i+=a.OrthographicFrustum.packedLength),r.Cartesian3.pack(n._origin,u,i),i+=r.Cartesian3.packedLength,t.Quaternion.pack(n._orientation,u,i),u[i+=t.Quaternion.packedLength]=n._drawNearPlane?1:0,u};const h=new a.PerspectiveFrustum,f=new a.OrthographicFrustum,g=new t.Quaternion,l=new r.Cartesian3;return d.unpack=function(n,u,i){u=e.defaultValue(u,0);const o=n[u++];let c;0===o?(c=a.PerspectiveFrustum.unpack(n,u,h),u+=a.PerspectiveFrustum.packedLength):(c=a.OrthographicFrustum.unpack(n,u,f),u+=a.OrthographicFrustum.packedLength);const s=r.Cartesian3.unpack(n,u,l);u+=r.Cartesian3.packedLength;const p=t.Quaternion.unpack(n,u,g),m=1===n[u+=t.Quaternion.packedLength];if(!e.defined(i))return new d({frustum:c,origin:s,orientation:p,_drawNearPlane:m});const _=o===i._frustumType?i._frustum:void 0;return i._frustum=c.clone(_),i._frustumType=o,i._origin=r.Cartesian3.clone(s,i._origin),i._orientation=t.Quaternion.clone(p,i._orientation),i._drawNearPlane=m,i},d.createGeometry=function(e){const r=e._frustumType,o=e._frustum,c=e._origin,s=e._orientation,p=e._drawNearPlane,m=new Float64Array(24);a.FrustumGeometry._computeNearFarPlanes(c,s,r,o,m);const d=new i.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m})});let h,f;const g=p?2:1,l=new Uint16Array(8*(g+1));let _=p?0:1;for(;_<2;++_)h=p?8*_:0,f=4*_,l[h]=f,l[h+1]=f+1,l[h+2]=f+1,l[h+3]=f+2,l[h+4]=f+2,l[h+5]=f+3,l[h+6]=f+3,l[h+7]=f;for(_=0;_<2;++_)h=8*(g+_),f=4*_,l[h]=f,l[h+1]=f+4,l[h+2]=f+1,l[h+3]=f+5,l[h+4]=f+2,l[h+5]=f+6,l[h+6]=f+3,l[h+7]=f+7;return new u.Geometry({attributes:d,indices:l,primitiveType:u.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(m)})},function(t,r){return e.defined(r)&&(t=d.unpack(t,r)),d.createGeometry(t)}}));
