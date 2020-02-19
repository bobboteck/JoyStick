(function ()
{
	const template = document.createElement('template');
	template.innerHTML = `
	<style>
	.size
	{
		width:100%;
		height:100%;
		background-color:#a0a0a0;
	}
	</style>
	<canvas id="joystick"></canvas>
	`;

	let centerX=0;
	let centerY=0;
	let externalRadius=0;
	let internalRadius=0;
	let maxMoveStick=0;
    /******************************************************
	 * Private methods
	 *****************************************************/
	/**
	 * @desc Draw the external circle used as reference position
	 */
	function _drawExternal()
	{
		window.context.beginPath();
		window.context.arc(centerX, centerY, externalRadius, 0, 2 * Math.PI, false);
		window.context.lineWidth = 2;//this.externalLineWidth;
		window.context.strokeStyle = "#008000"//this.externalStrokeColor;
		window.context.stroke();
	}
	/**
	 * @desc Draw the internal stick in the current position the user have moved it
	 */
	function _drawInternal(self)
	{
		/*console.log("Int: " + centerX);
		console.log("Int: " + centerY);
		console.log("Int: " + internalRadius);*/
		console.log("Int: " + maxMoveStick);

		window.context.beginPath();
		if(self.movedX<internalRadius) self.movedX=maxMoveStick;
		if((self.movedX+internalRadius)>window.context.canvas.width) self.movedX=window.context.canvas.width-(maxMoveStick);
		if(self.movedY<internalRadius) self.movedY=maxMoveStick;
		if((self.movedY+internalRadius)>window.context.canvas.height) self.movedY=window.context.canvas.height-(maxMoveStick);
		window.context.arc(self.movedX, self.movedY, internalRadius, 0, 2 * Math.PI, false);
		// create radial gradient
		let grd = window.context.createRadialGradient(centerX, centerY, 5, centerX, centerY, 200);
		// Light color
		grd.addColorStop(0, '#00AA00'); //grd.addColorStop(0, internalFillColor);
		// Dark color
		grd.addColorStop(1, '#003300');   //grd.addColorStop(1, internalStrokeColor);
		window.context.fillStyle = grd;
		window.context.fill();
		window.context.lineWidth = 2; //internalLineWidth;
		window.context.strokeStyle = '#003300';   //internalStrokeColor;
		window.context.stroke();
	}

	class JoyStick extends HTMLElement
	{
		constructor()
		{
			super();
			this._shadowRoot = this.attachShadow({ 'mode': 'open' });
			this._shadowRoot.appendChild(template.content.cloneNode(true));
		}

		connectedCallback()
		{
			console.log('connected!');

			console.log(this.style.width);
			console.log(this.style.height);

			this.joyCanvas = this._shadowRoot.getElementById("joystick");
			this.joyCanvas.width=parseInt(this.style.width);
			this.joyCanvas.height=parseInt(this.style.height);
			window.context=this.joyCanvas.getContext('2d');

			this.pressed = 0; // Bool - 1=Yes - 0=No
			this.circumference = 2 * Math.PI;
			internalRadius = (this.joyCanvas.width-((50*2)+10))/2;
			maxMoveStick = internalRadius + 5;
			externalRadius = internalRadius + 30;
			centerX = this.joyCanvas.width / 2;
			centerY = this.joyCanvas.height / 2;
			this.directionHorizontalLimitPos = this.joyCanvas.width / 10;
			this.directionHorizontalLimitNeg = this.directionHorizontalLimitPos * -1;
			this.directionVerticalLimitPos = this.joyCanvas.height / 10;
			this.directionVerticalLimitNeg = this.directionVerticalLimitPos * -1;
			// Used to save current position of stick
			this.movedX=centerX;
			this.movedY=centerY;

			_drawExternal();
			_drawInternal(this);

			// Check if the device support the touch or not
			if("ontouchstart" in document.documentElement)
			{
				this.joyCanvas.addEventListener('touchstart', this.onTouchStart, false);
				this.joyCanvas.addEventListener('touchmove', this.onTouchMove, false);
				this.joyCanvas.addEventListener('touchend', this.onTouchEnd, false);
			}
			else
			{
				this.joyCanvas.addEventListener('mousedown', this.onMouseDown, false);
				this.joyCanvas.addEventListener('mousemove', this.onMouseMove, false);
				this.joyCanvas.addEventListener('mouseup', this.onMouseUp, false);
			}
		}

		disconnectedCallback()
		{
			console.log('disconnected!');
		}
		
		/**
		 * @desc Events for manage touch
		 */
		onTouchStart(event) 
		{
			pressed=1;
		}
		
		onTouchMove(event)
		{
			// Prevent the browser from doing its default thing (scroll, zoom)
			event.preventDefault();
			if(pressed==1)
			{
				movedX=event.touches[0].pageX;
				movedY=event.touches[0].pageY;
				// Manage offset
				movedX-=canvas.offsetLeft;
				movedY-=canvas.offsetTop;
				// Delete canvas
				context.clearRect(0, 0, canvas.width, canvas.height);
				// Redraw object
				_drawExternal();
				_drawInternal(this);
			}
		} 
		
		onTouchEnd(event) 
		{
			pressed=0;
			// If required reset position store variable
			if(true)//(autoReturnToCenter)
			{
				movedX=centerX;
				movedY=centerY;
			}
			// Delete canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Redraw object
			_drawExternal();
			_drawInternal(this);
			//canvas.unbind('touchmove');
		}
		/**
		 * @desc Events for manage mouse
		 */
		onMouseDown(event) 
		{
			this.pressed=1;
		}
		onMouseMove(event) 
		{
			if(this.pressed==1)
			{
				this.movedX=event.pageX;
				this.movedY=event.pageY;
				// Manage offset
				this.movedX-=this.offsetLeft;
				this.movedY-=this.offsetTop;
				// Delete canvas
				window.context.clearRect(0, 0, window.context.canvas.width, window.context.canvas.height);
				// Redraw object
				_drawExternal();
				_drawInternal(this);
			}
		}
		onMouseUp(event) 
		{
			this.pressed=0;
			// If required reset position store variable
			if(autoReturnToCenter)
			{
				this.movedX=centerX;
				this.movedY=centerY;
			}
			// Delete canvas
			window.context.clearRect(0, 0, window.context.canvas.width, window.context.canvas.height);
			// Redraw object
			_drawExternal();
			_drawInternal(this);
		}
	}

	window.customElements.define('wc-joystick', JoyStick);
})()