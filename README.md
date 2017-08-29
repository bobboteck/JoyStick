# JoyStick

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a8b6ea1475c54ae9896e849e356dfe1d)](https://www.codacy.com/app/bobboteck/JoyStick?utm_source=github.com&utm_medium=referral&utm_content=bobboteck/JoyStick&utm_campaign=badger)
[![Join the chat at https://gitter.im/bobboteck/JoyStick](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bobboteck/JoyStick?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
===============================================================================================================================================================================================================================

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
You can simply look the ***joy.html*** file for un example of use the library.

First add the JS library in your page, follow the example code to use, if necessary you need to change te path of joy.js file.
```
<script src="joy.js"></script>
```

Next define the HTML object that will contain the control, in the following example it shows a ***div***, whose dimensions are defined by in line CSS.
```
<div id="joyDiv" style="width:200px;height:200px;margin-bottom:20px;"></div>
```

At the end of page add the initialization of JoyStick object, the only configuration that must be done is to suggest as a parameter for the name of the object that will contain the JoyStick control, in this case the name of ***div*** defined in the previous step.
```
<script type="text/javascript">
// Create JoyStick object into the DIV 'joyDiv'
var joy = new JoyStick('joyDiv');
</script>
```

Now you can call one of method, explained before, that return status of Stick, for example in the ***joy.html*** file every 50 millisecond was called the method **GetX()** and showed the value in a textbox:
```
setInterval(function(){ x.value=joy.GetX(); }, 50);
```

You can see an example of result in this picture

![JoyStick in action!!!](http://bobboteck.github.io/joy/JoyStick.png "JoyStick in action!!!")

But if you want see the JoyStick in action go to this [link](http://bobboteck.github.io/joy/joy.html).

Advanced Options
----------------
All configuration parameters are optional, must be passed in JSON format, then it is sufficient to indicate only the parameters whose volede give a different configuration from the value of Default.

*	**title {String} (optional)** - The ID of canvas (Default value is 'joystick')
* 	**width {Int} (optional)** - The width of canvas, if not specified is setted at width of container object (Default value is the width of container object)
* 	**height {Int} (optional)** - The height of canvas, if not specified is setted at height of container object (Default value is the height of container object)
* 	**internalFillColor {String} (optional)** - Internal color of Stick (Default value is '#00AA00')
* 	**internalLineWidth {Int} (optional)** - Border width of Stick (Default value is 2)
* 	**internalStrokeColor {String}(optional)** - Border color of Stick (Default value is '#003300')
* 	**externalLineWidth {Int} (optional)** - External reference circonference width (Default value is 2)
* 	**externalStrokeColor {String} (optional)** - External reference circonference color (Default value is '#008000')

Tips & Tricks
--------------
The ***title*** parameter, that have as default value 'joystick', is used to set the ID of Canvas elemente that contains the JoyStick, you can use this to define custom CSS style for the canvas. For example in the ***joy.html*** file the CSS style is used to set the border of Canvas with this row of code:
```
#joystick {
	border: 1px solid #9C9898;
}
```
