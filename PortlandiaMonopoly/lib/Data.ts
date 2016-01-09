module Data {
    export var Factory_Games = new GameFactory1();

    export var deeds = [
        //Go
        new Deed("G0", 200, 0, 0, [], 0, ""), //company, sport, train),

        //Mediterranean Avenue
        new Deed("JAMA SOFTWARE", 60, 30, 50, [2, 10, 30, 90, 160], 1, "company"),

        //Community Chest
        new Deed("Cc3", 0, 0, 0, [], 0, ""),

        //Baltic Avenue
        new Deed("ALTSOURCE", 60, 30, 50, [4, 20, 60, 180, 320, 450], 1, "company"),

        //Income Tax
        new Deed("PORTLAND ART TAX", -200, 0, 0, [], 0, ""),

        //Reading Railroad
        new Deed("MAX", 200, 100, 0, [25, 50, 100, 200], 2, "train"),

        //Oriental Avenue
        new Deed("ZAPPROVED", 100, 50, 50, [6, 30, 90, 270, 400, 550], 3, "company"),

        //Chance
        new Deed("Chance7", 0, 0, 0, [], 0, ""),

        //Vermont Avenue
        new Deed("GLOBESHERPA", 100, 50, 50, [6, 30, 90, 270, 400, 550], 3, "company"),

        //Connecticut Avenue
        new Deed("THE DYRT", 120, 60, 50, [8, 40, 100, 300, 450, 600], 3, "company"),

        //Jail
        new Deed("PORTLAND SATURDAY MARKET", 0, 0, 0, [], 0, ""),

        //St. Charles Place
        new Deed("BRANDLIVE", 140, 70, 100, [10, 50, 150, 450, 625, 750], 4, "company"),

        //Electric Company
        new Deed("PORTLAND TRAILBLAZERS", 150, 75, 0, [], 5, ""),

        //States Avenue
        new Deed("THINKSHOUT", 140, 70, 100, [10, 50, 150, 450, 625, 750], 4, "company"),

        //Virginia Avenue
        new Deed("ACQUIA", 160, 80, 100, [12, 60, 180, 500, 700, 900], 4, "company"),

        //Pennsylvania Railroad
        new Deed("PORTLAND STREETCAR", 200, 100, 0, [25, 50, 100, 200], 2, "train"),

        //St. James Place
        new Deed("NOTION", 180, 90, 100, [14, 70, 200, 550, 750, 950], 6, "company"),

        //Community Chest
        new Deed("Cc17", 0, 0, 0, [], 0, ""),

        //Tennessee Avenue
        new Deed("OPEN SESAME", 180, 90, 100, [14, 70, 200, 550, 750, 950], 6, "company"),

        //New York
        new Deed("RENTRAK", 200, 100, 100, [16, 80, 220, 600, 800, 1000], 6, "company"),

        //Free Parking
        new Deed("WASHINGTON PARK", 0, 0, 0, [], 0, ""),

        //Kentucky Avenue
        new Deed("RADAR", 220, 110, 150, [18, 90, 250, 700, 875, 1050], 7, "company"),

        //Chance
        new Deed("Chance22", 0, 0, 0, [], 0, ""),

        //Indiana Avenue
        new Deed("CHIRPIFY", 220, 110, 150, [18, 90, 250, 700, 875, 1050], 7, "company"),

        //Illinois Avenue
        new Deed("IOVATION", 240, 120, 150, [20, 100, 300, 750, 925, 1100], 7, "company"),

        //B & O Railroad
        new Deed("PORTLAND AERIAL TRAM", 200, 100, 0, [25, 50, 100, 200], 2, ""),

        //Atlantic Avenue
        new Deed("METAL TOAD", 260, 130, 150, [22, 110, 330, 800, 975, 1150], 8, "company"),

        //Ventnor Avenue
        new Deed("WEBTRENDS", 260, 130, 150, [22, 110, 330, 800, 975, 1150], 8, "company"),

        //Water Works
        new Deed("PORTLAND TIMBERS", 150, 75, 0, [], 5, ""),

        //Marvin Gardens
        new Deed("APPNEXUS", 280, 140, 150, [24, 120, 360, 850, 1025, 1200], 8, "company"),

        //Go To Jail
        new Deed("GO TO PORTLAND SATURDAY MARKET", 0, 0, 0, [], 0, ""),

        //Pacific Avenue
        new Deed("CROWDCOMPASS", 300, 150, 200, [26, 130, 390, 900, 1100, 1275], 9, "company"),

        //North Carolina Avenue
        new Deed("JIVE SOFTWARE", 300, 150, 200, [26, 130, 390, 900, 1100, 1275], 9, "company"),

        //Community Chest
        new Deed("Cc33", 0, 0, 0, [], 0, ""),

        //Pennsylvania Avenue
        new Deed("PUPPET LABS", 320, 160, 200, [28, 150, 450, 1000, 1200], 9, "company"),

        //Short Line Railroad
        new Deed("WASHINGTON PARK AND ZOO RAILWAY", 200, 100, 0, [25, 50, 100, 200], 2, ""),

        //Chance
        new Deed("Chance36", 0, 0, 0, [], 0, ""),

        //Park Place
        new Deed("NEW RELIC", 350, 175, 200, [35, 175, 500, 1100, 1300, 1500], 10, "company"),

        //Luxury Tax
        new Deed("VOODOO DOUGHNUTS", -175, 0, 0, [], 0, ""),

        //Boardwalk
        new Deed("FREE GEEK", 400, 200, 200, [50, 200, 600, 1400, 1700, 2000], 10, "company")
    ]

    export var community_chest_data: Array<Card> = [
        new Card("BRING OUT OF TOWN FAMILY TO MULTNOMAH FALLS", "COLLECT $100", "money", [100]),
        new Card("GATHER SIGNATURES AT TOM MCCALL WATERFRONT PARK", "COLLECT $25", "money", [25]),
        new Card("TOUR PORTLAND'S CRAFT BREWERIES", "PAY $100 FOR BEER", "money", [-100]),
        new Card("PORTLAND ARTS TAX", "PAY $50", "money", [-50]),
        new Card("GET OUT OF PORTLAND SATURDAY MARKET, FREE", "THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD", "card", [0]),
        //new Card("ADVANCE TO GO", "(COLLECT $200)", "go", [0]),
        new Card("WIN A SOCCERT TOURNAMENT AT DELTA PARK", "COLLECT $45", "money", [45]),
        new Card("SELL YOUR FAMILY PASS TO THE OREGON ZOO", "COLLECT $100", "money", [100]),
        //new Card("GO TO PORTLAND SATURDAY MARKET", "DO NOT PASS GO - DO NOT COLLECT $200", "go", [10]),
        new Card("BRING OUT OF TOWN FAMILY TO MULTNOMAH FALLS", "COLLECT $100", "money", [100]),
        new Card("VISIT THE PAUL BUNYAN STATUE AND FIND SOMEONE'S LUNCH MONEY", "COLLECT $10", "money", [10]),
        new Card("WIN THE PORTLAND MARATHON", "COLLECT $100", "money", [100]),
        new Card("HOST A TOUR THRU WASHINGTON PARK", "COLLECT $200", "money", [200]),
        new Card("FIND HAIR IN YOUR FOOD CART LUNCH", "COLLECT $20", "money", [20]),
        //new Card("PLAN AN EVENT AT OAKS AMUSEMENT PARK", "COLLECT $10 FROM EACH PLAYER", "card", [10]),
        new Card("VISIT PORTLAND ART MUSEUM", "PAY $50", "money", [50]),
        new Card("HOST A TOUR THRU WASHINGTON PARK", "COLLECT $200", "money", [200]),
        //new Card("WIN DANCE CONTEST AT THE CRYSTAL BALLROOM", "COLLECT $50 FROM EACH PLAYER", "card", [50]),
        //new Card("PORTLAND'S SCHOOL BOND PASSES!", "PAY $40 PER HOUSE, $115 PER HOTEL", "assess", [-40, -115]),
    ]

    export var chance_data: Array<Card> = [
        //new Card("ADVANCE TO GO", "(COLLECT $200)", "go", [0]),
        //new Card("IOVATION NEEDS YOU!", "ADVANCE TOKEN TO IOVATION", "go", [24]),
        new Card("EXPERIENCE PORTLAND'S FIRST ROSE GARDEN", "COLLECT $50 AT PENINSULA PARK", "money", [50]),
        new Card("EXPERIENCE PORTLAND'S FIRST ROSE GARDEN", "COLLECT $50 AT PENINSULA PARK", "money", [50]),
        //new Card("YOU HAVE PRODUCTS TO SELL AND STORIES TO TELL", "ADVANCE TOKEN TO BRANDLIVE", "go", [11]),
        new Card("EXPERIENCE PORTLAND'S FIRST ROSE GARDEN", "COLLECT $50 AT PENINSULA PARK", "money", [50]),
        new Card("GET OUT OF PORTLAND SATURDAY MARKET, FREE", "THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD", "card", [0]),
        //new Card("GET ON THE WRONG BUS", "GO BACK 3 SPACES", "card", [-3]),
        //new Card("GO DIRECTLY TO PORTLAND SATURDAY MARKET", "DO NOT PASS GO - DO NOT COLLECT $200", "go", [10]),
        new Card("EXPERIENCE THE HAWTHORNE DISTRICT", "PAY $15 FOR COFFEE", "money", [-15]),
        //new Card("TAKE A TRIP ON THE MAX", "IF YOU PASS GO COLLECT $200", "go", [5]),
        //new Card("LEARN TO BUILD COMPUTERS", "ADVANCE TOKEN TO FREE GEEK", "go", [39]),
        new Card("SELL LOCALLY GROWN VEGETABLES AT THE PORTLAND FARMERS MARKET", "COLLECT $150", "money", [150]),
        new Card("EXPERIENCE PORTLAND'S FIRST ROSE GARDEN", "COLLECT $50 AT PENINSULA PARK", "money", [50]),
        new Card("SELL LOCALLY GROWN VEGETABLES AT THE PORTLAND FARMERS MARKET", "COLLECT $150", "money", [150]),
        new Card("WIN SECOND PLACE IN PORTLAND'S BEARD COMPETITION", "COLLECT $100", "money", [100]),
        new Card("EXPERIENCE THE HAWTHORNE DISTRICT", "PAY $15 FOR COFFEE", "money", [-15]),
        //new Card("HOST AN EVENT AT POWELL'S CITY OF BOOKS", "PAY EACH PLAYER $50", "card", [-50]),
        //new Card("TRAFFIC JAM!", "ADVANCE TOKEN TO THE NEAREST MASS TRANSIT AND PAY OWNER TWICE THE RENTAL TO WHICH HE/SHE IS OTHERWISE ENTITLED. IF MASS TRANSIT IS UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY", "go", [5, 15, 25, 35]),
        //new Card("TRAFFIC JAM!", "ADVANCE TOKEN TO THE NEAREST MASS TRANSIT AND PAY OWNER TWICE THE RENTAL TO WHICH HE/SHE IS OTHERWISE ENTITLED. IF MASS TRANSIT IS UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY", "go", [5, 15, 25, 35]),
        //new Card("PAY PORTLAND'S LEAF CLEANING FEE", "FOR EACH HOUSE PAY $25 - FOR EACH HOTEL $100", "assess", [-25, -100]),
        //new Card("MARCH MADNESS!", "ADVANCE TOKEN TO THE NEAREAST SPORTS TEAM. IF UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY. IF OWNED, THROW DICE AND PAY OWNER 10 TIMES THE AMOUNT THROWN.", "go", [12, 28]),

    ]

    export var GamePieces = [
        new GamePiece(1, "Blue", "#547098", "#325876"),
        new GamePiece(2, "Red", "#6D0F03", "#4b8d81"),
        new GamePiece(3, "Green", "#5F6C4E", "#3d4a2c"),
        new GamePiece(4, "Orange", "#FB7116", "#d92004"),
        new GamePiece(5, "Black", "#080806", "#000"),
        new GamePiece(5, "Yellow", "#FAB900", "#d89700")
    ]
    export var GameObjects = [
        new GameObject("player1", "Dog"),
        new GameObject("player2", "Hat"),
        new GameObject("player3", "Iron"),
        new GameObject("player4", "Elephant")
    ]

    export var remainingGamePieces: Array<GamePiece> = [] //Obsolete!!!!! Try to trash this one day!!!
    export var remainingObjects: Array<GameObject> = []
    export var players: Array<Player> = []

    //TODO: Move...maybe
    for (var i = 0; i < Data.GamePieces.length; i++) {
        Data.remainingGamePieces.push(Data.GamePieces[i]);
    }
    for (var i = 0; i < Data.GameObjects.length; i++) {
        Data.remainingObjects.push(Data.GameObjects[i]);
    }
}

