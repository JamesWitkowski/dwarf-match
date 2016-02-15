app.controller('GameController', function ($scope, $timeout, GameService) {
	
    //Create two card variables to keep track of the current selections
    var card1 = null;
    var card2 = null;
    
    //Add to $scope a way to track number of guesses, and total matches
    $scope.totalMatches = 0;
    $scope.attempts = 0;
    
    
    //This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    $scope.deck = GameService.getDeck();
	
	
    //Write a function that accepts a card object on click.
    
    //Before assingning card1 or card2 check to make sure both cards are falsey 

    //This function should set either card1 or card2 depending on the order of selection
    //set card.show to true
    //if this is card 1 then return to short circut the function
    //if card2 and card2 isMatch of card 1 then resetCards() increase the totalMatches and checkVictory()
    //otherwise this is where we will need to use $timeout with a delay of 1000 
    //set card1.show = false
    //card2.show = false
    //resetCards() 
	
    $scope.selectCard = function (card) {
        if(card.show || (card1 && card2)) return;
        if (card1 === null) {
            card1 = card;
            card.show = true;
        } else if (card2 === null && card !== card1) {
            card2 = card;
            card.show = true;
            compareCards();
        }else{
            alert("Ha! nice try!")
        }
    }
//write an  function that accepts two cards and returns true or false if the card titles match.
    function compareCards() {
        $scope.attempts++;
        if (card1.title === card2.title) {
            $scope.totalMatches++;
            CheckVictory();
            resetCards();
        } else {
            $timeout(hideCards,1000);
        }

       
    }
    function hideCards() {
        card1.show = false;
        card2.show = false;
        resetCards();
    }

    
	
    //write a function to resetCards
    function resetCards(){
        card1 = null;
        card2 = null;
    }
    //it will empty the two card variables above and increase the number of attempts
	
	
    //write a checkVictory function that will set $scope.victory = true if the totalMatches is half the length of the deck
    function CheckVictory() {
           if($scope.totalMatches === 1){
               $scope.victory = true;
           }
           
    }
    
    
    //Bonus: Write a function that can reset the game
    $scope.gameReset = function() {
          $scope.totalMatches = 0;
          window.location.reload();
    }
    
});