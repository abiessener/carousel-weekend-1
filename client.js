/* data is an array of objects with the following:

    var peopleArray [] ->

    {
        name: 'this is a string'
        shoutout: 'this is also a string'
    }
*/

// global index variable, because passing it around is a pain
var index = 0;

// global lastClicked variable, because passing it around is actively contrary to its usage
var lastClicked = new Date();
lastClicked = lastClicked.getTime();

// debug logs to make sure we know what data we're working with
// for (var i = 0; i < peopleArray.length; i++) {
//     console.log('index', i, 'person', peopleArray[i].name);
// }
// console.log('peopleArray.length', peopleArray.length);


// These are our actual button handlers. Had to be split out from displayNextPerson so we can set our lastClicked global. Sets that and then updates the display
function nextClick() {
    var currentTime = new Date();
    lastClicked = currentTime.getTime();
    displayNextPerson(true);
}

function prevClick() {
    var currentTime = new Date();
    lastClicked = currentTime.getTime();
    displayNextPerson(false);
}


// takes a bool parameter, and displays the next person in the carousel if true or previous if false
function displayNextPerson(next) {
    // console.log('displayNextPerson called with index', index);

    if (next) { // update index to next person in the array
        // if we're at the end of the array, loop back around to the front
        if (index == peopleArray.length - 1) {
            index = 0;
        } else {
            index++;
        }
    } else { // update index to previous person in the array
        // if we're at the beginning of the array, loop back around to the end
        if (index === 0) {
            index = peopleArray.length - 1;
        } else {
            index--;
        }
    }

    var person = peopleArray[index];

    // fade out the content, then call the displayUpdate function to update the content and fade it in 
    $('.container').add('#speechArrow').fadeOut({
        queue: false,
        complete: displayUpdate
    });

    // empty the #trackingDiv, then add the appropriate data
    $('#trackingDiv').html("<p class=\"trackingP\">" + (index + 1) + "/" + peopleArray.length + "</p>");

    // call the timeout function, so that the carousel will update if another button isn't clicked within 10 seconds
    setTimeout(carouselTimeOut, 10000);
}


// Actual update of content. Doesn't fade out old content because that's done in the displayNextPerson function which then calls this in a callback from that fadeOut method
function displayUpdate() {
    var person = peopleArray[index];

    var newXposition = Math.random() * (document.documentElement.clientWidth - 360);
    var newYposition = Math.random() * (document.documentElement.clientHeight - 300);

    $content = $('.container').add('#speechArrow');
    $($content).hide();
    $('.container').html("<p class=\"shoutout\">\"" + person.shoutout + "\"</p><p class=\"name\"> -- " + person.name + "</p>");
    $('.container').css('left', newXposition);
    $('.container').css('top', newYposition);
    $('#speechArrow').css('left', newXposition + 40);
    $('#speechArrow').css('top', newYposition - 0);

    $($content).fadeIn({
        queue: false
    });
}


// updates the display if the current time is more than ten seconds since a button was last clicked. Returns nothing. ONLY CALLED by itself and the next/prev button handlers
function carouselTimeOut() {
    // console.log('carouselTimeOut called');
    // console.log('lastClicked:', lastClicked);

    var currentDate = new Date();
    var currentTime = currentDate.getTime();

    // console.log('currentTime', currentTime);

    if (currentTime > lastClicked + 9900) {
        displayNextPerson(true);
    }
}


// execute code here
$(document).ready(function () {
    // Display the first dataset
    $('.container').html("<p class=\"shoutout\">\"" + peopleArray[0].shoutout + "\"</p><p class=\"name\"> -- " + peopleArray[0].name + "</p>");
    $('.container').add('#speechArrow').fadeIn();

    // Set up the trackingDiv
    $('#trackingDiv').html("<p class=\"trackingP\">" + (index + 1) + "/" + peopleArray.length + "</p>");

    // Start the timer for automatic cycling - later this will be called by itself or by displayNext Person()
    setTimeout(function(){        
        carouselTimeOut();
    }, 10000);

    // Click handlers that call simple functions that set the lastClick global and then call the displayUpdate function to either next or previous dataset
    $('#nextButton').on('click', nextClick);
    $('#prevButton').on('click', prevClick);

    // Keypress handlers for left/right arrows with equivalent functionality to the next/prev buttons
    $('html').keydown(event, function () {
        // console.log('key');
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '39') {
            nextClick();
        } else if (keycode == '37') {
            prevClick();
        }
    });
});