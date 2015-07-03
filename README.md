# JoyStick

[![Join the chat at https://gitter.im/bobboteck/JoyStick](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bobboteck/JoyStick?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


A simple JoyStick that use HTML5, Canvas and JavaScript

You can add a JoyStick in an HTML page, that support mouse click or touchable device, simply initializing a new object JoyStick after the page loads.

Using appropriate methods that the object provides, you can know what position the cursor is located.
Currently these methods are:
- GetPosX () and GetPosY (), which return the position of the cursor relative to the canvas that contains it and to its dimensions
- GETDIR (), which returns the direction of the cursor as a string that indicates the cardinal points where this is oriented (N, NE, E, SE, S, SW, W, NW and C when it is placed in the center)
- GetX and GetY, in development ...

##How to use it

Simply look the joy.html file for un example.