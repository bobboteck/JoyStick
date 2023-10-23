/*
 * Name          : joy.js
 * @author       : Roberto D'Amico (Bobboteck)
 * Last modified : 09.22.2023
 * Revision      : 1.1.6
 *
 * Modification History:
 * Date         Version     Modified By     Description
 * 2023-09-22   3.0.0       cybaj           Porting to TypeScript
 * 2021-12-21   2.0.0       Roberto D'Amico New version of the project that integrates the callback functions, while
 *                                          maintaining compatibility with previous versions. Fixed Issue #27 too,
 *                                          thanks to @artisticfox8 for the suggestion.
 * 2020-06-09   1.1.6       Roberto D'Amico Fixed Issue #10 and #11
 * 2020-04-20   1.1.5       Roberto D'Amico Correct: Two sticks in a row, thanks to @liamw9534 for the suggestion
 * 2020-04-03               Roberto D'Amico Correct: InternalRadius when change the size of canvas, thanks to
 *                                          @vanslipon for the suggestion
 * 2020-01-07   1.1.4       Roberto D'Amico Close #6 by implementing a new parameter to set the functionality of
 *                                          auto-return to 0 position
 * 2019-11-18   1.1.3       Roberto D'Amico Close #5 correct indication of East direction
 * 2019-11-12   1.1.2       Roberto D'Amico Removed Fix #4 incorrectly introduced and restored operation with touch
 *                                          devices
 * 2019-11-12   1.1.1       Roberto D'Amico Fixed Issue #4 - Now JoyStick work in any position in the page, not only
 *                                          at 0,0
 *
 * The MIT License (MIT)
 *
 *  This file is part of the JoyStick Project (https://github.com/bobboteck/JoyStick).
 *	Copyright (c) 2015 Roberto D'Amico (Bobboteck).
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
const defaultStickStatus = {
    xPosition: 0,
    yPosition: 0,
    x: 0,
    y: 0,
    cardinalDirection: "C",
};
const JoyStickDefaultParameters = {
    title: "joystick",
    width: 0,
    height: 0,
    internalFillColor: "#00AA00",
    internalLineWidth: 2,
    internalStrokeColor: "#003300",
    externalLineWidth: 2,
    externalStrokeColor: "#008000",
    autoReturnToCenter: true,
};
export class JoyStick {
    constructor(containerId, parameters = {}, callback = () => { }) {
        this.callback = callback;
        // Merge the user parameters with the default ones
        // and check if the mandatory parameters are defined
        // otherwise throw an error.
        const mergedParameters = Object.assign(Object.assign({}, JoyStickDefaultParameters), parameters);
        this.title = mergedParameters.title;
        this.width = mergedParameters.width;
        this.height = mergedParameters.height;
        this.internalFillColor = mergedParameters.internalFillColor;
        this.internalLineWidth = mergedParameters.internalLineWidth;
        this.internalStrokeColor = mergedParameters.internalStrokeColor;
        this.externalLineWidth = mergedParameters.externalLineWidth;
        this.externalStrokeColor = mergedParameters.externalStrokeColor;
        this.autoReturnToCenter = mergedParameters.autoReturnToCenter;
        this.objContainer = document.getElementById(containerId);
        // Fixing Unable to preventDefault inside passive event listener due to target being treated as passive in Chrome [Thanks to https://github.com/artisticfox8 for this suggestion]
        if (!this.objContainer) {
            throw new Error(`The container with id '${containerId}' was not found in the DOM.`);
        }
        this.objContainer.style.touchAction = "none";
        this.canvas = document.createElement("canvas");
        this.canvas.id = this.title;
        if (this.width === 0) {
            this.width = this.objContainer.clientWidth;
        }
        if (this.height === 0) {
            this.height = this.objContainer.clientHeight;
        }
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.objContainer.appendChild(this.canvas);
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Unable to get the 2D context from the canvas.");
        }
        this.context = context;
        // configuration of the Joystick
        this.circumference = 2 * Math.PI;
        this.internalRadius =
            (this.canvas.width - (this.canvas.width / 2 + 10)) / 2;
        this.maxMoveStick = this.internalRadius + 5;
        this.externalRadius = this.internalRadius + 30;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.directionHorizontalLimitPos = this.canvas.width / 10;
        this.directionHorizontalLimitNeg = this.directionHorizontalLimitPos * -1;
        this.directionVerticalLimitPos = this.canvas.height / 10;
        this.directionVerticalLimitNeg = this.directionVerticalLimitPos * -1;
        this.stickStatus = defaultStickStatus;
        this.pressed = false;
        // Used to save current position of stick
        this.movedX = this.centerX;
        this.movedY = this.centerY;
        // Check if the device support the touch or not
        if ("ontouchstart" in document.documentElement) {
            this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this), false);
            document.addEventListener("touchmove", this.onTouchMove.bind(this), false);
            document.addEventListener("touchend", this.onTouchEnd.bind(this), false);
        }
        else {
            this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this), false);
            document.addEventListener("mousemove", this.onMouseMove.bind(this), false);
            document.addEventListener("mouseup", this.onMouseUp.bind(this), false);
        }
        // Draw the object
        this.drawExternal();
        this.drawInternal();
    }
    /**
     * @desc Draw the external circle used as reference position
     */
    drawExternal() {
        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, this.externalRadius, 0, this.circumference, false);
        this.context.lineWidth = this.externalLineWidth;
        this.context.strokeStyle = this.externalStrokeColor;
        this.context.stroke();
    }
    /**
     * @desc Draw the internal stick in the current position the user have moved it
     */
    drawInternal() {
        this.context.beginPath();
        if (this.movedX < this.internalRadius) {
            this.movedX = this.maxMoveStick;
        }
        if (this.movedX + this.internalRadius > this.canvas.width) {
            this.movedX = this.canvas.width - this.maxMoveStick;
        }
        if (this.movedY < this.internalRadius) {
            this.movedY = this.maxMoveStick;
        }
        if (this.movedY + this.internalRadius > this.canvas.height) {
            this.movedY = this.canvas.height - this.maxMoveStick;
        }
        this.context.arc(this.movedX, this.movedY, this.internalRadius, 0, this.circumference, false);
        // create radial gradient
        var grd = this.context.createRadialGradient(this.centerX, this.centerY, 5, this.centerX, this.centerY, 200);
        // Light color
        grd.addColorStop(0, this.internalFillColor);
        // Dark color
        grd.addColorStop(1, this.internalStrokeColor);
        this.context.fillStyle = grd;
        this.context.fill();
        this.context.lineWidth = this.internalLineWidth;
        this.context.strokeStyle = this.internalStrokeColor;
        this.context.stroke();
    }
    /**
     * @desc Events for manage touch
     */
    onTouchStart(event) {
        this.pressed = true;
    }
    onTouchMove(event) {
        var _a, _b, _c;
        if (this.pressed && event.targetTouches[0].target === this.canvas) {
            this.movedX = event.targetTouches[0].pageX;
            this.movedY = event.targetTouches[0].pageY;
            // Manage offset
            if (((_a = this.canvas.offsetParent) === null || _a === void 0 ? void 0 : _a.tagName.toUpperCase()) === "BODY") {
                this.movedX -= this.canvas.offsetLeft;
                this.movedY -= this.canvas.offsetTop;
            }
            else {
                // TODO delete offsetParent dependency
                // @ts-ignore
                this.movedX -= (_b = this.canvas.offsetParent) === null || _b === void 0 ? void 0 : _b.offsetLeft;
                // @ts-ignore
                this.movedY -= (_c = this.canvas.offsetParent) === null || _c === void 0 ? void 0 : _c.offsetTop;
            }
            // Delete canvas
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Redraw object
            this.drawExternal();
            this.drawInternal();
            // Set attribute of callback
            this.stickStatus.xPosition = this.movedX;
            this.stickStatus.yPosition = this.movedY;
            this.stickStatus.x =
                100 * ((this.movedX - this.centerX) / this.maxMoveStick);
            this.stickStatus.y =
                100 * ((this.movedY - this.centerY) / this.maxMoveStick) * -1;
            this.stickStatus.cardinalDirection = this.getCardinalDirection();
            this.callback(this.stickStatus);
        }
    }
    onTouchEnd(event) {
        this.pressed = false;
        // If required reset position store variable
        if (this.autoReturnToCenter) {
            this.movedX = this.centerX;
            this.movedY = this.centerY;
        }
        // Delete canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Redraw object
        this.drawExternal();
        this.drawInternal();
        // Set attribute of callback
        this.stickStatus.xPosition = this.movedX;
        this.stickStatus.yPosition = this.movedY;
        this.stickStatus.x =
            100 * ((this.movedX - this.centerX) / this.maxMoveStick);
        this.stickStatus.y =
            100 * ((this.movedY - this.centerY) / this.maxMoveStick) * -1;
        this.stickStatus.cardinalDirection = this.getCardinalDirection();
        this.callback(this.stickStatus);
    }
    /**
     * @desc Events for manage mouse
     */
    onMouseDown(event) {
        this.pressed = true;
    }
    /* To simplify this code there was a new experimental feature here: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX , but it present only in Mouse case not metod presents in Touch case :-( */
    onMouseMove(event) {
        var _a, _b, _c;
        if (this.pressed) {
            this.movedX = event.pageX;
            this.movedY = event.pageY;
            // Manage offset
            if (((_a = this.canvas.offsetParent) === null || _a === void 0 ? void 0 : _a.tagName.toUpperCase()) === "BODY") {
                this.movedX -= this.canvas.offsetLeft;
                this.movedY -= this.canvas.offsetTop;
            }
            else {
                // @ts-ignore
                this.movedX -= (_b = this.canvas.offsetParent) === null || _b === void 0 ? void 0 : _b.offsetLeft;
                // @ts-ignore
                this.movedY -= (_c = this.canvas.offsetParent) === null || _c === void 0 ? void 0 : _c.offsetTop;
            }
            // Delete canvas
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Redraw object
            this.drawExternal();
            this.drawInternal();
            // Set attribute of callback
            this.stickStatus.xPosition = this.movedX;
            this.stickStatus.yPosition = this.movedY;
            this.stickStatus.x =
                100 * ((this.movedX - this.centerX) / this.maxMoveStick);
            this.stickStatus.y =
                100 * ((this.movedY - this.centerY) / this.maxMoveStick) * -1;
            this.stickStatus.cardinalDirection = this.getCardinalDirection();
            this.callback(this.stickStatus);
        }
    }
    onMouseUp(event) {
        this.pressed = false;
        // If required reset position store variable
        if (this.autoReturnToCenter) {
            this.movedX = this.centerX;
            this.movedY = this.centerY;
        }
        // Delete canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Redraw object
        this.drawExternal();
        this.drawInternal();
        // Set attribute of callback
        this.stickStatus.xPosition = this.movedX;
        this.stickStatus.yPosition = this.movedY;
        this.stickStatus.x =
            100 * ((this.movedX - this.centerX) / this.maxMoveStick);
        this.stickStatus.y =
            100 * ((this.movedY - this.centerY) / this.maxMoveStick) * -1;
        this.stickStatus.cardinalDirection = this.getCardinalDirection();
        this.callback(this.stickStatus);
    }
    getCardinalDirection() {
        let result = "";
        const orizontal = this.movedX - this.centerX;
        const vertical = this.movedY - this.centerY;
        if (vertical >= this.directionVerticalLimitNeg &&
            vertical <= this.directionVerticalLimitPos) {
            result = "C";
        }
        if (vertical < this.directionVerticalLimitNeg) {
            result = "N";
        }
        if (vertical > this.directionVerticalLimitPos) {
            result = "S";
        }
        if (orizontal < this.directionHorizontalLimitNeg) {
            if (result === "C") {
                result = "W";
            }
            else {
                result += "W";
            }
        }
        if (orizontal > this.directionHorizontalLimitPos) {
            if (result === "C") {
                result = "E";
            }
            else {
                result += "E";
            }
        }
        return result;
    }
    /**
     * @desc The width of canvas
     * @return Number of pixel width
     */
    getWidth() {
        return this.canvas.width;
    }
    /**
     * @desc The height of canvas
     * @return Number of pixel height
     */
    getHeigh() {
        return this.canvas.height;
    }
    /**
     * @desc The X position of the cursor relative to the canvas that contains it and to its dimensions
     * @return Number that indicate relative position
     */
    getPosX() {
        return this.movedX;
    }
    /**
     * @desc The Y position of the cursor relative to the canvas that contains it and to its dimensions
     * @return Number that indicate relative position
     */
    getPosY() {
        return this.movedY;
    }
    /**
     * @desc Normalizzed value of X move of stick
     * @return Integer from -100 to +100
     */
    getX() {
        return 100 * ((this.movedX - this.centerX) / this.maxMoveStick);
    }
    /**
     * @desc Normalizzed value of Y move of stick
     * @return Integer from -100 to +100
     */
    getY() {
        return 100 * ((this.movedY - this.centerY) / this.maxMoveStick) * -1;
    }
    /**
     * @desc Get the direction of the cursor as a string that indicates the cardinal points where this is oriented
     * @return String of cardinal point N, NE, E, SE, S, SW, W, NW and C when it is placed in the center
     */
    getDir() {
        return this.getCardinalDirection();
    }
}
export default JoyStick;
