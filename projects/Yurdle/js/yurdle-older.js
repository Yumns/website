const randomWords = require('random-words');

global.getWords = function () {
    console.log(randomWords({exactly: 1, maxLength: 5, min: 5}));
};