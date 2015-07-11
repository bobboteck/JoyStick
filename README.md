# JoyStick

[![Join the chat at https://gitter.im/bobboteck/JoyStick](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bobboteck/JoyStick?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
============================
About
--------
**Autor: [Roberto D'Amico](http://bobboteck.github.io)**
A simple JoyStick for web application that use HTML5, Canvas and JavaScript. JQuery is not required.
You can simply add a JoyStick in your HTML5 page, base configuration is ready for use it.
Developed for Web Remote Control of Robot, the JoyStick can be used for all other scope.

**Actual release version is 1.1.0**

Using appropriate methods that the object provides, you can know the position of the Stick is located.
The methods available are:
* **GetPosX()** and **GetPosY()**: which return the position of the cursor relative to the Canvas that contains it and to its dimensions
* **GetDir()**: which returns the direction of the cursor as a string that indicates the cardinal points where this is oriented (N, NE, E, SE, S, SW, W, NW and C when it is placed in the center)
* **GetX()** and **GetY()**: which return a value between -100 to +100 ***independently*** of size of the Canvas.

How to use it
----------------
Simply look the joy.html file for un example.
'''
<script src="joy.js"></script>
'''
