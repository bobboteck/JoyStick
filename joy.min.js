/*
 * Name          : joy.js
 * @author       : Roberto D'Amico (Bobboteck)
 * Last modified : 09.06.2020
 * Revision      : 1.1.6
 *
 * Modification History:
 * Date         Version     Modified By		Description
 * 2020-06-09	1.1.6		Roberto D'Amico	Fixed Issue #10 and #11
 * 2020-04-20	1.1.5		Roberto D'Amico	Correct: Two sticks in a row, thanks to @liamw9534 for the suggestion
 * 2020-04-03               Roberto D'Amico Correct: InternalRadius when change the size of canvas, thanks to @vanslipon for the suggestion
 * 2020-01-07	1.1.4		Roberto D'Amico Close #6 by implementing a new parameter to set the functionality of auto-return to 0 position
 * 2019-11-18	1.1.3		Roberto D'Amico	Close #5 correct indication of East direction
 * 2019-11-12   1.1.2       Roberto D'Amico Removed Fix #4 incorrectly introduced and restored operation with touch devices
 * 2019-11-12   1.1.1       Roberto D'Amico Fixed Issue #4 - Now JoyStick work in any position in the page, not only at 0,0
 * 
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Roberto D'Amico (Bobboteck)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var JoyStick=function(t,e){var i=void 0===(e=e||{}).title?"joystick":e.title,n=void 0===e.width?0:e.width,o=void 0===e.height?0:e.height,r=void 0===e.internalFillColor?"#00AA00":e.internalFillColor,h=void 0===e.internalLineWidth?2:e.internalLineWidth,a=void 0===e.internalStrokeColor?"#003300":e.internalStrokeColor,d=void 0===e.externalLineWidth?2:e.externalLineWidth,f=void 0===e.externalStrokeColor?"#008000":e.externalStrokeColor,l=void 0===e.autoReturnToCenter||e.autoReturnToCenter,s=document.getElementById(t),c=document.createElement("canvas");c.id=i,0===n&&(n=s.clientWidth),0===o&&(o=s.clientHeight),c.width=n,c.height=o,s.appendChild(c);var u=c.getContext("2d"),g=0,v=2*Math.PI,p=(c.width-(c.width/2+10))/2,C=p+5,w=p+30,m=c.width/2,L=c.height/2,E=c.width/10,P=-1*E,S=c.height/10,k=-1*S,W=m,T=L;function G(){u.beginPath(),u.arc(m,L,w,0,v,!1),u.lineWidth=d,u.strokeStyle=f,u.stroke()}function x(){u.beginPath(),W<p&&(W=C),W+p>c.width&&(W=c.width-C),T<p&&(T=C),T+p>c.height&&(T=c.height-C),u.arc(W,T,p,0,v,!1);var t=u.createRadialGradient(m,L,5,m,L,200);t.addColorStop(0,r),t.addColorStop(1,a),u.fillStyle=t,u.fill(),u.lineWidth=h,u.strokeStyle=a,u.stroke()}"ontouchstart"in document.documentElement?(c.addEventListener("touchstart",function(t){g=1},!1),c.addEventListener("touchmove",function(t){t.preventDefault(),1===g&&t.targetTouches[0].target===c&&(W=t.targetTouches[0].pageX,T=t.targetTouches[0].pageY,"BODY"===c.offsetParent.tagName.toUpperCase()?(W-=c.offsetLeft,T-=c.offsetTop):(W-=c.offsetParent.offsetLeft,T-=c.offsetParent.offsetTop),u.clearRect(0,0,c.width,c.height),G(),x())},!1),c.addEventListener("touchend",function(t){g=0,l&&(W=m,T=L);u.clearRect(0,0,c.width,c.height),G(),x()},!1)):(c.addEventListener("mousedown",function(t){g=1},!1),c.addEventListener("mousemove",function(t){1===g&&(W=t.pageX,T=t.pageY,"BODY"===c.offsetParent.tagName.toUpperCase()?(W-=c.offsetLeft,T-=c.offsetTop):(W-=c.offsetParent.offsetLeft,T-=c.offsetParent.offsetTop),u.clearRect(0,0,c.width,c.height),G(),x())},!1),c.addEventListener("mouseup",function(t){g=0,l&&(W=m,T=L);u.clearRect(0,0,c.width,c.height),G(),x()},!1)),G(),x(),this.GetWidth=function(){return c.width},this.GetHeight=function(){return c.height},this.GetPosX=function(){return W},this.GetPosY=function(){return T},this.GetX=function(){return((W-m)/C*100).toFixed()},this.GetY=function(){return((T-L)/C*100*-1).toFixed()},this.GetDir=function(){var t="",e=W-m,i=T-L;return i>=k&&i<=S&&(t="C"),i<k&&(t="N"),i>S&&(t="S"),e<P&&("C"===t?t="W":t+="W"),e>E&&("C"===t?t="E":t+="E"),t}};