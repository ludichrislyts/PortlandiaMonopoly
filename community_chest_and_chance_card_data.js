var community_chest_data = [];
var chance_data = [];

//Community Chest
community_chest_data[0] = {text: "ADVANCE TO GO", subtext: "(COLLECT $200)", move: "go", value: 200}; //Advance to Go (Collect $200)
community_chest_data[1] = ""; //Bank error in your favor – collect $200
community_chest_data[2] = {text: "PORTLAND ARTS TAX" subtext: "PAY $50"}; //Doctor's fees – Pay $50
community_chest_data[3] = {text: "GET OUT OF PORTLAND SATURDAY MARKET, FEE", subtext: "THIS CARD MAY BE KEPT UNTIL NEEDED OR SOLD"}; //Get out of jail free – this card may be kept until needed, or sold
community_chest_data[4] = {text: "GO TO PORTLAND SATURDAY MARKET", subtext: "GO DIRECT TO PORTLAND SATURDAY MARKET - DO NOT PASS GO - DO NOT COLLECT $200"}; //Go to jail – go directly to jail – Do not pass Go, do not collect $200
community_chest_data[5] = "Plan an Event at Oaks Amusement Park - Collect $10 from each player"; //It is your birthday Collect $10 from each player
community_chest_data[6] = {text: "WIN DANCE CONTEST AT THE CRYSTAL BALLROOM", subtext: "COLLECT $50 FROM EACH PLAYER"; //Grand Opera Night – collect $50 from every player for opening night seats
community_chest_data[7] = ""; //Income Tax refund – collect $20
community_chest_data[8] = ""; //Life Insurance Matures – collect $100
community_chest_data[9] = {text: "TOUR PORTLAND'S CRAFT BREWERIES", subtext: "PAY $100 FOR BEER"; //Pay Hospital $100
community_chest_data[10] = "Visit Portland Art Museum - Pay $50"; //Pay School Fees of $50
community_chest_data[11] = {text: "GATHER SIGNATURES AT TOM MCCALL WATERFRONT PARK", subtext: "COLLECT $25"}; //Receive for services $25
community_chest_data[12] = "Portland's School Bond Passes! Pay $40 per house, $115 per hotel"; //You are assessed for street repairs – $40 per house, $115 per hotel
community_chest_data[13] = "You visit the Paul Bunyan Statue and find someone's lunch money - Collect $10"; //You have won second prize in a beauty contest– collect $10
community_chest_data[14] = {text: "SELL YOUR FAMILY PASS TO THE OREGON ZOO", subtext: "COLLECT $100"}; //You inherit $100
community_chest_data[15] = {text: "WIN A SOCCERT TOURNAMENT AT DELTA PARK", subtext: "COLLECT $45"}; //From sale of stock you get $45
community_chest_data[16] = ""; //Holiday Fund matures - Receive $100

//Chance
chance_data[0] = "Advance to Go (Collect $200)"; //Advance to Go (Collect $200)
chance_data[1] = ""; //Advance to Illinois Ave.
chance_data[2] = ""; //Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.
chance_data[3] = ""; //Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank. (There are two of these.)
chance_data[4] = ""; //Advance to St. Charles Place – if you pass Go, collect $200
chance_data[5] = ""; //Bank pays you dividend of $50
chance_data[6] = ""; //Get out of Jail free – this card may be kept until needed, or traded/sold
chance_data[7] = ""; //Go back 3 spaces
chance_data[8] = "Go directly to Portland Saturday Market – do not pass Go, do not collect $200"; //Go directly to Jail – do not pass Go, do not collect $200
chance_data[9] = "Pay Portland's Leaf Cleaning Fee - for each house pay $25 – for each hotel $100"; //Make general repairs on all your property – for each house pay $25 – for each hotel $100
chance_data[10] = ""; //Pay poor tax of $15
chance_data[11] = ""; //Take a trip to Reading Railroad – if you pass Go collect $200
chance_data[12] = ""; //Take a walk on the Boardwalk – advance token to Boardwalk
chance_data[13] = ""; //You have been elected chairman of the board – pay each player $50
chance_data[14] = ""; //Your building loan matures – collect $150
chance_data[15] = ""; //You have won a crossword competition - collect $100


TYPE
VALUE
HOLD


move:
go -
market - type: "go", value: [10]
get out of market free: type: "card"
illinois
st. charles - type: "go", value: [11]
utility - type: "go", value: [12, 28]
railroad - type: "go", value: [5, 15, 25, 35]
bank pays $50 - type: "money", value: [50]
go back three spaces: type: "go", value: [-3]
