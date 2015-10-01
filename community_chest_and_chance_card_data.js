var community_chest_data = [];
var chance_data = [];

//******************OBJECT VALUES******************//
//text: words on card displayed with a bigger font size
//subtext: words on card displayed with a smaller font size
//kind: "card"   - if the object, value, is zero, then the player is retaining the card
//               - if the object, value, is not zero, then the player will collect (or pay if value is negative) each player the amount of value
//      "money"  - the player will collect the amount of value (or pay if value is negative)
//      "go"     - the player will move to a certain spot of the board. If value is negative, then player will move back those spaces, if value is positive, then player will move to that position on the board(i.e. position 0 is "Go").
//      "assess" - the player will have to pay the amount of value, passed in as negative numbers, the amount of the first element in value per house owned plus the amount of the second element in value per hotel owned.
//value: value can equal the amount of money player needs to pay or receive, the board position the player is to move to, etc, depending on the value of the object, kind.

//Community Chest
community_chest_data[0] = {text: "WIN DANCE CONTEST AT THE CRYSTAL BALLROOM", subtext: "COLLECT $50 FROM EACH PLAYER", kind: "card", value: [50]}; //when kind === card, if value is not zero, then we are paying or collecting money from each player-------Grand Opera Night – collect $50 from every player for opening night seats
community_chest_data[1] = {text: "GATHER SIGNATURES AT TOM MCCALL WATERFRONT PARK", subtext: "COLLECT $25", kind: "money", value: [25]}; //Receive for services $25
community_chest_data[2] = {text: "ADVANCE TO GO", subtext: "(COLLECT $200)", kind: "go", value: [0]}; //Advance to Go (Collect $200)
community_chest_data[3] = {text: "TOUR PORTLAND'S CRAFT BREWERIES", subtext: "PAY $100 FOR BEER", kind: "money", value[-100]}; //Pay Hospital $100
community_chest_data[4] = {text: "PORTLAND ARTS TAX" subtext: "PAY $50", kind: "money", value[-50]}; //Doctor's fees – Pay $50
community_chest_data[5] = {text: "GET OUT OF PORTLAND SATURDAY MARKET, FREE", subtext: "THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD", kind: "card", value: [0]}; //Get out of jail free – this card may be kept until needed, or sold
community_chest_data[6] = {text: "WIN A SOCCERT TOURNAMENT AT DELTA PARK", subtext: "COLLECT $45", kind: "money", value[45]}; //From sale of stock you get $45
community_chest_data[7] = {text: "SELL YOUR FAMILY PASS TO THE OREGON ZOO", subtext: "COLLECT $100", kind: "money", value[100]}; //You inherit $100
community_chest_data[8] = {text: "GO TO PORTLAND SATURDAY MARKET", subtext: "DO NOT PASS GO - DO NOT COLLECT $200", kind: "go", value: [10]}; //Go to jail – go directly to jail – Do not pass Go, do not collect $200
community_chest_data[9] = {text: "BRING OUT OF TOWN FAMILY TO MULTNOMAH FALLS", subtext: "COLLECT $100", kind: "money", value[100]}; //Life Insurance Matures – collect $100
community_chest_data[10] = {text: "VISIT THE PAUL BUNYAN STATUE AND FIND SOMEONE'S LUNCH MONEY", subtext: "COLLECT $10", kind: "money", value[10]}; //You have won second prize in a beauty contest– collect $10
community_chest_data[11] = {text: "WIN THE PORTLAND MARATHON", subtext: "COLLECT $100", kind: "money", value[100]}; //Xmas Fund matures - Receive $100
community_chest_data[12] = {text: "PORTLAND'S SCHOOL BOND PASSES!", subtext: "PAY $40 PER HOUSE, $115 PER HOTEL", kind: "assess", value[-40, -115]}; //You are assessed for street repairs – $40 per house, $115 per hotel
community_chest_data[13] = {text: "HOST A TOUR THRU WASHINGTON PARK", subtext: "COLLECT $200", kind: "money", value[200]}; //Bank error in your favor – collect $200
community_chest_data[14] = {text: "FIND HAIR IN YOUR FOOD CART LUNCH", subtext: "COLLECT $20", kind: "money", value[20]}; //Income Tax refund – collect $20
community_chest_data[15] = {text: "PLAN AN EVENT AT OAKS AMUSEMENT PARK", subtext: "COLLECT $10 FROM EACH PLAYER", kind: "card", value[10]}; //when kind === card, if value is not zero, then we are paying or collecting money from each player-------It is your birthday Collect $10 from each player
community_chest_data[16] = {text: "VISIT PORTLAND ART MUSEUM", subtext: "PAY $50", kind: "money", value: [50]}; //Pay School Fees of $50


