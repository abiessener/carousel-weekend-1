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


// takes a bool parameter, and displays the next person in the carousel if true or previous if false
function displayNextPerson(next) {
    // console.log('displayNextPerson called with index', index);

    if (next) {
        // if we're at the end of the array, loop back around to the front
        if (index == peopleArray.length - 1) {
            index = 0;
        } else {
            index++;
        }
    } else {
        // if we're at the beginning of the array, loop back around to the end
        if (index === 0) {
            index = peopleArray.length - 1;
        } else {
            index--;
        }
    }

    var person = peopleArray[index];

    // empty the .container div, then add the appropriate data
    $('.container').children().add('#speechArrow').fadeOut({
        queue: false,
        complete: displayUpdate
    });
    // $('#speechArrow').fadeOut(300);

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
        displayNextPerson(true);
    }
}

// set lastClicked and update the display
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

function displayUpdate() {
    var person = peopleArray[index];

    var newXposition = Math.random() * (document.documentElement.clientWidth - 360);
    var newYposition = Math.random() * (document.documentElement.clientHeight - 300);

    $content = $('.container').add('#speechArrow');
    $($content).hide();
    $('.container').children().remove();
    $('.container').append("<p class=\"shoutout\">\"" + person.shoutout + "\"</p>");
    $('.container').append("<p class=\"name\"> -- " + person.name + "</p>");
    $('.container').css('left', newXposition);
    $('.container').css('top', newYposition);
    $('#speechArrow').css('left', newXposition + 40);
    $('#speechArrow').css('top', newYposition - 5);

    $($content).fadeIn({
        queue: false
    });
    //$('#speechArrow').fadeIn(300);    
}
// execute code here
$(document).ready(function () {



    displayNextPerson(true);

    $('#nextButton').on('click', nextClick);
    $('#prevButton').on('click', prevClick);

});




/* TODO

put speech arrow in jquery selector with container div to sync fades
figure out what the fuck to do about the 'blank' spot between fades
 - possibly randomize the div position, that would mask it anyway

 */