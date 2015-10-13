var community_chest_data = [
    new Card("WIN DANCE CONTEST AT THE CRYSTAL BALLROOM", "COLLECT $50 FROM EACH PLAYER", "card", [50]),
    new Card("GATHER SIGNATURES AT TOM MCCALL WATERFRONT PARK", "COLLECT $25", "money", [25]),
    new Card("ADVANCE TO GO", "(COLLECT $200)", "go", [0]),
    new Card("TOUR PORTLAND'S CRAFT BREWERIES", "PAY $100 FOR BEER", "money", [-100]),
    new Card("PORTLAND ARTS TAX", "PAY $50", "money", [-50]),
    new Card("GET OUT OF PORTLAND SATURDAY MARKET, FREE", "THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD", "card", [0]),
    new Card("WIN A SOCCERT TOURNAMENT AT DELTA PARK", "COLLECT $45", "money", [45]),
    new Card("SELL YOUR FAMILY PASS TO THE OREGON ZOO", "COLLECT $100", "money", [100]),
    new Card("GO TO PORTLAND SATURDAY MARKET", "DO NOT PASS GO - DO NOT COLLECT $200", "go", [10]),
    new Card("BRING OUT OF TOWN FAMILY TO MULTNOMAH FALLS", "COLLECT $100", "money", [100]),
    new Card("VISIT THE PAUL BUNYAN STATUE AND FIND SOMEONE'S LUNCH MONEY", "COLLECT $10", "money", [10]),
    new Card("WIN THE PORTLAND MARATHON", "COLLECT $100", "money", [100]),
    new Card("PORTLAND'S SCHOOL BOND PASSES!", "PAY $40 PER HOUSE, $115 PER HOTEL", "assess", [-40, -115]),
    new Card("HOST A TOUR THRU WASHINGTON PARK", "COLLECT $200", "money", [200]),
    new Card("FIND HAIR IN YOUR FOOD CART LUNCH", "COLLECT $20", "money", [20]),
    new Card("PLAN AN EVENT AT OAKS AMUSEMENT PARK", "COLLECT $10 FROM EACH PLAYER", "card", [10]),
    new Card("VISIT PORTLAND ART MUSEUM", "PAY $50", "money", [50])
];
var chance_data = [
    new Card("ADVANCE TO GO", "(COLLECT $200)", "go", [0]),
    new Card("IOVATION NEEDS YOU!", "ADVANCE TOKEN TO IOVATION", "go", [24]),
    new Card("MARCH MADNESS!", "ADVANCE TOKEN TO THE NEAREAST SPORTS TEAM. IF UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY. IF OWNED, THROW DICE AND PAY OWNER 10 TIMES THE AMOUNT THROWN.", "go", [12, 28]),
    new Card("TRAFFIC JAM!", "ADVANCE TOKEN TO THE NEAREST MASS TRANSIT AND PAY OWNER TWICE THE RENTAL TO WHICH HE/SHE IS OTHERWISE ENTITLED. IF MASS TRANSIT IS UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY", "go", [5, 15, 25, 35]),
    new Card("TRAFFIC JAM!", "ADVANCE TOKEN TO THE NEAREST MASS TRANSIT AND PAY OWNER TWICE THE RENTAL TO WHICH HE/SHE IS OTHERWISE ENTITLED. IF MASS TRANSIT IS UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY", "go", [5, 15, 25, 35]),
    new Card("YOU HAVE PRODUCTS TO SELL AND STORIES TO TELL", "ADVANCE TOKEN TO BRANDLIVE", "go", [11]),
    new Card("EXPERIENCE PORTLAND'S FIRST ROSE GARDEN", "COLLECT $50 AT PENINSULA PARK", "money", [50]),
    new Card("GET OUT OF PORTLAND SATURDAY MARKET, FREE", "THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD", "card", [0]),
    new Card("GET ON THE WRONG BUS", "GO BACK 3 SPACES", "card", [-3]),
    new Card("GO DIRECTLY TO PORTLAND SATURDAY MARKET", "DO NOT PASS GO - DO NOT COLLECT $200", "go", [10]),
    new Card("PAY PORTLAND'S LEAF CLEANING FEE", "FOR EACH HOUSE PAY $25 - FOR EACH HOTEL $100", "ASSESS", [-25, -100]),
    new Card("EXPERIENCE THE HAWTHORNE DISTRICT", "PAY $15 FOR COFFEE", "money", [-15]),
    new Card("TAKE A TRIP ON THE MAX", "IF YOU PASS GO COLLECT $200", "go", [5]),
    new Card("LEARN TO BUILD COMPUTERS", "ADVANCE TOKEN TO FREE GEEK", "go", [39]),
    new Card("HOST AN EVENT AT POWELL'S CITY OF BOOKS", "PAY EACH PLAYER $50", "card", [-50]),
    new Card("SELL LOCALLY GROWN VEGETABLES AT THE PORTLAND FARMERS MARKET", "COLLECT $150", "money", [150]),
    new Card("WIN SECOND PLACE IN PORTLAND'S BEARD COMPETITION", "COLLECT $100", "money", [100])
];
//******************OBJECT VALUES******************//
//text: words on card displayed with a bigger font size
//subtext: words on card displayed with a smaller font size
//kind: "card"   - if the object, value, is zero, then the player is retaining the card
//               - if the object, value, is not zero, then the player will collect (or pay if value is negative) each player the amount of value
//      "money"  - the player will collect the amount of value (or pay if value is negative)
//      "go"     - the player will move to a certain spot of the board. If value is negative, then player will move back those spaces, if value is positive, then player will move to that position on the board(i.e. position 0 is "Go").
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
