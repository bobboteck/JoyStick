interface StickStatus {
    xPosition: number;
    yPosition: number;
    x: number;
    y: number;
    cardinalDirection: CardinalDirection;
}
type CardinalDirection = "C" | "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
interface JoyStickMembers {
    title: string;
    width: number;
    height: number;
    internalFillColor: string;
    internalLineWidth: number;
    internalStrokeColor: string;
    externalLineWidth: number;
    externalStrokeColor: string;
    autoReturnToCenter: boolean;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    circumference: number;
    internalRadius: number;
    maxMoveStick: number;
    xCenter: number;
    yCenter: number;
    movedX: number;
    movedY: number;
    pressed: boolean;
    callback: JoyStickCallback;
    stickStatus: StickStatus;
}
interface JoyStickParameters extends Partial<JoyStickMembers> {
}
type JoyStickCallback = (stickStatus: any) => void;
export declare class JoyStick {
    private title;
    private width;
    private height;
    private internalFillColor;
    private internalLineWidth;
    private internalStrokeColor;
    private externalLineWidth;
    private externalStrokeColor;
    private autoReturnToCenter;
    private callback;
    private objContainer;
    private context;
    private canvas;
    private circumference;
    private internalRadius;
    private externalRadius;
    private maxMoveStick;
    private centerX;
    private centerY;
    private directionVerticalLimitPos;
    private directionVerticalLimitNeg;
    private directionHorizontalLimitPos;
    private directionHorizontalLimitNeg;
    private pressed;
    private movedX;
    private movedY;
    private stickStatus;
    constructor(containerId: string, parameters?: JoyStickParameters, callback?: JoyStickCallback);
    /**
     * @desc Draw the external circle used as reference position
     */
    private drawExternal;
    /**
     * @desc Draw the internal stick in the current position the user have moved it
     */
    private drawInternal;
    /**
     * @desc Events for manage touch
     */
    private onTouchStart;
    private onTouchMove;
    private onTouchEnd;
    /**
     * @desc Events for manage mouse
     */
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
    getCardinalDirection(): CardinalDirection;
    /**
     * @desc The width of canvas
     * @return Number of pixel width
     */
    getWidth(): number;
    /**
     * @desc The height of canvas
     * @return Number of pixel height
     */
    getHeigh(): number;
    /**
     * @desc The X position of the cursor relative to the canvas that contains it and to its dimensions
     * @return Number that indicate relative position
     */
    getPosX(): number;
    /**
     * @desc The Y position of the cursor relative to the canvas that contains it and to its dimensions
     * @return Number that indicate relative position
     */
    getPosY(): number;
    /**
     * @desc Normalizzed value of X move of stick
     * @return Integer from -100 to +100
     */
    getX(): number;
    /**
     * @desc Normalizzed value of Y move of stick
     * @return Integer from -100 to +100
     */
    getY(): number;
    /**
     * @desc Get the direction of the cursor as a string that indicates the cardinal points where this is oriented
     * @return String of cardinal point N, NE, E, SE, S, SW, W, NW and C when it is placed in the center
     */
    getDir(): CardinalDirection;
}
export default JoyStick;
