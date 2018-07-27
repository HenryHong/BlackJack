var CardValue = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
var CardSuit = ["Spades", "Hearts", "Clubs", "Diamonds"]; 
var CardArray = [];
var CardPlaceholder = 0;
var DealerValue = 0;
var PlayerValue = 0;
var gamestate = 0;
var PlayerHand = [];
var DealerHand = [];


function PopulateDeck (){
	var x;
	var y;
	var counter = 0;
	var numVal = 0;
	
	for (x = 0; x < CardSuit.length; x++){
		for (y = 0; y < CardValue.length; y++){
			
			if (y+1 >= 10){
				numVal = 10
			}
			else{
				numVal = y+1;
			}
			
			CardArray[counter] = {value:CardValue[y], suit:CardSuit[x], num:numVal, name:CardValue[y]+" of "+ CardSuit[x]};
			counter ++;
		}
	}
}

function SuffleDeck(){	
	var tempCard;
	var place = 0;
	for (var x = 0; x < CardArray.length; x++){
		place = Math.floor((Math.random() * 51) + 0);
		tempCard = CardArray[place];
		CardArray[place] = CardArray[x];
		CardArray[x] = tempCard;
	}
}

function CalculateHand(Hand){
	var sum = 0;
	var AceCard = [];
	
	for(var x = 0; x < Hand.length; x++){
		if (Hand[x].value == "Ace"){
			AceCard.push(Hand[x]);
		}
		else{
			sum += Hand[x].num;
		}
	}
	
	for(var y = 0; y < AceCard.length; y++){
		if (sum + 11 > 21){
			sum += 1;
		}
		else{
			sum += 11;
		}
	}
	
	return sum; 
}


function fetchCard (){
	var newCard
	newCard = CardArray[CardPlaceholder];
	CardPlaceholder++;
	return newCard;
}


function StartGame(){	
	var newCard;
	
	//______Dealer Starting Hand_________
	newCard = fetchCard();
	document.getElementById("dhand").innerHTML = newCard.name;
	DealerHand.push(newCard);
	DealerValue = CalculateHand(DealerHand);
	
	newCard = fetchCard();
	document.getElementById("dhand").innerHTML += ", " + newCard.name;
	DealerHand.push(newCard);
	DealerValue = CalculateHand(DealerHand);
	
	
	//______Player Starting Hand_________
	newCard = fetchCard();
	document.getElementById("phand").innerHTML = newCard.name;
	PlayerHand.push(newCard);
	PlayerValue = CalculateHand(PlayerHand);
	
	newCard = fetchCard();
	document.getElementById("phand").innerHTML += ", " + newCard.name;
	PlayerHand.push(newCard);
	PlayerValue = CalculateHand(PlayerHand);
	
	
	//_____Update Hand Value_____________
	document.getElementById("dval").innerHTML = DealerValue;
	document.getElementById("pval").innerHTML = PlayerValue;
}


function checkBlackJackStatus(){
	if (PlayerValue == 21){
		document.getElementById("result").innerHTML = "You got BLACKJACK, you win!";
		gamestate = 1;
	}
	else if (DealerValue == 21){
		document.getElementById("result").innerHTML = "Dealer got BLACKJACK, you lose!";
		gamestate = 1;
	}
};



function checkStatus(choice){
	if (choice == 1){
		if (PlayerValue == 21){
			document.getElementById("result").innerHTML = "You got 21, you win!";
			gamestate = 1;
		}
		else if (PlayerValue > 21){
			document.getElementById("result").innerHTML = "You BUSTED, you lose!";
			gamestate = 1;
		}
	}
	else if (choice == 0){
		if (DealerValue == 21){
			document.getElementById("result").innerHTML = "Dealer got 21, you lose!";
			gamestate = 1;
		}
		else if (DealerValue > 21){
			document.getElementById("result").innerHTML = "Dealer BUSTED, you win!";
			gamestate = 1;
		}
		else{
			if(PlayerValue > DealerValue){
				document.getElementById("result").innerHTML = "You have higher value, you win!";
				gamestate = 1;
			}
			else if (PlayerValue <= DealerValue){
				document.getElementById("result").innerHTML = "Dealer have higher or equal value, you lose!";
				gamestate = 1;
			}
		}
	}
}


function hit(){
	if(gamestate == 0){
		var newCard = fetchCard();
		document.getElementById("phand").innerHTML += ", " + newCard.name;
		PlayerHand.push(newCard);
		PlayerValue = CalculateHand(PlayerHand);	
		document.getElementById("pval").innerHTML = PlayerValue;
		checkStatus(1);
	}
}


function stay(){
	if(gamestate == 0){
		var newCard;
		while(DealerValue < 17){
			newCard = fetchCard()
			document.getElementById("dhand").innerHTML += ", " + newCard.name;
			DealerHand.push(newCard);
			DealerValue = CalculateHand(DealerHand);
			document.getElementById("dval").innerHTML = DealerValue;
			checkStatus(0);
		}
		checkStatus(0);
	}
}


//Main Init 
PopulateDeck();
SuffleDeck();
StartGame();
checkBlackJackStatus();