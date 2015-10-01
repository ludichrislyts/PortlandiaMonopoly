//house_cost: if house_cost === 0, you can't build houses on the deed
//              else each house costs $50 on the first side of the board,
//              $100 on the 2nd side,
//              $150 on the 3rd side,
//              and $200 on the 4th side
//************************************************************************
//multiplier: number of houses on the deed or number of other train deeds owned that affect the rent
//************************************************************************
//rent:
//************************************************************************
//group_id:
//    0 = Deeds that don't have monopolies
//    1 = Dark Purple: deeds 1, 3
//    2 = Trains: deeds 5, 15, 25, 35
//    3 = Light Blue: deeds 6, 8, 9
//    4 = Purple: deeds 11, 13, 14
//    5 = Sports Teams: deeds 12, 28
//    6 = Orange: deeds 16, 18, 19
//    7 = Red: deeds 21, 23, 24
//    8 = Yellow: deeds 26, 27, 29
//    9 = Green: deeds 31, 32, 34
//    10 = Blue: deeds 37, 39
//************************************************************************
//owned: 0 means unowned, 1 means player 1 owns it, 2 means player 2 owns it, etc.
//************************************************************************
var deeds = [];

//Go
deeds[0] = {name: "G0",
                  price: 0,
                  mortgage_value: 0,
                  house_cost: 0,
                  rent: [],
                  group_id: 0,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""  //company, sport, or train
                };

//Mediterranean Avenue
deeds[1] = {name: "JAMA SOFTWARE",
                  price: 60,
                  mortgage_value: 30,
                  house_cost: 50,
                  rent: [2, 10, 30, 90, 160],
                  group_id: 1,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: "company"
                };

