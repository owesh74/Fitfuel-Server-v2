const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Outlet = require('./models/Outlet');
const outletsData = [
  {
    name: "McDonald's",
    description: "Iconic fast-food chain for burgers & fries.",
    menu: [
      {"itemName": "McVeggie Burger", "calories": 402, "protein": 10.2, "carbs": 56.5, "fat": 13.8},
      {"itemName": "Aloo Tikki Burger", "calories": 340, "protein": 5.7, "carbs": 51.5, "fat": 12.4},
      {"itemName": "McSpicy Paneer Burger", "calories": 653, "protein": 20.3, "carbs": 52.3, "fat": 39.5},
      {"itemName": "McSpicy Paneer Wrap", "calories": 675, "protein": 21.0, "carbs": 59.3, "fat": 39.1},
      {"itemName": "Schezwan Veg Burger", "calories": 382, "protein": 12.9, "carbs": 44.1, "fat": 17.1},
      {"itemName": "Butter Paneer Grilled Burger", "calories": 833, "protein": 24.2, "carbs": 93.8, "fat": 37.9},
      {"itemName": "Veg Maharaja Mac", "calories": 228, "protein": 5.5, "carbs": 24.8, "fat": 11.4},
      {"itemName": "Pizza Puff", "calories": 274, "protein": 13.2, "carbs": 36.2, "fat": 8.5},
      {"itemName": "Chicken McGrill Burger", "calories": 357, "protein": 17.1, "carbs": 39.8, "fat": 14.4},
      {"itemName": "Butter Chicken Grilled Burger", "calories": 265, "protein": 12.0, "carbs": 31.0, "fat": 10.0},
      {"itemName": "McEgg Burger", "calories": 401, "protein": 15.7, "carbs": 48.0, "fat": 15.7},
      {"itemName": "McChicken Burger", "calories": 348, "protein": 15.4, "carbs": 38.9, "fat": 14.2},
      {"itemName": "Filet-O-Fish Burger", "calories": 452, "protein": 21.5, "carbs": 46.1, "fat": 19.4},
      {"itemName": "McSpicy Chicken Burger", "calories": 567, "protein": 23.7, "carbs": 57.1, "fat": 26.9},
      {"itemName": "Chicken Maharaja Mac", "calories": 662, "protein": 38.8, "carbs": 60.3, "fat": 29.8},
      {"itemName": "Veg Wrap", "calories": 422, "protein": 8.2, "carbs": 58.7, "fat": 17.2},
      {"itemName": "Spicy Paneer Wrap", "calories": 675, "protein": 20.9, "carbs": 59.3, "fat": 39.1},
      {"itemName": "McNuggets (4 pc)", "calories": 170, "protein": 9, "carbs": 10, "fat": 10},
      {"itemName": "McNuggets (6 pc)", "calories": 280, "protein": 15, "carbs": 18, "fat": 17},
      {"itemName": "McNuggets (9 pc)", "calories": 420, "protein": 23, "carbs": 27, "fat": 25},
      {"itemName": "McNuggets (20 pc)", "calories": 930, "protein": 47, "carbs": 60, "fat": 51},
      {"itemName": "Fries (Small)", "calories": 220, "protein": 3, "carbs": 29, "fat": 11},
      {"itemName": "Fries (Medium)", "calories": 337, "protein": 4, "carbs": 42, "fat": 17},
      {"itemName": "Fries (Large)", "calories": 490, "protein": 6, "carbs": 63, "fat": 23},
      {"itemName": "McFlurry Oreo (Small)", "calories": 340, "protein": 6, "carbs": 45, "fat": 15},
      {"itemName": "McFlurry Oreo (Regular)", "calories": 503, "protein": 9, "carbs": 65, "fat": 22},
      {"itemName": "Soft Serve Cone", "calories": 200, "protein": 5, "carbs": 28, "fat": 8},
      {"itemName": "Soft Serve Hot Fudge", "calories": 270, "protein": 6, "carbs": 40, "fat": 9},
      {"itemName": "Brownie Hot Fudge (Regular)", "calories": 400, "protein": 8, "carbs": 55, "fat": 15},
      {"itemName": "Cold Coffee", "calories": 220, "protein": 6, "carbs": 34, "fat": 7},
      {"itemName": "Masala Chai", "calories": 90, "protein": 2, "carbs": 15, "fat": 2},
      {"itemName": "Coca Cola (Medium)", "calories": 150, "protein": 0, "carbs": 39, "fat": 0},
      {"itemName": "Fanta (Medium)", "calories": 160, "protein": 0, "carbs": 42, "fat": 0},
      {"itemName": "Sprite (Medium)", "calories": 150, "protein": 0, "carbs": 39, "fat": 0},
      {"itemName": "Chicken Kebab Burger", "calories": 380, "protein": 20, "carbs": 40, "fat": 16},
      {"itemName": "Cheesy Italian Burger", "calories": 470, "protein": 18, "carbs": 52, "fat": 22},
      {"itemName": "Black Forest McFlurry", "calories": 450, "protein": 8, "carbs": 65, "fat": 17},
 
    ],
  },
  {
    name: "KFC",
    description: "Kentucky Fried Chicken, famous for its fried chicken.",
    menu: [
  
      { itemName: "Hot & Crispy Chicken (1 pc)", calories: 320, protein: 16, carbs: 19, fat: 20 },
      { itemName: "Hot & Crispy Chicken (2 pcs)", calories: 640, protein: 31, carbs: 39, fat: 40 },
      { itemName: "Hot & Crispy Chicken (3 pcs)", calories: 960, protein: 47, carbs: 58, fat: 60 },
      { itemName: "Hot & Crispy Leg Piece (1 pc)", calories: 288, protein: 17, carbs: 18, fat: 17 },
      { itemName: "Hot & Crispy Leg Piece (2 pcs)", calories: 576, protein: 34, carbs: 36, fat: 34 },
      
      // Smoky & Piri Piri
      { itemName: "Smoky Chicken (1 pc)", calories: 171, protein: 21, carbs: 8, fat: 6 },
      { itemName: "Smoky Chicken (2 pcs)", calories: 342, protein: 42, carbs: 16, fat: 13 },
      { itemName: "Piri Piri Leg Piece (1 pc)", calories: 299, protein: 17, carbs: 18, fat: 17 },
      { itemName: "Piri Piri Leg Piece (2 pcs)", calories: 598, protein: 34, carbs: 36, fat: 34 },
      
      // Wings & Boneless
      { itemName: "Hot Wings (1 pc)", calories: 125, protein: 6, carbs: 8, fat: 8 },
      { itemName: "Hot Wings (2 pcs)", calories: 249, protein: 11, carbs: 16, fat: 16 },
      { itemName: "Hot Wings (4 pcs)", calories: 249, protein: 11, carbs: 16, fat: 16 },
      { itemName: "Boneless Strips (1 pc)", calories: 117, protein: 9, carbs: 7, fat: 6 },
      { itemName: "Boneless Strips (3 pcs)", calories: 117, protein: 10, carbs: 7, fat: 7 },
      { itemName: "Boneless Strips (5 pcs)", calories: 117, protein: 11, carbs: 9, fat: 8 },
      
      // Popcorn Chicken
      { itemName: "Popcorn Regular", calories: 306, protein: 17, carbs: 21, fat: 18 },
      { itemName: "Popcorn Medium", calories: 476, protein: 27, carbs: 32, fat: 28 },
      { itemName: "Popcorn Large", calories: 646, protein: 36, carbs: 44, fat: 38 },
      
      // Burgers
      { itemName: "Classic Zinger Burger", calories: 612, protein: 27, carbs: 63, fat: 29 },
      { itemName: "Tandoori Zinger Burger", calories: 902, protein: 25, carbs: 62, fat: 30 },
      { itemName: "Spicy Zinger Burger", calories: 439, protein: 28, carbs: 47, fat: 16 },
      { itemName: "Pro Zinger Burger", calories: 529, protein: 29, carbs: 41, fat: 29 },
      { itemName: "Veg Zinger Burger", calories: 619, protein: 14, carbs: 83, fat: 25 },
      { itemName: "Paneer Zinger", calories: 673, protein: 25, carbs: 59, fat: 38 },
      { itemName: "Egg Burger", calories: 280, protein: 13, carbs: 31, fat: 12 },
      { itemName: "Egg Loaded Burger", calories: 495, protein: 31, carbs: 45, fat: 21 },
      
      // Krispers
      { itemName: "Classic Chicken Krisper", calories: 405, protein: 17, carbs: 47, fat: 17 },
      { itemName: "Spicy Chicken Krisper", calories: 342, protein: 17, carbs: 49, fat: 8 },
      { itemName: "Classic Veg Krisper", calories: 496, protein: 9, carbs: 54, fat: 28 },
      { itemName: "Spicy Veg Krisper", calories: 436, protein: 9, carbs: 58, fat: 19 },
      
      // Rolls
      { itemName: "Chicken Roll Single", calories: 461, protein: 14, carbs: 57, fat: 20 },
      { itemName: "Chicken Roll Double", calories: 526, protein: 23, carbs: 51, fat: 27 },
      { itemName: "Korean Chicken Roll", calories: 228, protein: 15, carbs: 41, fat: 18 },
      { itemName: "Thai Chicken Roll", calories: 225, protein: 15, carbs: 41, fat: 18 },
      { itemName: "Tandoori Chicken Roll", calories: 255, protein: 18, carbs: 41, fat: 20 },
      { itemName: "Veg Roll", calories: 447, protein: 8, carbs: 55, fat: 22 },
      
      // Rice Bowls
      { itemName: "Classic HC Chicken Rice Bowl", calories: 547, protein: 36, carbs: 61, fat: 18 },
      { itemName: "Popcorn Chicken Rice Bowl", calories: 615, protein: 24, carbs: 88, fat: 19 },
      { itemName: "Smoky Chicken Rice Bowl", calories: 418, protein: 24, carbs: 65, fat: 8 },
      { itemName: "Veg Rice Bowl", calories: 418, protein: 9, carbs: 76, fat: 9 },
      { itemName: "Plain Rice Bowl", calories: 418, protein: 10, carbs: 65, fat: 13 },
      
      // Sides & Fries
      { itemName: "Fries Regular", calories: 224, protein: 5, carbs: 28, fat: 11 },
      { itemName: "Fries Medium", calories: 299, protein: 7, carbs: 37, fat: 14 },
      { itemName: "Fries Large", calories: 404, protein: 9, carbs: 50, fat: 19 },
      
      // LTO & Special Items
      { itemName: "Double Down", calories: 590, protein: 38, carbs: 34, fat: 34 },
      { itemName: "Chizza", calories: 473, protein: 36, carbs: 29, fat: 23 },
      { itemName: "K-Pop Regular", calories: 178, protein: 15, carbs: 2, fat: 13 },
      { itemName: "K-Pop Medium", calories: 178, protein: 21, carbs: 2, fat: 18 },
      { itemName: "K-Pop Large", calories: 178, protein: 32, carbs: 3, fat: 27 },
      
      // Desserts & Beverages
      { itemName: "Choco Lava Cake", calories: 343, protein: 6, carbs: 34, fat: 21 },
      { itemName: "Choco Mud Pie", calories: 241, protein: 3, carbs: 37, fat: 9 },
      { itemName: "Mini Dessert Bucket", calories: 250, protein: 4, carbs: 34, fat: 11 },
      { itemName: "Pepsi Regular", calories: 142, protein: 0, carbs: 34, fat: 0 },
      { itemName: "7UP Regular", calories: 155, protein: 0, carbs: 36, fat: 0 },
      { itemName: "Mirinda Regular", calories: 182, protein: 0, carbs: 43, fat: 0 }
    ],
  },
  {
    name: "Burger King",
    description: "Known for its flame-grilled burgers.",
    menu: [
           {"itemName": "Crispy Veg", "calories": 427, "protein": 8.4, "carbs": 52.0, "fat": 20.6},
      {"itemName": "BK Veggie", "calories": 404, "protein": 8.6, "carbs": 53.2, "fat": 17.4},
      {"itemName": "Veg Chilli Cheese", "calories": 423, "protein": 11.6, "carbs": 50.6, "fat": 19.3},
      {"itemName": "Paneer King", "calories": 526, "protein": 14.0, "carbs": 67.1, "fat": 22.4},
      {"itemName": "Veg Supreme", "calories": 374, "protein": 11.5, "carbs": 45.1, "fat": 16.5},
      {"itemName": "Veg Whopper", "calories": 749, "protein": 16.0, "carbs": 100.6, "fat": 31.4},
      {"itemName": "Chicken Whopper", "calories": 662, "protein": 38.8, "carbs": 60.3, "fat": 29.8},
      {"itemName": "Mutton Whopper", "calories": 624, "protein": 30.4, "carbs": 71.0, "fat": 24.3},
      {"itemName": "Fiery Chicken (South)", "calories": 400, "protein": 22.9, "carbs": 61.7, "fat": 16.2},
      {"itemName": "Fiery Chicken (North & West)", "calories": 449, "protein": 30.3, "carbs": 35.1, "fat": 20.8},
      {"itemName": "Crispy Chicken", "calories": 345, "protein": 12.4, "carbs": 39.0, "fat": 15.5},
      {"itemName": "Spicy Crispy Chicken", "calories": 322, "protein": 12.1, "carbs": 36.5, "fat": 14.2},
      {"itemName": "Chicken Tandoori Grill", "calories": 390, "protein": 22.4, "carbs": 39.1, "fat": 16.0},
      {"itemName": "Chicken Chilli Cheese", "calories": 401, "protein": 16.5, "carbs": 47.3, "fat": 16.2},
      {"itemName": "Egg Overloaded", "calories": 496, "protein": 15.6, "carbs": 58.8, "fat": 22.2},
      {"itemName": "Egg Supreme", "calories": 328, "protein": 11.1, "carbs": 35.3, "fat": 15.5},
      {"itemName": "Egg Wrap", "calories": 395, "protein": 9.8, "carbs": 45.8, "fat": 19.2},
      {"itemName": "Juicy Keema Wrap", "calories": 349, "protein": 10.4, "carbs": 46.9, "fat": 19.3},
      {"itemName": "Chicken Fries (5 Pcs)", "calories": 206, "protein": 10.9, "carbs": 19.9, "fat": 9.2},
      {"itemName": "Chicken Wings Fried (4 Pcs)", "calories": 333, "protein": 35.2, "carbs": 1.8, "fat": 20.5},
      {"itemName": "Chicken Wings Grilled (8 Pcs)", "calories": 670, "protein": 55.4, "carbs": 72.4, "fat": 17.7},
      {"itemName": "Fried Chicken (2 Pc)", "calories": 909, "protein": 59.0, "carbs": 38.7, "fat": 57.6},
      {"itemName": "Fried Chicken (4 Pc)", "calories": 1818, "protein": 117.9, "carbs": 77.5, "fat": 115.2},
      {"itemName": "Fried Chicken (6 Pc)", "calories": 2728, "protein": 176.9, "carbs": 116.2, "fat": 172.8},
      {"itemName": "Veg Strips (5 Pcs)", "calories": 229, "protein": 4.5, "carbs": 27.9, "fat": 10.9},
      {"itemName": "Hash Brown", "calories": 158, "protein": 1.7, "carbs": 19.7, "fat": 8.1},
      {"itemName": "Fries Regular", "calories": 264, "protein": 4.4, "carbs": 37.7, "fat": 10.6},
      {"itemName": "Fries Medium", "calories": 407, "protein": 6.8, "carbs": 58.1, "fat": 16.3},
      {"itemName": "King Fries", "calories": 535, "protein": 8.9, "carbs": 76.5, "fat": 21.5},
      {"itemName": "Cheesy Fries", "calories": 461, "protein": 8.1, "carbs": 56.2, "fat": 22.6},
      {"itemName": "Cheesy Chicken Fries", "calories": 586, "protein": 9.9, "carbs": 64.6, "fat": 32.0},
      {"itemName": "Latte", "calories": 64, "protein": 0, "carbs": 16, "fat": 0},
      {"itemName": "Coffee Frappe", "calories": 295, "protein": 7.1, "carbs": 44.1, "fat": 10.0},
      {"itemName": "7UP Regular (300ml)", "calories": 154, "protein": 0, "carbs": 38.4, "fat": 0},
      {"itemName": "Mirinda Regular (300ml)", "calories": 167, "protein": 0, "carbs": 42.0, "fat": 0}
    
      // ... add 25+ more
    ],
  },
  {
    name: "Pizza Hut",
    description: "Delicious pizzas and sides.",
    menu: [
      {"itemName": "Margherita Pizza (Personal)", "calories": 725, "protein": 32, "carbs": 101.6, "fat": 21.2},
      {"itemName": "Schezwan Margherita (Personal)", "calories": 744, "protein": 32, "carbs": 104.0, "fat": 22.3},
      {"itemName": "Corn n Cheese (Personal)", "calories": 869, "protein": 36, "carbs": 131.9, "fat": 22.0},
      {"itemName": "Veggie Feast (Personal)", "calories": 823, "protein": 36, "carbs": 122.1, "fat": 21.2},
      {"itemName": "Spiced Paneer Pizza (Personal)", "calories": 816, "protein": 43, "carbs": 95.0, "fat": 29.1},
      {"itemName": "Mexican Fiesta Veg (Personal)", "calories": 856, "protein": 37, "carbs": 108.9, "fat": 30.3},
      {"itemName": "Tandoori Paneer Pizza (Personal)", "calories": 1065, "protein": 36, "carbs": 152.8, "fat": 34.5},
      {"itemName": "Country Feast Pizza (Personal)", "calories": 815, "protein": 34, "carbs": 134.2, "fat": 16.1},
      {"itemName": "Ultimate Tandoori Veggie (Personal)", "calories": 1068, "protein": 32, "carbs": 156.4, "fat": 34.7},
      {"itemName": "Veggie Supreme (Personal)", "calories": 853, "protein": 35, "carbs": 110.8, "fat": 28.8},
      {"itemName": "Mazedar Makhni Paneer (Personal)", "calories": 880, "protein": 40, "carbs": 100.7, "fat": 35.2},
      {"itemName": "Chicken Sausage Pizza (Personal)", "calories": 892, "protein": 36, "carbs": 98.5, "fat": 39.2},
      {"itemName": "Sausage & Sweet Corn Pizza (Personal)", "calories": 830, "protein": 37, "carbs": 105.7, "fat": 28.5},
      {"itemName": "Sizzling Schezwan Chicken", "calories": 763, "protein": 40, "carbs": 99.8, "fat": 22.7},
      {"itemName": "Dhabe Da Keema Pizza (Personal)", "calories": 865, "protein": 40, "carbs": 99.5, "fat": 34.1},
      {"itemName": "Chicken Pepperoni Pizza (Personal)", "calories": 878, "protein": 30, "carbs": 100.9, "fat": 34.6},
      {"itemName": "Chicken Tikka Pizza (Personal)", "calories": 793, "protein": 35, "carbs": 97.2, "fat": 29.2},
      {"itemName": "Murg Malai Chicken (Personal)", "calories": 851, "protein": 43, "carbs": 108.0, "fat": 27.3},
      {"itemName": "Veggie Supreme (Medium)", "calories": 1653, "protein": 69, "carbs": 214.7, "fat": 55.9},
      {"itemName": "Mazedar Makhni Paneer (Medium)", "calories": 1725, "protein": 79, "carbs": 197.4, "fat": 69.1},
      {"itemName": "Chicken Supreme Pizza (Personal)", "calories": 891, "protein": 48, "carbs": 94.8, "fat": 35.6},
      {"itemName": "Tandoori Paneer Pizza (Medium)", "calories": 2048, "protein": 67, "carbs": 305.6, "fat": 65},
    ],
  },
  {
    name: "Grains and Cereals",
    description: "Nutritional values per 100g of raw food.",
    menu: [
         { "itemName": "White Rice", "calories": 365, "protein": 7.1, "carbs": 80.0, "fat": 0.7, "sugar": 0.1 },
    { "itemName": "Brown Rice", "calories": 370, "protein": 7.9, "carbs": 77.2, "fat": 2.9, "sugar": 0.9 },
    { "itemName": "Basmati Rice", "calories": 356, "protein": 8.2, "carbs": 78.0, "fat": 0.8, "sugar": 0.2 },
    { "itemName": "Red Rice", "calories": 405, "protein": 7.0, "carbs": 86.0, "fat": 2.2, "sugar": 1.0 },
    { "itemName": "Black Rice", "calories": 356, "protein": 8.9, "carbs": 75.6, "fat": 3.2, "sugar": 0.7 },
    { "itemName": "Wheat", "calories": 339, "protein": 13.7, "carbs": 71.2, "fat": 2.5, "sugar": 0.4 },
    { "itemName": "Oats", "calories": 389, "protein": 16.9, "carbs": 66.3, "fat": 6.9, "sugar": 0.9 },
    { "itemName": "Barley", "calories": 354, "protein": 12.5, "carbs": 73.5, "fat": 2.3, "sugar": 0.8 },
    { "itemName": "Quinoa", "calories": 368, "protein": 14.1, "carbs": 64.2, "fat": 6.1, "sugar": 4.6 },
    { "itemName": "Millet", "calories": 378, "protein": 11.0, "carbs": 73.0, "fat": 4.2, "sugar": 1.7 },
    { "itemName": "Toor Dal (Pigeon Pea)", "calories": 343, "protein": 22.3, "carbs": 59.0, "fat": 1.5, "sugar": 2.4 },
    { "itemName": "Moong Dal (Green Lentil)", "calories": 347, "protein": 24.5, "carbs": 59.0, "fat": 1.2, "sugar": 6.6 },
    { "itemName": "Chana Dal (Split Chickpea)", "calories": 372, "protein": 22.5, "carbs": 57.2, "fat": 5.3, "sugar": 10.7 },
    { "itemName": "Masoor Dal (Red Lentil)", "calories": 352, "protein": 24.6, "carbs": 63.4, "fat": 1.1, "sugar": 2.0 },
    { "itemName": "Urad Dal (Black Gram)", "calories": 341, "protein": 25.2, "carbs": 58.9, "fat": 1.6, "sugar": 7.0 },
    { "itemName": "Rajma (Kidney Bean)", "calories": 333, "protein": 22.5, "carbs": 60.3, "fat": 1.4, "sugar": 2.1 },
    { "itemName": "Chickpeas (Garbanzo Beans)", "calories": 378, "protein": 20.5, "carbs": 63.0, "fat": 6.0, "sugar": 10.7 },
    { "itemName": "Spinach", "calories": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4, "sugar": 0.4 },
    { "itemName": "Kale", "calories": 49, "protein": 4.3, "carbs": 8.8, "fat": 0.9, "sugar": 2.3 },
    { "itemName": "Lettuce", "calories": 15, "protein": 1.4, "carbs": 2.9, "fat": 0.1, "sugar": 0.8 },
    { "itemName": "Potato", "calories": 77, "protein": 2.0, "carbs": 17.5, "fat": 0.1, "sugar": 0.8 },
    { "itemName": "Sweet Potato", "calories": 86, "protein": 1.6, "carbs": 20.1, "fat": 0.1, "sugar": 4.2 },
    { "itemName": "Carrot", "calories": 41, "protein": 0.9, "carbs": 9.6, "fat": 0.2, "sugar": 4.7 },
    { "itemName": "Onion", "calories": 40, "protein": 1.1, "carbs": 9.3, "fat": 0.1, "sugar": 4.2 },
    { "itemName": "Garlic", "calories": 149, "protein": 6.4, "carbs": 33.1, "fat": 0.5, "sugar": 1.0 },
    { "itemName": "Tomato", "calories": 18, "protein": 0.9, "carbs": 3.9, "fat": 0.2, "sugar": 2.6 },
    { "itemName": "Cucumber", "calories": 16, "protein": 0.7, "carbs": 3.6, "fat": 0.1, "sugar": 1.7 },
    { "itemName": "Bell Pepper", "calories": 31, "protein": 1.0, "carbs": 7.3, "fat": 0.3, "sugar": 4.2 },
    { "itemName": "Brinjal (Eggplant)", "calories": 25, "protein": 1.0, "carbs": 5.9, "fat": 0.2, "sugar": 3.5 },
    { "itemName": "Cauliflower", "calories": 25, "protein": 1.9, "carbs": 5.0, "fat": 0.3, "sugar": 1.9 },
    { "itemName": "Broccoli", "calories": 34, "protein": 2.8, "carbs": 6.6, "fat": 0.4, "sugar": 1.5 },
    { "itemName": "Orange", "calories": 47, "protein": 0.9, "carbs": 11.8, "fat": 0.1, "sugar": 9.4 },
    { "itemName": "Lemon", "calories": 29, "protein": 1.1, "carbs": 9.3, "fat": 0.3, "sugar": 1.5 },
    { "itemName": "Mango", "calories": 60, "protein": 0.8, "carbs": 15.0, "fat": 0.4, "sugar": 13.7 },
    { "itemName": "Banana", "calories": 89, "protein": 1.1, "carbs": 22.8, "fat": 0.3, "sugar": 12.2 },
    { "itemName": "Papaya", "calories": 43, "protein": 0.5, "carbs": 10.8, "fat": 0.3, "sugar": 7.8 },
    { "itemName": "Pineapple", "calories": 50, "protein": 0.5, "carbs": 13.1, "fat": 0.1, "sugar": 9.9 },
    { "itemName": "Apple", "calories": 52, "protein": 0.3, "carbs": 13.8, "fat": 0.2, "sugar": 10.4 },
    { "itemName": "Pomegranate", "calories": 83, "protein": 1.7, "carbs": 18.7, "fat": 1.2, "sugar": 13.7 },
    { "itemName": "Watermelon", "calories": 30, "protein": 0.6, "carbs": 7.6, "fat": 0.2, "sugar": 6.2 },
    { "itemName": "Strawberry", "calories": 32, "protein": 0.7, "carbs": 7.7, "fat": 0.3, "sugar": 4.9 },
    { "itemName": "Almonds", "calories": 579, "protein": 21.2, "carbs": 21.6, "fat": 49.9, "sugar": 4.4 },
    { "itemName": "Cashews", "calories": 553, "protein": 18.2, "carbs": 30.2, "fat": 43.8, "sugar": 5.9 },
    { "itemName": "Walnuts", "calories": 654, "protein": 15.2, "carbs": 13.7, "fat": 65.2, "sugar": 2.6 },
    { "itemName": "Peanuts", "calories": 567, "protein": 25.8, "carbs": 16.1, "fat": 49.2, "sugar": 4.7 },
    { "itemName": "Pistachios", "calories": 560, "protein": 20.2, "carbs": 27.2, "fat": 45.3, "sugar": 7.7 },
    { "itemName": "Sesame Seeds", "calories": 573, "protein": 17.7, "carbs": 23.4, "fat": 49.7, "sugar": 0.3 },
    { "itemName": "Sunflower Seeds", "calories": 584, "protein": 20.8, "carbs": 20.0, "fat": 51.5, "sugar": 2.6 },
    { "itemName": "Pumpkin Seeds", "calories": 559, "protein": 30.2, "carbs": 10.7, "fat": 49.1, "sugar": 1.4 },
    { "itemName": "Flax Seeds", "calories": 534, "protein": 18.3, "carbs": 28.9, "fat": 42.2, "sugar": 1.6 },
    { "itemName": "Chia Seeds", "calories": 486, "protein": 16.5, "carbs": 42.1, "fat": 30.7, "sugar": 0.0 },
    { "itemName": "Whole Milk", "calories": 61, "protein": 3.2, "carbs": 4.8, "fat": 3.3, "sugar": 5.1 },
    { "itemName": "Skimmed Milk", "calories": 34, "protein": 3.4, "carbs": 5.0, "fat": 0.1, "sugar": 5.1 },
    { "itemName": "Yogurt (Plain)", "calories": 61, "protein": 3.5, "carbs": 4.7, "fat": 3.3, "sugar": 4.7 },
    { "itemName": "Paneer", "calories": 265, "protein": 18.3, "carbs": 6.1, "fat": 20.8, "sugar": 2.6 },
    { "itemName": "Coconut Oil", "calories": 862, "protein": 0.0, "carbs": 0.0, "fat": 100.0, "sugar": 0.0 },
    { "itemName": "Olive Oil", "calories": 884, "protein": 0.0, "carbs": 0.0, "fat": 100.0, "sugar": 0.0 },
    { "itemName": "Sunflower Oil", "calories": 884, "protein": 0.0, "carbs": 0.0, "fat": 100.0, "sugar": 0.0 },
    { "itemName": "Mustard Oil", "calories": 884, "protein": 0.0, "carbs": 0.0, "fat": 100.0, "sugar": 0.0 },
    { "itemName": "Ghee", "calories": 876, "protein": 0.3, "carbs": 0.0, "fat": 99.5, "sugar": 0.0 },
    { "itemName": "Butter", "calories": 717, "protein": 0.9, "carbs": 0.1, "fat": 81.1, "sugar": 0.1 },
    { "itemName": "Turmeric", "calories": 354, "protein": 7.8, "carbs": 64.9, "fat": 9.9, "sugar": 3.2 },
    { "itemName": "Cumin Seeds", "calories": 375, "protein": 17.8, "carbs": 44.2, "fat": 22.3, "sugar": 2.2 },
    { "itemName": "Coriander Seeds", "calories": 298, "protein": 12.4, "carbs": 55.0, "fat": 17.8, "sugar": 0.9 },
    { "itemName": "Red Chili Powder", "calories": 282, "protein": 13.5, "carbs": 53.9, "fat": 14.3, "sugar": 7.2 },
    { "itemName": "Black Pepper", "calories": 251, "protein": 10.4, "carbs": 63.9, "fat": 3.3, "sugar": 0.6 },
     { "itemName": "Egg", "calories": 143, "protein": 13, "carbs": 0.7, "fat": 9.5, "sugar": 0.6 }
 
    ]
  }
];







const seedDB = async () => {
    await connectDB();
    try {
        await Outlet.deleteMany({});
        await Outlet.insertMany(outletsData);
        console.log('Data seeded successfully!');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();