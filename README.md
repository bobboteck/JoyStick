# JoyStick

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a8b6ea1475c54ae9896e849e356dfe1d)](https://www.codacy.com/app/bobboteck/JoyStick?utm_source=github.com&utm_medium=referral&utm_content=bobboteck/JoyStick&utm_campaign=badger) ![VanillaJS](https://img.shields.io/badge/Vanilla-JS-yellow "VanillaJS") ![GitHub release (latest by date)](https://img.shields.io/github/v/release/bobboteck/joystick) ![GitHub file size in bytes](https://img.shields.io/github/size/bobboteck/joystick/joy.min.js)
[![GitHub stars](https://img.shields.io/github/stars/bobboteck/JoyStick)](https://github.com/bobboteck/JoyStick/stargazers) [![GitHub forks](https://img.shields.io/github/forks/bobboteck/JoyStick)](https://github.com/bobboteck/JoyStick/network) ![GitHub All Releases](https://img.shields.io/github/downloads/bobboteck/joystick/total) ![npm](https://img.shields.io/npm/v/html5-joystick) ![npm](https://img.shields.io/npm/dw/html5-joystick)

## About

**Author: [Roberto D'Amico](http://bobboteck.github.io)**

A simple **JoyStick** for web application that use HTML5, Canvas and JavaScript.
You can simply add a JoyStick in your HTML5 page, base configuration is ready for use it.
The joystick can be used either on touch devices, or on devices that use mouse, touchpads or similar pointing systems.
Developed for Web Remote Control of Robot, the JoyStick can be used for all other scope.

> Note that code not use JQuery but only pure Vanilla JavaScript.

**Actual release version is 1.1.6**. The complete history of project is avaliable in the [Releases page](https://github.com/bobboteck/JoyStick/releases).

Using appropriate methods that the object provides, you can know the position of the Stick is located.
The methods available are:

* **GetPosX()** and **GetPosY()**: which return the position of the cursor relative to the Canvas that contains it and to its dimensions
* **GetDir()**: which returns the direction of the cursor as a string that indicates the cardinal points where this is oriented (N, NE, E, SE, S, SW, W, NW and C when it is placed in the center)
* **GetX()** and **GetY()**: which return a value between -100 to +100 ***independently*** of size of the Canvas.

## How to use it

You can simply look the ***[joy.html](http://bobboteck.github.io/joy/joy.html)*** file for un example of use the library.

First add the JS library in your page, follow the example code to use, if necessary you need to change te path of joy.js file.

```html
<script src="joy.js"></script>
```

Next define the HTML object that will contain the control, in the following example it shows a ***div***, whose dimensions are defined by in line CSS.

```html
<div id="joyDiv" style="width:200px;height:200px;margin-bottom:20px;"></div>
```

At the end of page add the initialization of JoyStick object, the only configuration that must be done is to suggest as a parameter for the name of the object that will contain the JoyStick control, in this case the name of ***div*** defined in the previous step.

```html
<script type="text/javascript">
// Create JoyStick object into the DIV 'joyDiv'
var joy = new JoyStick('joyDiv');
</script>
```

Along with the parameter options specified below in Advanced Options, a callback function can be passed when creating the JoyStick object. This callback function will be called whenever the Joystick is moved. The parameters x (with the value of `joy.GetX()`) and y (with the value of `joy.GetY()`) will be passed to the function.

```javascript
<script type="text/javascript">
// Create JoyStick object into the DIV 'joyDiv'
var joy = new JoyStick('joyDiv', {}, function() {
    x.value=joy.GetX();
});
</script>
```

You can see an example of result in this picture

![JoyStick in action!!!](https://repository-images.githubusercontent.com/38121741/2ca19400-80a4-11ea-9034-0dee3dbec67f "JoyStick in action!!!")

But if you want see the JoyStick in action go to this [link](http://bobboteck.github.io/joy/joy.html).

## Advanced Options

All configuration parameters are optional, must be passed in JSON format, therefore it is sufficient to indicate only the parameters for which you want to provide a configuration other than the Default value.

* **title {String} (optional)** - The ID of canvas (Default value is 'joystick')
* **width {Int} (optional)** - The width of canvas, if not specified is setted at width of container object (Default value is the width of container object)
* **height {Int} (optional)** - The height of canvas, if not specified is setted at height of container object (Default value is the height of container object)
* **internalFillColor {String} (optional)** - Internal color of Stick (Default value is '#00AA00')
* **internalLineWidth {Int} (optional)** - Border width of Stick (Default value is 2)
* **internalStrokeColor {String}(optional)** - Border color of Stick (Default value is '#003300')
* **externalLineWidth {Int} (optional)** - External reference circonference width (Default value is 2)
* **externalStrokeColor {String} (optional)** - External reference circonference color (Default value is '#008000')
* **autoReturnToCenter {Bool} (optional)** - Sets the behavior of the stick, whether or not, it should return to zero position when released (Default value is True and return to zero)

## Tips & Tricks

The ***title*** parameter, that have as default value 'joystick', is used to set the ID of Canvas elemente that contains the JoyStick, you can use this to define custom CSS style for the canvas. For example in the ***[joy.html](http://bobboteck.github.io/joy/joy.html)*** file the CSS style is used to set the border of Canvas with this row of code:

```css
#joystick {
 border: 1px solid #9C9898;
}
```

## Share your experience

If you have integrated **JoyStick** into your project, and you want to share your user experience, I will be happy to add it on a **[Use cases](https://github.com/bobboteck/JoyStick/wiki/UseCases)** Wiki page of this project.
If you want, send me an email with some information about the project.

## Contribute

To report BUG or request new Features, you can use GitHub's [ISSUE](https://github.com/bobboteck/JoyStick/issues) system related to this project.