//Community Chest
deeds[2] = {name: "",
                  price: ,
                  mortgage_value: ,
                  house_cost: ,
                  rent: [],
                  group_id: 0,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Baltic Avenue
deeds[3] = {name: "ALTSOURCE",
                  price: 60,
                  mortgage_value: 30,
                  house_cost: 50,
                  rent: [4, 20, 60, 180, 320, 450],
                  group_id: 1,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: "company"
                };

//Income Tax
deeds[4] = {name: "",
                  price: ,
                  mortgage_value: ,
                  house_cost: ,
                  rent: [],
                  group_id: ,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Reading Railroad
deeds[5] = {name: "MAX",
                  price: 200,
                  mortgage_value: 100,
                  house_cost: 0,
                  rent: [25, 50, 100, 200],
                  group_id: 2,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: "train"
                };

//Oriental Avenue
deeds[6] = {name: "ZAPPROVED",
                  price: 100,
                  mortgage_value: 50,
                  house_cost: 50,
                  rent: [6, 30, 90, 270, 400, 550],
                  group_id: 3,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: "company"
               };

//Chance
deeds[7] = {name: "",
                  price: ,
                  mortgage_value: ,
                  house_cost: ,
                  rent: [],
                  group_id: 0,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
               };

//Vermont Avenue
deeds[8] = {name: "GLOBESHERPA",
                  price: 100,
                  mortgage_value: 50,
                  house_cost: 50,
                  rent: [6, 30, 90, 270, 400, 550],
                  group_id: 3,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: "company"
                };

//Connecticut Avenue
deeds[9] = {name: "THE DYRT",
                  price: 120,
                  mortgage_value: 60,
                  house_cost: 50,
                  rent: [8, 40, 100, 300, 450, 600],
                  group_id: 3,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: "company"
                };

//Jail
deeds[10] = {name: "PORTLAND SATURDAY MARKET",
                  price: ,
                  mortgage_value: ,
                  house_cost: ,
                  rent: [],
                  group_id: ,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                 };

//St. Charles Place
deeds[11] = {name: "BRANDLIVE",
                  price: 140,
                  mortgage_value: 70,
                  house_cost: 100,
                  rent: [10, 50, 150, 450, 625, 750],
                  group_id: 4,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: "company"
                 };

//Electric Company
deeds[12] = {name: "PORTLAND TRAILBLAZERS",
                  price: 150,
                  mortgage_value: 75,
                  house_cost: 0,
                  rent: [], //rent = 4 times dice roll if one owned or 10 times if both are owned
                  group_id: 5,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                 };


//States Avenue
deeds[13] = {name: "THINKSHOUT",
                  price: 140,
                  mortgage_value: 70,
                  house_cost: 100,
                  rent: [10, 50, 150, 450, 625, 750],
                  group_id: 4,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                 };

//Virginia Avenue
deeds[14] = {name: "ACQUIA",
                  price: 160,
                  mortgage_value: 80,
                  house_cost: 100,
                  rent: [12, 60, 180, 500, 700, 900],
                  group_id: 4,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Pennsylvania Railroad
deeds[15] = {name: "PORTLAND STREETCAR",
                  price: 200,
                  mortgage_value: 100,
                  house_cost: 0,
                  rent: [25, 50, 100, 200],
                  group_id: 2,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: "train"
                };

//St. James Place
deeds[16] = {name: "NOTION",
                  price: 180,
                  mortgage_value: 90,
                  house_cost: 100,
                  rent: [14, 70, 200, 550, 750, 950],
                  group_id: 6,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Community Chest
deeds[17] = {name: "",
                  price: ,
                  mortgage_value: ,
                  house_cost: ,
                  rent: [],
                  group_id: ,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Tennessee Avenue
deeds[18] = {name: "ARUBA NETWORKS",
                  price: 180,
                  mortgage_value: 90,
                  house_cost: 100,
                  rent: [14, 70, 200, 550, 750, 950],
                  group_id: 6,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//New York
deeds[19] = {name: "RENTRAK",
                  price: 200,
                  mortgage_value: 100,
                  house_cost: 100,
                  rent: [16, 80, 220, 600, 800, 1000],
                  group_id: 6,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Free Parking
deeds[20] = {name: "",
                  price: ,
                  mortgage_value: ,
                  house_cost: ,
                  rent: [],
                  group_id: 0,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Kentucky Avenue
deeds[21] = {name: "RADAR",
                  price: 220,
                  mortgage_value: 110,
                  house_cost: 150,
                  rent: [18, 90, 250, 700, 875, 1050],
                  group_id: 7,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Chance
deeds[22] = {name: "",
                  price: ,
                  mortgage_value: ,
                  house_cost: ,
                  rent: [],
                  group_id: ,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Indiana Avenue
deeds[23] = {name: "CHIRPIFY",
                  price: 220,
                  mortgage_value: 110,
                  house_cost: 150,
                  rent: [18, 90, 250, 700, 875, 1050],
                  group_id: 7,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Illinois Avenue
deeds[24] = {name: "IOVATION",
                  price: 240,
                  mortgage_value: 120,
                  house_cost: 150,
                  rent: [20, 100, 300, 750, 925, 1100],
                  group_id: 7,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//B & O Railroad
deeds[25] = {name: "PORTLAND AERIAL TRAM",
                  price: 200,
                  mortgage_value: 100,
                  house_cost: 0,
                  rent: [25, 50, 100, 200],
                  group_id: 2,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Atlantic Avenue
deeds[26] = {name: "METAL TOAD",
                  price: 260,
                  mortgage_value: 130,
                  house_cost: 150,
                  rent: [22, 110, 330, 800, 975, 1150],
                  group_id: 8,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Ventnor Avenue
deeds[27] = {name: "WEBTRENDS",
                  price: 260,
                  mortgage_value: 130,
                  house_cost: 150,
                  rent: [22, 110, 330, 800, 975, 1150],
                  group_id: 8,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Water Works
deeds[28] = {name: "PORTLAND TIMBERS",
                  price: 150,
                  mortgage_value: 75,
                  house_cost: 0,
                  rent: [], //rent = 4 times dice roll if one owned or 10 times if both are owned
                  group_id: 5,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Marvin Gardens
deeds[29] = {name: "APPNEXUS",
                  price: 280,
                  mortgage_value: 140,
                  house_cost: 150,
                  rent: [24, 120, 360, 850, 1025, 1200],
                  group_id: 8,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Go To Jail
deeds[30] = {name: "GO TO PORTLAND SATURDAY MARKET",
                  price: 0,
                  mortgage_value: 0,
                  house_cost: 0,
                  rent: [],
                  group_id: 0,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Pacific Avenue
deeds[31] = {name: "CROWDCOMPASS",
                  price: 300,
                  mortgage_value: 150,
                  house_cost: 200,
                  rent: [26, 130, 390, 900, 1100, 1275],
                  group_id: 9,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//North Carolina Avenue
deeds[32] = {name: "JIVE SOFTWARE",
                  price: 300,
                  mortgage_value: 150,
                  house_cost: 200,
                  rent: [26, 130, 390, 900, 1100, 1275],
                  group_id: 9,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Community Chest
deeds[33] = {name: "",
                  price: 0,
                  mortgage_value: 0,
                  house_cost: 0,
                  rent: [],
                  group_id: 0,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Pennsylvania Avenue
deeds[34] = {name: "PUPPET LABS",
                  price: 320,
                  mortgage_value: 160,
                  house_cost: 200,
                  rent: [28, 150, 450, 1000, 1200],
                  group_id: 9,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Short Line Railroad
deeds[35] = {name: "WASHINGTON PARK AND ZOO RAILWAY",
                  price: 200,
                  mortgage_value: 100,
                  house_cost: 0,
                  rent: [25, 50, 100, 200],
                  group_id: 2,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Chance
deeds[36] = {name: "",
                  price: 0,
                  mortgage_value: 0,
                  house_cost: 0,
                  rent: [],
                  group_id: 0,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Park Place
deeds[37] = {name: "NEW RELIC",
                  price: 350,
                  mortgage_value: 175,
                  house_cost: 200,
                  rent: [35, 175, 500, 1100, 1300, 1500],
                  group_id: 10,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Luxury Tax
deeds[38] = {name: "",
                  price: 0,
                  mortgage_value: ,
                  house_cost: ,
                  rent: [],
                  group_id: 0,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };

//Boardwalk
deeds[39] = {name: "FREE GEEK",
                  price: 400,
                  mortgage_value: 200,
                  house_cost: 200,
                  rent: [50, 200, 600, 1400, 1700, 2000],
                  group_id: 10,
                  owned: 0,
                  monopoly: false,
                  multiplier: 0,
                  type: ""
                };
