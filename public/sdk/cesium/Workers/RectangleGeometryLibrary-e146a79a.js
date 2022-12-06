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
define(["exports","./Matrix2-474e79ca","./defaultValue-9e6a554b","./Transforms-8ac604cd","./ComponentDatatype-bd805364"],(function(t,n,a,e,o){"use strict";const r=Math.cos,s=Math.sin,i=Math.sqrt,c={computePosition:function(t,n,e,o,c,g,u){const h=n.radiiSquared,l=t.nwCorner,C=t.boundingRectangle;let S=l.latitude-t.granYCos*o+c*t.granXSin;const d=r(S),w=s(S),M=h.z*w;let X=l.longitude+o*t.granYSin+c*t.granXCos;const Y=d*r(X),m=d*s(X),p=h.x*Y,f=h.y*m,x=i(p*Y+f*m+M*w);if(g.x=p/x,g.y=f/x,g.z=M/x,e){const n=t.stNwCorner;a.defined(n)?(S=n.latitude-t.stGranYCos*o+c*t.stGranXSin,X=n.longitude+o*t.stGranYSin+c*t.stGranXCos,u.x=(X-t.stWest)*t.lonScalar,u.y=(S-t.stSouth)*t.latScalar):(u.x=(X-C.west)*t.lonScalar,u.y=(S-C.south)*t.latScalar)}}},g=new n.Matrix2;let u=new n.Cartesian3;const h=new n.Cartographic;let l=new n.Cartesian3;const C=new e.GeographicProjection;function S(t,a,e,o,r,s,i){const c=Math.cos(a),h=o*c,S=e*c,d=Math.sin(a),w=o*d,M=e*d;u=C.project(t,u),u=n.Cartesian3.subtract(u,l,u);const X=n.Matrix2.fromRotation(a,g);u=n.Matrix2.multiplyByVector(X,u,u),u=n.Cartesian3.add(u,l,u),s-=1,i-=1;const Y=(t=C.unproject(u,t)).latitude,m=Y+s*M,p=Y-h*i,f=Y-h*i+s*M,x=Math.max(Y,m,p,f),G=Math.min(Y,m,p,f),R=t.longitude,y=R+s*S,O=R+i*w,b=R+i*w+s*S;return{north:x,south:G,east:Math.max(R,y,O,b),west:Math.min(R,y,O,b),granYCos:h,granYSin:w,granXCos:S,granXSin:M,nwCorner:t}}c.computeOptions=function(t,a,e,r,s,i,c){let g,u=t.east,d=t.west,w=t.north,M=t.south,X=!1,Y=!1;w===o.CesiumMath.PI_OVER_TWO&&(X=!0),M===-o.CesiumMath.PI_OVER_TWO&&(Y=!0);const m=w-M;g=d>u?o.CesiumMath.TWO_PI-d+u:u-d;const p=Math.ceil(g/a)+1,f=Math.ceil(m/a)+1,x=g/(p-1),G=m/(f-1),R=n.Rectangle.northwest(t,i),y=n.Rectangle.center(t,h);0===e&&0===r||(y.longitude<R.longitude&&(y.longitude+=o.CesiumMath.TWO_PI),l=C.project(y,l));const O=G,b=x,P=n.Rectangle.clone(t,s),W={granYCos:O,granYSin:0,granXCos:b,granXSin:0,nwCorner:R,boundingRectangle:P,width:p,height:f,northCap:X,southCap:Y};if(0!==e){const t=S(R,e,x,G,0,p,f);w=t.north,M=t.south,u=t.east,d=t.west,W.granYCos=t.granYCos,W.granYSin=t.granYSin,W.granXCos=t.granXCos,W.granXSin=t.granXSin,P.north=w,P.south=M,P.east=u,P.west=d}if(0!==r){e-=r;const t=n.Rectangle.northwest(P,c),a=S(t,e,x,G,0,p,f);W.stGranYCos=a.granYCos,W.stGranXCos=a.granXCos,W.stGranYSin=a.granYSin,W.stGranXSin=a.granXSin,W.stNwCorner=t,W.stWest=a.west,W.stSouth=a.south}return W};var d=c;t.RectangleGeometryLibrary=d}));
