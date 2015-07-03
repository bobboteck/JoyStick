/*!
 * Name          : joy.js
 * @author       : Roberto D'Amico (Bobboteck)
 * Last modified : 03.07.2015
 * Revision      : 1.0.1
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
 
/**
 * @desc Principal object that draw a joystick, you only need to initialize the object and suggest the HTML container
 * @param {String} container - HTML object that contains the Joystick
 * @param {String} parameters [optional] - JSON String whit this parameters
 * 		- title - The ID of canvas (Default value is 'joystick')
 * 		- width - The width of canvas, if not specified is setted at width of container object
 * 		- height - The height of canvas, if not specified is setted at height of container object
 * 		- internalFillColor - 
 * 		- internalLineWidth -
 * 		- internalStrokeColor -
 * 		- externalLineWidth -
 * 		- externalStrokeColor - 
 */
var JoyStick = (function(container, parameters) {
	parameters = parameters || {};
	var title = (undefined === parameters.title ? 'joystick' : parameters.title),
		width = (undefined === parameters.width ? 0 : parameters.width),
		height = (undefined === parameters.height ? 0 : parameters.height),
		internalFillColor = (undefined === parameters.internalFillColor ? '#008000' : parameters.internalFillColor),
		internalLineWidth = (undefined === parameters.internalLineWidth ? 2 : parameters.internalLineWidth),
		internalStrokeColor = (undefined === parameters.internalStrokeColor ? '#003300' : parameters.internalStrokeColor),
		externalLineWidth = (undefined === parameters.externalLineWidth ? 2 : parameters.externalLineWidth),
		externalStrokeColor = (undefined === parameters.externalStrokeColor ? '#008000' : parameters.externalStrokeColor);
	
	// Create Canvas element and add it in the Container object
	var objContainer = document.getElementById(container);
	var canvas = document.createElement('canvas');
	canvas.id = title;
	if(width == 0) width = objContainer.clientWidth;
	if(height == 0) height = objContainer.clientHeight;
	canvas.width = width;
	canvas.height = height;
	objContainer.appendChild(canvas);
	var context=canvas.getContext('2d');
	
	var pressed = 0; // Bool - 1=Yes - 0=No
	var circumference = 2 * Math.PI;
	var internalRadius = (canvas.width-((50*2)+10))/2;
	var externalRadius = internalRadius + 30;
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	// Used to save position of stick
	var movedX=centerX;
	var movedY=centerY;
	
	/**
	 * @desc Draw the external circle used as reference position
	 */
	function drawExternal()
	{
		context.beginPath();
		context.arc(centerX, centerY, externalRadius, 0, circumference, false);
		context.lineWidth = externalLineWidth;
		context.strokeStyle = externalStrokeColor;
		context.stroke();
	}
	/**
	 * @desc Draw the internal stick in the current position the user have moved it
	 */
	function drawInternal()
	{
		context.beginPath();
		if(movedX<internalRadius) movedX=internalRadius+5;
		if((movedX+internalRadius)>canvas.width) movedX=canvas.width-(internalRadius+5);
		if(movedY<internalRadius) movedY=internalRadius+5;
		if((movedY+internalRadius)>canvas.height) movedY=canvas.height-(internalRadius+5);
		context.arc(movedX, movedY, internalRadius, 0, circumference, false);
		// create radial gradient
		var grd = context.createRadialGradient(movedX, movedY, 10, movedX, movedY, 80);
		// Light color
		grd.addColorStop(0, internalFillColor);
		// Dark color
		grd.addColorStop(1, internalStrokeColor);
		context.fillStyle = grd;
		context.fill();
		context.lineWidth = internalLineWidth;
		context.strokeStyle = internalStrokeColor;
		context.stroke();
	}
	
	/**
	 * @desc Events for manage touch
	 */
	function onTouchStart(event) 
	{
		pressed=1;
	}
	function onTouchMove(event) {
		// Prevent the browser from doing its default thing (scroll, zoom)
		event.preventDefault();
		if(pressed==1)
		{
			movedX=event.touches[0].pageX;
			movedY=event.touches[0].pageY;
			// Gestisce eventuali offset
			movedX-=canvas.offsetLeft;
			movedY-=canvas.offsetTop;
			// Cancellare il canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Disegna gli oggetti
			drawExternal();
			drawInternal();
		}
	} 
	function onTouchEnd(event) 
	{
		pressed=0;
		// Centra le variabili che indicano la posizione
		movedX=centerX;
		movedY=centerY;
		// Cancellare il canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Ridisegna gli oggetti
		drawExternal();
		drawInternal();
		//canvas.unbind('touchmove');
	}
	/**
	 * @desc Events for manage mouse
	 */
	function onMouseDown(event) 
	{
		pressed=1;
	}
	function onMouseMove(event) 
	{
		if(pressed==1)
		{
			movedX=event.pageX;
			movedY=event.pageY;
			// Gestisce eventuali offset
			movedX-=canvas.offsetLeft;
			movedY-=canvas.offsetTop;
			// Cancellare il canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Disegna gli oggetti
			drawExternal();
			drawInternal();
		}
	}
	function onMouseUp(event) 
	{
		pressed=0;
		// Centra le variabili che indicano la posizione
		movedX=centerX;
		movedY=centerY;
		// Cancellare il canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Ridisegna gli oggetti
		drawExternal();
		drawInternal();
		//canvas.unbind('mousemove');
	}

	/**
	 * Public methods
	 */
	this.GetWidth = function () 
	{
		return canvas.width;
	};
	
	this.GetHeight = function () 
	{
		return canvas.height;
	};
	
	this.GetPosX = function ()
	{
		return movedX;
	};

	this.GetPosY = function ()
	{
		return movedY;
	};
	
	this.GetDir = function()
	{
		var result = "";
		var orizontal = movedX - centerX;
		var vertical = movedY - centerY;
		
		if(vertical>=-14 && vertical<=14)
		{
			result = "C";
		}
		if(vertical<-15)
		{
			result = "N";
		}
		if(vertical>15)
		{
			result = "S";
		}
		
		if(orizontal<-15)
		{
			if(result=="C")
			{ 
				result = "W";
			}
			else
			{
				result += "W";
			}
		}
		if(orizontal>15)
		{
			if(result=="C")
			{ 
				result = "W";
			}
			else
			{
				result += "E";
			}
		}
		
		return result;
	};
	
	// Check if the device support the touch or not
	var touchable = 'createTouch' in document;
	if(touchable)
	{
		//alert("Yes you can Touch me!");
		canvas.addEventListener( 'touchstart', onTouchStart, false );
		canvas.addEventListener( 'touchmove', onTouchMove, false );
		canvas.addEventListener( 'touchend', onTouchEnd, false );
	}
	else
	{
		//alert("Sorry you can only Click me!");
		canvas.addEventListener('mousedown', onMouseDown, false);
		canvas.addEventListener('mousemove', onMouseMove, false);
		canvas.addEventListener('mouseup', onMouseUp, false);
	}
	// Draw the object
	drawExternal();
	drawInternal(centerX, centerY);
});