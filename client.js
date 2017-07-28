/* data is an array of objects with the following:

    var peopleArray [] ->

    {
        name: 'this is a string'
        shoutout: 'this is also a string'
    }
*/

// global index variable, because passing it around is a pain
var index = 0;


// displays the next person in the carousel, then returns the index of the next person
function displayNextPerson() {
    console.log('displayNextPerson called');
    
    // if we're at the end of the array, loop back around to the front
    if(index == peopleArray.length) {
        index = 0;
    } else {
        index++;
    }

    $('.container').children().remove(); // empty the #container div
    $('.container').append("<p>Example Content Index: " + index + "</p>");


    // this is for pro mode
    // setTimeout(function () {
    //     displayNextPerson(index + 1);
    // }, 10000)


}

// displays the previous person in the carousel, then returns the index of the next person
function displayPrevPerson() {
    console.log('displayPrevPerson called');
    
    // if we're at the beginning of the array, loop back around to the end
    if(index === 0) {
        index = peopleArray.length;
    } else {
        index--;
    }

    $('.container').children().remove(); // empty the #container div
    $('.container').append("<p>Example Content Index: " + index + "</p>");

    // this is for pro mode
    // setTimeout(function () {
    //     displayNextPerson(index + 1);
    // }, 10000)


}
// execute code here
$(document).ready(function () {

    displayNextPerson(index);
    
    $('#nextButton').on('click', displayNextPerson);
    $('#prevButton').on('click', displayPrevPerson);
    
});