//******************OBJECT VALUES******************//
//text: words on card displayed with a bigger font size
//subtext: words on card displayed with a smaller font size
//kind: "card"   - if the object, value, is zero, then the player is retaining the card
//               - if the object, value, is not zero, then the player will collect (or pay if value is negative) each player the amount of value
//      "money"  - the player will collect the amount of value (or pay if value is negative)
//      "go"     - the player will move to a certain spot of the board.
//                 If first value is negative, then player will move back those spaces, if first value is positive, then player will move to that position on the board(i.e.position 0 is "Go").
//                 Second value is amount player gains or looses (+200 for advance to Go)
//      "assess" - the player will have to pay the amount of value, passed in as negative numbers, the amount of the first element in value per house owned plus the amount of the second element in value per hotel owned.
//value: value can equal the amount of money player needs to pay or receive, the board position the player is to move to, etc, depending on the value of the object, kind.

// TYPE
// VALUE
// HOLD
//
//
// move:
// go -
// market - kind: "go", value: [10]
// get out of market free: kind: "card"
// illinois
// st. charles - kind: "go", value: [11]
// utility - kind: "go", value: [12, 28]
// railroad - kind: "go", value: [5, 15, 25, 35]
// bank pays $50 - kind: "money", value: [50]
// go back three spaces: kind: "go", value: [-3]