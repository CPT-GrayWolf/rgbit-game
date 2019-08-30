/*
 *  RGBit Mix JavaScript content.
 *
 *  Copyright (C) 2019 T. Ian "Luna" Ericson.
 *  <writerthewolf@gmail.com>
 *  
 *  This program is free software, licensed under
 *  the terms of the GNU Public License version 2+
 *  as published by the Free Software Foundation.
 *  All rights not specifically granted herein are
 *  hereby granted freely to the user by the 
 *  creator of this software.
 *  
 *  This software is distributed in the hope that
 *  it will be useful or entertaining, but WITHOUT
 *  ANY WARRANTY, implied or otherwise, as 
 *  described under the GPL2+.
 *
 *  You should have received a copy of the GNU
 *  Public License along with this software. If not,
 *  the license is available at:
 *  <http://www.gnu.org/licenses/>.
 */

//  Set setup page defaults.
document.getElementById("maxCounter").value = 15;
document.getElementById("staringColors").value = 0;
document.getElementById("gameMode").value = 0;

//  Create and initialize important variables.
const itemID = ["item-b", "item-g", "item-c", "item-r", "item-m", "item-y", "item-w"];
var itemColor = [0, 0, 0, 0, 0, 0, 0];
var counterText = "Moves:"
var startingText = "Moves:"
var startingCount = 15;
var startMode = 0;
var startFour = false;
var startRGB = true;
var currentMode = 0;
var gamePaused = true;
var inGame = false;
var gameCount = 0;
var scoreCount = 0;
var scored = false;
var lastID = -1;

//  Hide the game and run the setup.
document.getElementById("core").style.display = "none";
document.getElementById("setup").style.display = "block";
//  Set the Game Mode.
document.getElementById("gameMode").onchange = function()
{
    startMode = document.getElementById("gameMode").value;
    
    if(startMode == 0)
    {
        startingText = "Moves:"
        document.getElementById("maxCounter").min = 10;
        document.getElementById("maxCounter").max = 25;
        document.getElementById("maxCounter").value = 15;
    } else if(startMode == 1)
    {
        startingText = "Time:"
        document.getElementById("maxCounter").min = 15;
        document.getElementById("maxCounter").max = 60;
        document.getElementById("maxCounter").value = 20;
    }
    
    document.getElementById("counterSetup").innerHTML = startingText;
}
//  Set options for the next game.
document.getElementById("gameStart").onclick = function() 
{   
    startingCount = document.getElementById("maxCounter").value;
    
    if(document.getElementById("staringColors").value == 1)
    {
        startRGB = true;
        startFour = true;
    } else if(document.getElementById("staringColors").value == 2)
    {
        startRGB = false;
        startFour = true;
    } else
    {
        startRGB = true;
        startFour = false;
    }
    
    document.getElementById("setup").style.display = "none";
    document.getElementById("core").style.display = "block";
    
    if(inGame == false)
    {
        setupGameBoard();
    }
    
    gamePaused = false;
}

//  Grab when a button gets pressed and react.
document.getElementById(itemID[0]).onclick = function() {doItemCheck(1);}
document.getElementById(itemID[1]).onclick = function() {doItemCheck(2);}
document.getElementById(itemID[2]).onclick = function() {doItemCheck(3);}
document.getElementById(itemID[3]).onclick = function() {doItemCheck(4);}
document.getElementById(itemID[4]).onclick = function() {doItemCheck(5);}
document.getElementById(itemID[5]).onclick = function() {doItemCheck(6);}
document.getElementById(itemID[6]).onclick = function() {doItemCheck(7);}

//  Run the timed mode check once a second.
setInterval(timedMode, 1000);

//  Enable options button.
document.getElementById("buttonOptions").onclick = function() 
{
    gamePaused = true;
    document.getElementById("core").style.display = "none";
    document.getElementById("setup").style.display = "block";
}

//  Enable the reset button
document.getElementById("resetBoard").onclick = function() {setupGameBoard();}

//  Set up game board.
function setupGameBoard()
{   
    counterText = startingText;
    currentMode = startMode;
    gameCount = startingCount;
    scoreCount = 0;
    itemColor = [0, 0, 0, 0, 0, 0, 0];
    lastID = -1;
    scored = false;
    
    if(startRGB == true && startFour == false)
    {
        document.getElementById(itemID[0]).style.display = "initial";
        document.getElementById(itemID[1]).style.display = "initial";
        document.getElementById(itemID[3]).style.display = "initial";
        document.getElementById(itemID[2]).style.display = "none";
        document.getElementById(itemID[4]).style.display = "none";
        document.getElementById(itemID[5]).style.display = "none";
        document.getElementById(itemID[6]).style.display = "none";
    } else if(startRGB == true && startFour == true)
    {
        document.getElementById(itemID[0]).style.display = "initial";
        document.getElementById(itemID[1]).style.display = "initial";
        document.getElementById(itemID[3]).style.display = "initial";
        document.getElementById(itemID[6]).style.display = "initial";
        document.getElementById(itemID[2]).style.display = "none";
        document.getElementById(itemID[4]).style.display = "none";
        document.getElementById(itemID[5]).style.display = "none";
    } else
    {
        document.getElementById(itemID[2]).style.display = "initial";
        document.getElementById(itemID[4]).style.display = "initial";
        document.getElementById(itemID[5]).style.display = "initial";
        document.getElementById(itemID[6]).style.display = "initial";
        document.getElementById(itemID[0]).style.display = "none";
        document.getElementById(itemID[1]).style.display = "none";
        document.getElementById(itemID[3]).style.display = "none";
    }
    
    document.getElementById("counter").innerHTML = counterText + " " + gameCount;
    document.getElementById("score").innerHTML = "Score: " + scoreCount;
    inGame = true;
}

//  Runs every second in timed mode.
function timedMode()
{
    if(currentMode == 0 || gamePaused == true) {return};
    
    if(gameCount > 1)
    {
        gameCount--;
        document.getElementById("counter").innerHTML = counterText + " " + gameCount;
    } else if(scored == false)
    {
        gameCount--;
        getScore();
    } else
    {
        return;
    }
}

/*
 *  Remove pressed button based on its ID and add 
 *  the next button to the board before decrementing
 *  the remaining moves and setting the score.
 */ 
function doItemCheck(ID)
{
    if(moveCount > 0)
    {
        document.getElementById(itemID[ID-1]).style.display = "none";
        
        itemColor[ID-1]++;
        if(currentMode == 0)
        {
            gameCount--;
        }
        
        if(lastID >= 0)
        {
            document.getElementById(itemID[ (lastID^ID)-1 ]).style.display = "initial";
        }
        
        lastID = ID;
    }
    
    getScore();
}

//  Calculate the score and update the values on screen.
function getScore()
{
    scoreCount = 0;
    
    for(var i = 0; i < itemColor.length; i++)
    {
    scoreCount += (itemColor[i] * Math.pow(2, (i + 1)));
    }
    
    document.getElementById("counter").innerHTML = counterText + " " + gameCount;
    document.getElementById("score").innerHTML = "Score: " + scoreCount;
    
    if(gameCount == 0 && scored == false)
    {
        scored = true;
        alert("Score: " + scoreCount);
    }
}
