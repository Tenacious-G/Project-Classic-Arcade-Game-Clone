Classic Arcade Game Clone
===============================

##  - based on the "Frogger" game

## Project 4 for the Google Udacity FrontEnd Nanodegree course.

##### How to run:

This game requires the following files:-

<u>engine.js</u>

​	This file provides the game loop functionality -  it draws the initial game board on the screen, and then calls the update and render methods on the player and enemy objects (defined in app.js).

<u>resources.js</u>

​	An image loading utility. It eases the process of loading image files so that they can be used within the game. It also includes a simple "caching" layer so it will reuse cached images if you attempt to load the same image multiple times.

All required images are stored in the images folder.

##### How to play:

Use the arrow keys to move the player into the safety of the water. The player can move up, down, left or right and must try to avoid the beetles scuttling across the paved area of the screen. If the player collides with any of the beetles, the player is returned to the starting position. Every time the player reaches the water, another beetle is added to the game and the player is returned to the starting position. The game is won once the player reaches the water five times.


