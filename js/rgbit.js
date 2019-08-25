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
document.getElementById("maxMoves").value = 15;
document.getElementById("staringColors").value = 0;

//  Create and initialize important variables.
const itemID = ["item-b", "item-g", "item-c", "item-r", "item-m", "item-y", "item-w"];
var itemColor = [0, 0, 0, 0, 0, 0, 0];
var startingMoves = 15;
var startMode = 0;
var startFour = false;
var startRGB = true;
var moveCount = 15;
var scoreCount = 0;
var lastID = -1;

//  Hide the game and run the setup.
document.getElementById("core").style.display = "none";
document.getElementById("gameStart").onclick = function() 
{   
    startingMoves = document.getElementById("maxMoves").value;
    startMode = document.getElementById("gameMode").value;
    
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
    setupGameBoard();
}

//  Grab when a button gets pressed and react.
document.getElementById(itemID[0]).onclick = function() {doItemCheck(1);}
document.getElementById(itemID[1]).onclick = function() {doItemCheck(2);}
document.getElementById(itemID[2]).onclick = function() {doItemCheck(3);}
document.getElementById(itemID[3]).onclick = function() {doItemCheck(4);}
document.getElementById(itemID[4]).onclick = function() {doItemCheck(5);}
document.getElementById(itemID[5]).onclick = function() {doItemCheck(6);}
document.getElementById(itemID[6]).onclick = function() {doItemCheck(7);}

//  Enable options button.
document.getElementById("buttonOptions").onclick = function() 
{
    document.getElementById("core").style.display = "none";
    document.getElementById("setup").style.display = "block";
}

//  Enable the reset button
document.getElementById("resetBoard").onclick = function() {setupGameBoard();}

//  Set up game board.
function setupGameBoard()
{   
    moveCount = startingMoves;
    scoreCount = 0;
    itemColor = [0, 0, 0, 0, 0, 0, 0];
    lastID = -1;
    
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
    
    document.getElementById("moves").innerHTML = "Moves: " + moveCount;
    document.getElementById("score").innerHTML = "Score: " + scoreCount;
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
        moveCount--;
        
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
    
    document.getElementById("moves").innerHTML = "Moves: " + moveCount;
    document.getElementById("score").innerHTML = "Score: " + scoreCount;
    
    if(moveCount == 0)
    {
        alert("Score: " + scoreCount);
    }
}
