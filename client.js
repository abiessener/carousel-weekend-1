/* data is an array of objects with the following:

    var peopleArray [] ->

    {
        name: 'this is a string'
        shoutout: 'this is also a string'
    }
*/

// global index variable, because passing it around is a pain
var index = -1;

// global lastClicked variable, because passing it around is actively contrary to its usage
var lastClicked = new Date();
lastClicked = lastClicked.getTime();
// console.log('lastClicked:',lastClicked);


// debug logs to make sure we know what data we're working with
// for (var i = 0; i < peopleArray.length; i++) {
//     console.log('index', i, 'person', peopleArray[i].name);
// }
// console.log('peopleArray.length', peopleArray.length);


// displays the next person in the carousel, then returns the index of the next person
function displayNextPerson() {
    // console.log('displayNextPerson called with index', index);




    // if we're at the end of the array, loop back around to the front
    if (index == peopleArray.length - 1) {
        index = 0;
    } else {
        index++;
    }

    var person = peopleArray[index];

    // empty the .container div, then add the appropriate data
    $('.container').children().remove();
    $('.container').append("<p class=\"shoutout\">\"" + person.shoutout + "\"</p>");
    $('.container').append("<p class=\"name\"> -- " + person.name + "</p>");

    // empty the #trackingDiv, then add the appropriate data
    $('#trackingDiv').children().remove();
    $('#trackingDiv').append("<p class=\"trackingP\">" + (index + 1) + "/" + peopleArray.length + "</p>");

    // call the timeout function, so that the carousel will update if another button isn't clicked within 10 seconds

    setTimeout(carouselTimeOut, 10000);
}

// displays the previous person in the carousel, then returns the index of the next person
function displayPrevPerson() {
    // console.log('displayPrevPerson called with index', index);

    // if we're at the beginning of the array, loop back around to the end
    if (index === 0) {
        index = peopleArray.length - 1;
    } else {
        index--;
    }

    var person = peopleArray[index];

    $('.container').children().remove(); // empty the #container div
    $('.container').append("<p class=\"shoutout\">\"" + person.shoutout + "\"</p>");
    $('.container').append("<p class=\"name\"> -- " + person.name + "</p>");

    // empty the #trackingDiv, then add the appropriate data
    $('#trackingDiv').children().remove();
    $('#trackingDiv').append("<p class=\"trackingP\">" + (index + 1) + "/" + peopleArray.length + "</p>");

    // call the timeout function, so that the carousel will update if another button isn't clicked within 10 seconds

    setTimeout(carouselTimeOut, 10000);
}

// updates the display if the current time is more than ten seconds since a button was last clicked. Returns nothing. ONLY CALLED by itself and the next/prev button handlers
function carouselTimeOut() {
    // console.log('carouselTimeOut called');
    // console.log('lastClicked:', lastClicked);
    
    
    var currentDate = new Date();
    var currentTime = currentDate.getTime();

    // console.log('currentTime', currentTime);
    
    if (currentTime > lastClicked + 9900) {
        displayNextPerson();
    }
}

// set lastClicked and update the display
function nextClick(){
    var currentTime = new Date();
    lastClicked = currentTime.getTime();
    displayNextPerson();
}

function prevClick(){
    var currentTime = new Date();
    lastClicked = currentTime.getTime();
    displayPrevPerson();
}

// execute code here
$(document).ready(function () {

    displayNextPerson();

    $('#nextButton').on('click', nextClick);
    $('#prevButton').on('click', prevClick);

});