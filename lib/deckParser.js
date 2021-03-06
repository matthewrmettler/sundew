/*
 * deckParser.js
 * Library for parsing the user input into making a deck image.
 */

/******************
 * Variables      *
 ******************/

//cardDisplay class is defined in style.css. Use this to scale the size of the images displayed.
var imgPrefix = '<img class="cardDisplay" src="/img/cards/';
var imgPostfix = '.png" />';
	
/******************
 *  Functions     *
 ******************/

//This function generates the array of card numbers needed to display the images
//Takes in the 'req.body.dl_txt' object as input, and returns an array of numbers (corresponding to the card number) as output
// e.g. ['00005', '01001', '01002', ..]
getCardList = function(text) {

	//Replace newline characters with breaks
	var fullList = text.replace(/\n/g, "<br />");

	//Splits on the '*' character, which delimits the beginning of every card in the deck in the netrunnerdb markdown formatting
	var splitList = fullList.split('*');

	//Initialize the final deck list
	var finalList = [];

	// '/\d{5}/' regex matches a 5-digit number
	// The .match call finds the very first one
	// Therefore, this adds the identity card to the front of the final deck
	// TODO: Identity cards aren't being displayed because we don't have the image.
	finalList.push(splitList[0].match(/\d{5}/));

	//Loop over the rest of the split
	for (var i = 1; i < splitList.length; i++) {

		//Gets the number of times this card appears, and add that card to the deck that many times
		var cardCount = splitList[i].substring(1,2);
		for (var j = 0; j < cardCount; j++) {
			finalList.push(splitList[i].match(/\d{5}/));
		}
	}

	return finalList;
}