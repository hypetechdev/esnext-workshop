// Moving Away from For Loops
// The code below is calling 'savePost' three times, but it is doing so using a for loop.  This implementation works, but the for loop makes it more challenging to understand the purpose of the function.  Rather than using a for loop, refactor the code below to instead use the forEach helper.

function handlePosts() {
    var posts = [
        { id: 23, title: 'Daily JS News' },
        { id: 52, title: 'Code Refactor City' },
        { id: 105, title: 'The Brightest Ruby' }
    ];

    for (var i = 0; i < posts.length; i++) {
        savePost(posts[i]);
    }
}

// Processing Values
// The array below contains an array of objects, each of which is a representation of an image.  Using the forEach helper, calculate the area of each image and store it in a new array called 'areas'.  The area of an image can be calculated as 'height * image'.

var images = [
    { height: 10, width: 30 },
    { height: 20, width: 90 },
    { height: 54, width: 32 }
];
var areas = [];


// Plucking Values
// Using map, create a new array that contains the 'height' property of each object.  Assign this new array to the variable 'heights'. 
var images = [
    { height: '34px', width: '39px' },
    { height: '54px', width: '19px' },
    { height: '83px', width: '75px' },
];

var heights;

// Calculating Values with Map
// Using map, create a new array that contains the distance / time value from each trip.In other words, the new array should contain the(distance / time) value.Assign the result to the variable 'speeds'.

var trips = [
    { distance: 34, time: 10 },
    { distance: 90, time: 50 },
    { distance: 59, time: 25 }
];

// This is a hard one!
// Implement a 'pluck' function.  Pluck should accept an array and a string representing a property name and return an  array containing that property from each object. 

// Example: 

// var paints = [ { color: 'red' }, { color: 'blue' }, { color: 'yellow' }];
// pluck(paints, 'color'); // returns ['red', 'yellow', 'blue'];

// Hint:

// Remember that you can access a property on an object by using square bracket notation. For example...

// var person = { name: 'Bill' };
// person['name'] // returns 'Bill'
