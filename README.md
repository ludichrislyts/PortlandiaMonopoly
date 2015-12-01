# Portlandia Monopoly

##### _Monopoly game based on Portland tech businesses and local themes. There is no rhyme or reason to the appearance or order of companies on the board, in case one is wondering. To experience the game as it is now, please navigate to [my hosted github page.](http://ludichrislyts.github.io/PortlandiaMonopolyGH)_

#### Chris Lytsell, Jason Creighton, Kenny Grage, Aaron Campf.

## Description

_It's Monopoly. Currently a work in progress...the game does not have full monopoly play functionality quite yet. The program was initially a week long AngularJS class group project at Epicodus for Chris, Jason, and Kenny.
After the project was over, Chris worked with Aaron to move much of the project's JavaScript files to TypeScript.

Features implemented since the project was first presented in Oct 2015:_

* Remove all Javascript alerts from gameplay and use Angular to show and hide current turn info
* Add a board movement feature to swivel board view to current player, along with a button to click for player to swivel board if needed
* Improve player stat header to more clearly show current player by increasing dropdown movement of current player tab
* Add a color coordinated position indicator on the board for current player
* Add function to exchange money between players
* Add notification that shows the money transaction for current player (former, +/-change, current)
* Fix many random buggy issues

_Functionality yet to be completed as of Dec 1st, 2015:_

* Make an auction function for when a player lands on a property but doesn't/can't buy it
* Mortgage a property
* Develop properties
* Implement a cool visual dice roll
* If above gets done, activate function for players to roll to see who goes first
* Implement square by square player movement, rather than instant transport
* Probably more stuff/work out bugs
* Oh, and probably should be able to detect if a player wins or loses at some point

## Setup
```
If you want to open the project in Visual Studio, create a new project in VS. Select 'ASP.NET Empty Web Application'
Using a file explorer, navigate to the top level project PortlandiaMonopoly folder, then drag the PortlandiaMonopoly file inside into VS and drop on the project name in the Solution Explorer
Run the program from the index.html file. In Chrome, the player colors appear in the header, in IE they don't.
```

```
If you want to just play the game, in a console, navigate to the PortlandiaMonopoly folder within the main PortlandiaMonopoly project folder and 
run a python server. Either _python -m http.server [port]_ or _python -m SimpleHTTPServer [port]_ should work, depending on your version of Python.

```

## Technologies Used

_AngularJS, JavaScript, Jquery, CSS, TypeScript, Visual Studio_

### Legal



Copyright (c) 2015 Chris Lytsell, Jason Creighton, Kenny Grage, Aaron Campf.  

This software is licensed under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
