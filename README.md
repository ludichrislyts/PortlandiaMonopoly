Working readme for project responsibilities and data inputs and outputs.

Jason
Generating the css and board with tile configurations.
Board card object, controller
{boardCardName: "string", value: int, location: int, mortgageValue: int, img: "string"}

-----------Dana/Tyler ------------------
roll function, gathering data for cards
-----------------------------------
=======
Chris
creating GameFactory, UtilitiesFactory
GameFactory initializes:

Player{
  id: int
  money: int
  pieceId: int
  cardsOwned : type.id
}

Property{
  id: int
  name: string
  price: int
  description: string
}

actionCard{
  id:int
  name: string
  action: function(player, money, action = null)
}

UtilitiesFactory

findbyId function