//Chance
chance_data[0] = {text: "ADVANCE TO GO", subtext: "(COLLECT $200)", kind: "go", value: [0]}; //Advance to Go (Collect $200)
chance_data[1] = {text: "IOVATION NEEDS YOU!", subtext: "ADVANCE TOKEN TO IOVATION", kind: "go", value, [24]}; //Advance to Illinois Ave.
chance_data[2] = {text: "MARCH MADNESS!", subtext: "ADVANCE TOKEN TO THE NEAREAST SPORTS TEAM. IF UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY. IF OWNED, THROW DICE AND PAY OWNER 10 TIMES THE AMOUNT THROWN.", kind: "go", value: [12, 28]}; //Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.
chance_data[3] = {text: "TRAFFIC JAM!", subtext: "ADVANCE TOKEN TO THE NEAREST MASS TRANSIT AND PAY OWNER TWICE THE RENTAL TO WHICH HE/SHE IS OTHERWISE ENTITLED. IF MASS TRANSIT IS UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY", kind: "go", value: [5, 15, 25, 35]}; //Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank. (There are two of these.)
chance_data[4] = {text: "TRAFFIC JAM!", subtext: "ADVANCE TOKEN TO THE NEAREST MASS TRANSIT AND PAY OWNER TWICE THE RENTAL TO WHICH HE/SHE IS OTHERWISE ENTITLED. IF MASS TRANSIT IS UNOWNED, YOU MAY BUY IT FROM THE PORTLAND BUREAU OF PLANNING AND SUSTAINABILITY", kind: "go", value: [5, 15, 25, 35]}; //Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank. (There are two of these.)
chance_data[5] = {text: "YOU HAVE PRODUCTS TO SELL AND STORIES TO TELL", subtext: "ADVANCE TOKEN TO BRANDLIVE", kind: "go", value: [11]}; //Advance to St. Charles Place – if you pass Go, collect $200
chance_data[6] = {text: "EXPERIENCE PORTLAND'S FIRST ROSE GARDEN", subtext: "COLLECT $50 AT PENINSULA PARK", kind: "money", value: [50]}; //Bank pays you dividend of $50
chance_data[7] = {text: "GET OUT OF PORTLAND SATURDAY MARKET, FREE", subtext: "THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD", kind: "card", value: [0]}; //Get out of Jail free – this card may be kept until needed, or traded/sold
chance_data[8] = {text: "GET ON THE WRONG BUS", subtext: "GO BACK 3 SPACES", kind: "card", value: [-3]}; //Go back 3 spaces
chance_data[9] = {text: "GO DIRECTLY TO PORTLAND SATURDAY MARKET", subtext: "DO NOT PASS GO - DO NOT COLLECT $200", kind: "go", value: [10]}; //Go directly to Jail – do not pass Go, do not collect $200
chance_data[10] = {text: "PAY PORTLAND'S LEAF CLEANING FEE", subtext: "FOR EACH HOUSE PAY $25 - FOR EACH HOTEL $100", kind: "ASSESS", value: [-25, -100]}; //Make general repairs on all your property – for each house pay $25 – for each hotel $100
chance_data[11] = {text: "EXPERIENCE THE HAWTHORNE DISTRICT", subtext: "PAY $15 FOR COFFEE", kind: "money", value: [-15]}; //Pay poor tax of $15
chance_data[12] = {text: "TAKE A TRIP ON THE MAX", subtext: "IF YOU PASS GO COLLECT $200", kind: "go", value: [5]}; //Take a trip to Reading Railroad – if you pass Go collect $200
chance_data[13] = {text: "LEARN TO BUILD COMPUTERS", subtext: "ADVANCE TOKEN TO FREE GEEK", kind: "go", value: [39]}; //Take a walk on the Boardwalk – advance token to Boardwalk
chance_data[14] = {text: "HOST AN EVENT AT POWELL'S CITY OF BOOKS", subtext: "PAY EACH PLAYER $50", kind: "card", value: [-50]}; //when kind === card, if value is not zero, then we are paying or collecting money from each player-------You have been elected chairman of the board – pay each player $50
chance_data[15] = {text: "SELL LOCALLY GROWN VEGETABLES AT THE PORTLAND FARMERS MARKET", subtext: "COLLECT $150", kind: "money", value: [150]}; //Your building loan matures – collect $150
chance_data[16] = {text: "WIN SECOND PLACE IN PORTLAND'S BEARD COMPETITION", subtext: "COLLECT $100", kind: "money", value: [100]}; //You have won a crossword competition - collect $100


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
