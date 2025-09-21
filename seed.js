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
    name: "Everyday Indian Foods (Ghar ka Khana)",
    description: "Nutritional values for common home-cooked Indian meals.",
    menu: [
      // Breads
      { itemName: "Plain Roti / Chapati (Atta)", calories: 85, protein: 3, carbs: 18, fat: 0.5 },
      { itemName: "Tawa Paratha (Plain)", calories: 150, protein: 4, carbs: 25, fat: 4 },
      { itemName: "Aloo Paratha (1 medium)", calories: 250, protein: 6, carbs: 40, fat: 8 },
      { itemName: "Paneer Paratha (1 medium)", calories: 290, protein: 12, carbs: 35, fat: 11 },
      { itemName: "Naan (Plain)", calories: 260, protein: 8, carbs: 50, fat: 3 },
      { itemName: "Butter Naan", calories: 310, protein: 9, carbs: 55, fat: 6 },
      { itemName: "Puri (1 piece)", calories: 80, protein: 1, carbs: 10, fat: 4 },
      
      // Rice
      { itemName: "Plain White Rice (1 bowl)", calories: 205, protein: 4.3, carbs: 45, fat: 0.4 },
      { itemName: "Jeera Rice (1 bowl)", calories: 240, protein: 4.5, carbs: 46, fat: 5 },
      { itemName: "Vegetable Pulao (1 bowl)", calories: 290, protein: 6, carbs: 55, fat: 4 },
      { itemName: "Chicken Biryani (1 plate)", calories: 450, protein: 20, carbs: 55, fat: 15 },
      { itemName: "Curd Rice (1 bowl)", calories: 260, protein: 7, carbs: 48, fat: 4 },

      // Dals
      { itemName: "Dal Tadka (Toor/Arhar) (1 bowl)", calories: 180, protein: 9, carbs: 25, fat: 5 },
      { itemName: "Dal Fry (1 bowl)", calories: 200, protein: 10, carbs: 28, fat: 6 },
      { itemName: "Dal Makhani (1 bowl)", calories: 300, protein: 12, carbs: 35, fat: 13 },
      { itemName: "Chana Dal (1 bowl)", calories: 220, protein: 11, carbs: 35, fat: 4 },
      { itemName: "Moong Dal (Yellow) (1 bowl)", calories: 160, protein: 8, carbs: 24, fat: 3 },
      { itemName: "Sambar (1 bowl)", calories: 150, protein: 7, carbs: 22, fat: 4 },

      // Vegetable Curries
      { itemName: "Mixed Vegetable Sabzi (1 bowl)", calories: 150, protein: 4, carbs: 15, fat: 8 },
      { itemName: "Aloo Gobi (1 bowl)", calories: 160, protein: 4, carbs: 18, fat: 8 },
      { itemName: "Bhindi Masala (Okra) (1 bowl)", calories: 140, protein: 3, carbs: 12, fat: 9 },
      { itemName: "Palak Paneer (1 bowl)", calories: 280, protein: 15, carbs: 10, fat: 20 },
      { itemName: "Paneer Butter Masala (1 bowl)", calories: 350, protein: 16, carbs: 12, fat: 28 },
      { itemName: "Chana Masala (1 bowl)", calories: 250, protein: 10, carbs: 35, fat: 8 },
      { itemName: "Rajma Masala (1 bowl)", calories: 280, protein: 12, carbs: 40, fat: 7 },

      // Non-Vegetarian Curries
      { itemName: "Butter Chicken (1 bowl)", calories: 450, protein: 25, carbs: 15, fat: 32 },
      { itemName: "Chicken Tikka Masala (1 bowl)", calories: 400, protein: 28, carbs: 12, fat: 26 },
      { itemName: "Chicken Curry (Home-style) (1 bowl)", calories: 300, protein: 22, carbs: 10, fat: 18 },
      { itemName: "Egg Curry (2 eggs) (1 bowl)", calories: 280, protein: 15, carbs: 8, fat: 20 },
      { itemName: "Fish Curry (1 bowl)", calories: 260, protein: 20, carbs: 7, fat: 16 },

      // Breakfast & Snacks
      { itemName: "Poha (1 plate)", calories: 250, protein: 4, carbs: 50, fat: 3 },
      { itemName: "Upma (1 bowl)", calories: 280, protein: 7, carbs: 45, fat: 8 },
      { itemName: "Idli (2 pieces)", calories: 120, protein: 4, carbs: 26, fat: 0.5 },
      { itemName: "Masala Dosa (1 piece)", calories: 350, protein: 8, carbs: 65, fat: 9 },
      { itemName: "Samosa (1 piece)", calories: 260, protein: 4, carbs: 32, fat: 14 },
      
      // Sides
      { itemName: "Plain Curd / Dahi (1 bowl)", calories: 100, protein: 6, carbs: 7, fat: 4 },
      { itemName: "Raita (Boondi/Veg) (1 bowl)", calories: 130, protein: 7, carbs: 10, fat: 6 },
      { itemName: "Green Salad (1 plate)", calories: 50, protein: 2, carbs: 8, fat: 1 },
    ]
  },
  {
    name: "Gym Diet (Veg)",
    description: "High-protein vegetarian options for fitness.",
    menu: [
      // Protein Sources
      { itemName: "Paneer (100g, raw)", calories: 265, protein: 18, carbs: 6, fat: 21 },
      { itemName: "Paneer Bhurji (1 bowl)", calories: 300, protein: 20, carbs: 8, fat: 22 },
      { itemName: "Tofu (100g)", calories: 76, protein: 8, carbs: 2, fat: 5 },
      { itemName: "Greek Yogurt (1 cup, plain)", calories: 100, protein: 17, carbs: 6, fat: 0 },
      { itemName: "Soya Chunks (50g, dry)", calories: 175, protein: 26, carbs: 15, fat: 0.5 },
      { itemName: "Soya Keema (1 bowl)", calories: 220, protein: 25, carbs: 18, fat: 5 },
      { itemName: "Whey Protein (1 scoop)", calories: 120, protein: 24, carbs: 3, fat: 1 },
      { itemName: "Milk (250ml, toned)", calories: 150, protein: 8, carbs: 12, fat: 8 },
      
      // Dals & Legumes
      { itemName: "Chana (Chickpeas, 1 cup cooked)", calories: 269, protein: 15, carbs: 45, fat: 4 },
      { itemName: "Rajma (Kidney Beans, 1 cup cooked)", calories: 225, protein: 15, carbs: 40, fat: 1 },
      { itemName: "Moong Dal (1 bowl cooked)", calories: 160, protein: 8, carbs: 24, fat: 3 },
      { itemName: "Black Chana (1 cup cooked)", calories: 280, protein: 13, carbs: 48, fat: 5 },
      { itemName: "Lobia / Black Eyed Peas (1 cup cooked)", calories: 200, protein: 13, carbs: 35, fat: 1 },

      // Complex Carbs
      { itemName: "Oats (50g, dry)", calories: 195, protein: 8, carbs: 33, fat: 3.5 },
      { itemName: "Brown Rice (1 cup cooked)", calories: 215, protein: 5, carbs: 45, fat: 2 },
      { itemName: "Sweet Potato (100g)", calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
      { itemName: "Quinoa (1 cup cooked)", calories: 222, protein: 8, carbs: 39, fat: 4 },
      
      // Vegetables
      { itemName: "Broccoli (1 cup)", calories: 55, protein: 4, carbs: 11, fat: 0.6 },
      { itemName: "Spinach (Palak, 1 cup cooked)", calories: 41, protein: 5, carbs: 7, fat: 0.5 },
      { itemName: "Bell Peppers / Capsicum (1 cup)", calories: 30, protein: 1, carbs: 7, fat: 0.3 },
      { itemName: "Cauliflower (1 cup)", calories: 27, protein: 2, carbs: 5, fat: 0.3 },
      { itemName: "Mushroom (1 cup)", calories: 21, protein: 3, carbs: 3, fat: 0.3 },

      // Healthy Fats
      { itemName: "Almonds (20 pieces)", calories: 164, protein: 6, carbs: 6, fat: 14 },
      { itemName: "Walnuts (7 whole)", calories: 185, protein: 4, carbs: 4, fat: 18 },
      { itemName: "Peanut Butter (2 tbsp)", calories: 190, protein: 7, carbs: 8, fat: 16 },
      { itemName: "Flax Seeds (1 tbsp)", calories: 55, protein: 2, carbs: 3, fat: 4 },
      { itemName: "Ghee (1 tbsp)", calories: 112, protein: 0, carbs: 0, fat: 13 },
    ]
  },
  {
    name: "Gym Diet (Non-Veg)",
    description: "High-protein non-vegetarian options for fitness.",
    menu: [
      // Main Proteins
      { itemName: "Chicken Breast (100g, boneless, cooked)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { itemName: "Chicken Thigh (100g, boneless, cooked)", calories: 209, protein: 26, carbs: 0, fat: 11 },
      { itemName: "Whole Egg (1 large, boiled)", calories: 78, protein: 6, carbs: 0.6, fat: 5 },
      { itemName: "Egg Whites (from 4 eggs)", calories: 68, protein: 16, carbs: 1, fat: 0 },
      { itemName: "Fish (Rohu, 100g, cooked)", calories: 110, protein: 20, carbs: 0, fat: 3 },
      { itemName: "Fish (Salmon, 100g, cooked)", calories: 208, protein: 22, carbs: 0, fat: 13 },
      { itemName: "Fish (Tuna in water, 100g)", calories: 132, protein: 28, carbs: 0, fat: 1.3 },
      { itemName: "Prawns (100g, cooked)", calories: 99, protein: 24, carbs: 0, fat: 0.3 },
      
      // Common Dishes
      { itemName: "Tandoori Chicken (1 leg piece)", calories: 220, protein: 25, carbs: 2, fat: 12 },
      { itemName: "Chicken Tikka (6 pieces)", calories: 300, protein: 30, carbs: 5, fat: 18 },
      { itemName: "Mutton Keema (1 bowl)", calories: 350, protein: 22, carbs: 5, fat: 27 },
      { itemName: "Scrambled Eggs (2 eggs)", calories: 200, protein: 14, carbs: 2, fat: 15 },
      { itemName: "Masala Omelette (2 eggs)", calories: 220, protein: 15, carbs: 4, fat: 16 },
      { itemName: "Chicken Curry (home-style, 1 bowl)", calories: 300, protein: 22, carbs: 10, fat: 18 },
      { itemName: "Fish Fry (1 fillet)", calories: 250, protein: 20, carbs: 10, fat: 14 },
    ]
  },
  // --- NEW EXPANDED FRUITS SECTION ---
  {
    name: "Fruits",
    description: "Nutritional values per 100g of fruit.",
    menu: [
        { "itemName": "Apple (Seb)", "calories": 52, "protein": 0.3, "carbs": 14, "fat": 0.2 },
        { "itemName": "Banana (Kela)", "calories": 89, "protein": 1.1, "carbs": 23, "fat": 0.3 },
        { "itemName": "Mango (Aam)", "calories": 60, "protein": 0.8, "carbs": 15, "fat": 0.4 },
        { "itemName": "Orange (Santra)", "calories": 47, "protein": 0.9, "carbs": 12, "fat": 0.1 },
        { "itemName": "Grapes (Angoor)", "calories": 69, "protein": 0.7, "carbs": 18, "fat": 0.2 },
        { "itemName": "Pineapple (Ananas)", "calories": 50, "protein": 0.5, "carbs": 13, "fat": 0.1 },
        { "itemName": "Watermelon (Tarbooz)", "calories": 30, "protein": 0.6, "carbs": 8, "fat": 0.2 },
        { "itemName": "Guava (Amrood)", "calories": 68, "protein": 2.6, "carbs": 14, "fat": 1 },
        { "itemName": "Pomegranate (Anaar)", "calories": 83, "protein": 1.7, "carbs": 19, "fat": 1.2 },
        { "itemName": "Papaya (Papita)", "calories": 43, "protein": 0.5, "carbs": 11, "fat": 0.3 },
        { "itemName": "Mosambi (Sweet Lime)", "calories": 43, "protein": 0.8, "carbs": 9, "fat": 0.3 },
        { "itemName": "Chickoo (Sapodilla)", "calories": 83, "protein": 0.4, "carbs": 20, "fat": 1.1 },
        { "itemName": "Lychee", "calories": 66, "protein": 0.8, "carbs": 17, "fat": 0.4 },
        { "itemName": "Muskmelon (Kharbuja)", "calories": 34, "protein": 0.8, "carbs": 8, "fat": 0.2 },
        { "itemName": "Figs (Anjeer)", "calories": 74, "protein": 0.8, "carbs": 19, "fat": 0.3 }
    ]
  },
  
  // --- NEW EXPANDED BEVERAGES SECTION ---
  {
    name: "Beverages",
    description: "Nutritional values for common Indian drinks.",
    menu: [
        { "itemName": "Masala Chai (with milk & sugar)", "calories": 90, "protein": 2, "carbs": 15, "fat": 2 },
        { "itemName": "Black Tea (no sugar)", "calories": 2, "protein": 0.3, "carbs": 0.3, "fat": 0 },
        { "itemName": "Filter Coffee (with milk & sugar)", "calories": 110, "protein": 3, "carbs": 18, "fat": 3 },
        { "itemName": "Black Coffee (no sugar)", "calories": 2, "protein": 0.1, "carbs": 0, "fat": 0 },
        { "itemName": "Lassi (Sweet, 1 glass)", "calories": 160, "protein": 4, "carbs": 30, "fat": 3 },
        { "itemName": "Chaas (Salted Buttermilk, 1 glass)", "calories": 60, "protein": 3, "carbs": 5, "fat": 3 },
        { "itemName": "Nimbu Pani (Sweet & Salty)", "calories": 80, "protein": 0.1, "carbs": 20, "fat": 0 },
        { "itemName": "Sugarcane Juice (1 glass)", "calories": 180, "protein": 0.2, "carbs": 45, "fat": 0 },
        { "itemName": "Coconut Water (1 glass)", "calories": 46, "protein": 1.7, "carbs": 9, "fat": 0.2 },
        { "itemName": "Jaljeera (1 glass)", "calories": 10, "protein": 0.2, "carbs": 2, "fat": 0.1 },
        { "itemName": "Aam Panna (1 glass)", "calories": 120, "protein": 0.5, "carbs": 30, "fat": 0.2 },
        { "itemName": "Badam Milk (1 glass)", "calories": 200, "protein": 7, "carbs": 25, "fat": 8 }
    ]
  },

  // --- NEW EXPANDED SNACKS SECTION ---
  {
    name: "Snacks",
    description: "Nutritional values for popular Indian snacks.",
    menu: [
        { "itemName": "Samosa (1 piece)", "calories": 260, "protein": 4, "carbs": 32, "fat": 14 },
        { "itemName": "Poha (1 plate)", "calories": 250, "protein": 4, "carbs": 50, "fat": 3 },
        { "itemName": "Upma (1 bowl)", "calories": 280, "protein": 7, "carbs": 45, "fat": 8 },
        { "itemName": "Idli (2 pieces with sambar)", "calories": 180, "protein": 6, "carbs": 35, "fat": 1.5 },
        { "itemName": "Masala Dosa (1 piece)", "calories": 350, "protein": 8, "carbs": 65, "fat": 9 },
        { "itemName": "Vada Pav (1 piece)", "calories": 300, "protein": 7, "carbs": 50, "fat": 8 },
        { "itemName": "Pav Bhaji (1 plate)", "calories": 400, "protein": 10, "carbs": 60, "fat": 14 },
        { "itemName": "Dhokla (2 pieces)", "calories": 150, "protein": 6, "carbs": 25, "fat": 3 },
        { "itemName": "Bhel Puri (1 plate)", "calories": 320, "protein": 7, "carbs": 60, "fat": 7 },
        { "itemName": "Pani Puri (6 pieces)", "calories": 200, "protein": 4, "carbs": 35, "fat": 5 },
        { "itemName": "Aloo Tikki Chaat (1 plate)", "calories": 350, "protein": 6, "carbs": 50, "fat": 14 },
        { "itemName": "Kachori (1 piece)", "calories": 190, "protein": 3, "carbs": 20, "fat": 11 },
        { "itemName": "Vegetable Pakora (4 pieces)", "calories": 200, "protein": 4, "carbs": 18, "fat": 13 },
        { "itemName": "Khandvi (4 pieces)", "calories": 180, "protein": 7, "carbs": 15, "fat": 10 },
        { "itemName": "Roasted Makhana (1 bowl)", "calories": 150, "protein": 5, "carbs": 30, "fat": 1 }
    ]
  },
   {
    name: "Healthy & Diet Foods",
    description: "A comprehensive list of nutrient-dense foods for various diet goals.",
    menu: [
      // Proteins
      { itemName: "Chicken Breast (100g, boneless)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { itemName: "Egg (1 large, boiled)", calories: 78, protein: 6, carbs: 0.6, fat: 5 },
      { itemName: "Paneer (100g)", calories: 265, protein: 18, carbs: 6, fat: 21 },
      { itemName: "Greek Yogurt (1 cup)", calories: 100, protein: 17, carbs: 6, fat: 0 },
      { itemName: "Soya Chunks (50g, dry)", calories: 175, protein: 26, carbs: 15, fat: 0.5 },
      { itemName: "Fish (Salmon, 100g)", calories: 208, protein: 20, carbs: 0, fat: 13 },
      { itemName: "Tofu (100g)", calories: 76, protein: 8, carbs: 2, fat: 5 },
      { itemName: "Lentils (Moong Dal, 1 cup cooked)", calories: 212, protein: 14, carbs: 38, fat: 1 },
      { itemName: "Whey Protein (1 scoop)", calories: 120, protein: 24, carbs: 3, fat: 1 },
      { itemName: "Chickpeas (1 cup cooked)", calories: 269, protein: 15, carbs: 45, fat: 4 },
      { itemName: "Kidney Beans (Rajma, 1 cup cooked)", calories: 225, protein: 15, carbs: 40, fat: 1 },

      // Vegetables
      { itemName: "Spinach (Palak, 1 cup)", calories: 7, protein: 1, carbs: 1, fat: 0.1 },
      { itemName: "Cauliflower (1 cup)", calories: 27, protein: 2, carbs: 5, fat: 0.3 },
      { itemName: "Broccoli (1 cup)", calories: 55, protein: 4, carbs: 11, fat: 0.6 },
      { itemName: "Mushroom (1 cup)", calories: 21, protein: 3, carbs: 3, fat: 0.3 },
      { itemName: "Bell Pepper (Capsicum, 1 medium)", calories: 30, protein: 1, carbs: 7, fat: 0.3 },
      { itemName: "Zucchini (1 cup)", calories: 21, protein: 1.5, carbs: 4, fat: 0.4 },
      
      // Healthy Fats
      { itemName: "Avocado (half)", calories: 160, protein: 2, carbs: 9, fat: 15 },
      { itemName: "Olive Oil (1 tbsp)", calories: 119, protein: 0, carbs: 0, fat: 14 },
      { itemName: "Ghee (1 tbsp)", calories: 112, protein: 0, carbs: 0, fat: 13 },
      { itemName: "Almonds (20 pieces)", calories: 164, protein: 6, carbs: 6, fat: 14 },
      { itemName: "Walnuts (7 whole)", calories: 185, protein: 4, carbs: 4, fat: 18 },
      { itemName: "Peanut Butter (2 tbsp)", calories: 190, protein: 7, carbs: 8, fat: 16 },
      
      // Grains & Seeds (Fiber)
      { itemName: "Oats (1/2 cup, dry)", calories: 307, protein: 13, carbs: 55, fat: 5 },
      { itemName: "Chia Seeds (2 tbsp)", calories: 138, protein: 5, carbs: 12, fat: 9 },
      { itemName: "Flax Seeds (2 tbsp)", calories: 110, protein: 4, carbs: 6, fat: 8 },
      { itemName: "Pumpkin Seeds (1/4 cup)", calories: 180, protein: 10, carbs: 4, fat: 16 },

      // Fruits (Fiber)
      { itemName: "Apple (1 medium)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
      { itemName: "Guava (1 fruit)", calories: 37, protein: 1.4, carbs: 8, fat: 0.5 },
    ]
  },
   {
    name: "Healthy Desserts",
    description: "Healthier dessert options to satisfy your sweet cravings.",
    menu: [
      // Fruit-Based
      { itemName: "Fruit Salad (1 bowl)", calories: 120, protein: 1, carbs: 30, fat: 0.5 },
      { itemName: "Apple with Peanut Butter (1 apple, 1 tbsp PB)", calories: 190, protein: 4, carbs: 28, fat: 8 },
      { itemName: "Grilled Pineapple (2 slices)", calories: 80, protein: 1, carbs: 21, fat: 0.2 },
      { itemName: "Baked Apple with Cinnamon", calories: 100, protein: 0.3, carbs: 27, fat: 0.2 },

      // Yogurt-Based
      { itemName: "Greek Yogurt with Berries (1 cup)", calories: 150, protein: 18, carbs: 15, fat: 2 },
      { itemName: "Shrikhand (with Greek yogurt, no sugar)", calories: 140, protein: 15, carbs: 10, fat: 4 },
      { itemName: "Yogurt Parfait (with fruits & nuts)", calories: 250, protein: 20, carbs: 25, fat: 8 },
      { itemName: "Bhapa Doi (Steamed Yogurt, with jaggery)", calories: 180, protein: 9, carbs: 20, fat: 7 },

      // Indian Sweets (Healthier Versions)
      { itemName: "Date and Nut Ladoo (1 piece)", calories: 90, protein: 2, carbs: 12, fat: 4 },
      { itemName: "Besan Ladoo (1 piece, with jaggery)", calories: 150, protein: 4, carbs: 18, fat: 7 },
      { itemName: "Makhana Kheer (1 bowl, with jaggery)", calories: 180, protein: 6, carbs: 25, fat: 6 },
      { itemName: "Gajar ka Halwa (1 small bowl, with jaggery)", calories: 220, protein: 4, carbs: 30, fat: 9 },
      { itemName: "Lauki ka Halwa (1 small bowl, with jaggery)", calories: 160, protein: 3, carbs: 22, fat: 7 },
      
      // Other Options
      { itemName: "Chia Seed Pudding (1 bowl)", calories: 200, protein: 6, carbs: 25, fat: 9 },
      { itemName: "Dark Chocolate (2 squares, 70%+)", calories: 120, protein: 2, carbs: 8, fat: 9 },
      { itemName: "Avocado Chocolate Mousse (1 small bowl)", calories: 250, protein: 4, carbs: 20, fat: 18 },
    ]
  },
  {
    name: "Grains and Cereals",
    description: "Nutritional values per 100g of raw food.",
    menu: [
         { "itemName": "White Rice", "calories": 365, "protein": 7.1, "carbs": 80, "fat": 0.7 },
        { "itemName": "Brown Rice", "calories": 370, "protein": 7.9, "carbs": 77, "fat": 2.9 },
        { "itemName": "Basmati Rice", "calories": 356, "protein": 8.2, "carbs": 78, "fat": 0.8 },
        { "itemName": "Red Rice", "calories": 405, "protein": 7.0, "carbs": 86, "fat": 2.2 },
        { "itemName": "Wheat Flour (Atta)", "calories": 364, "protein": 13, "carbs": 76, "fat": 1.5 },
        { "itemName": "Oats", "calories": 389, "protein": 17, "carbs": 66, "fat": 7 },
        { "itemName": "Quinoa", "calories": 368, "protein": 14, "carbs": 64, "fat": 6 },
        { "itemName": "Barley (Jau)", "calories": 354, "protein": 12, "carbs": 73, "fat": 2.3 },
        { "itemName": "Millet (Bajra)", "calories": 378, "protein": 11, "carbs": 73, "fat": 4.2 },
        { "itemName": "Sorghum (Jowar)", "calories": 339, "protein": 11, "carbs": 75, "fat": 3.3 },
        { "itemName": "Semolina (Suji/Rava)", "calories": 360, "protein": 13, "carbs": 73, "fat": 1 }
    ]
  },
{
    name: "Nagpur Famous Foods",
    description: "Iconic street foods, and local favourites of Nagpur.",
    menu: [
      // Mullaji Biryani
       { itemName: "Chicken Dum Biryani", calories: 480, protein: 25, carbs: 55, fat: 18 },
      { itemName: "Mutton Dum Biryani", calories: 550, protein: 28, carbs: 52, fat: 22 },
      { itemName: "Egg Biryani (2 eggs)", calories: 430, protein: 18, carbs: 55, fat: 15 },
      { itemName: "Hyderabadi Chicken Biryani", calories: 520, protein: 26, carbs: 60, fat: 20 },
      { itemName: "Lucknowi Mutton Biryani", calories: 580, protein: 30, carbs: 58, fat: 24 },
      { itemName: "Vegetable Biryani", calories: 350, protein: 8, carbs: 60, fat: 9 },
      { itemName: "Paneer Biryani", calories: 420, protein: 15, carbs: 62, fat: 14 },
      { itemName: "Vegetable Pulao", calories: 290, protein: 6, carbs: 55, fat: 4 },
   
{ itemName: "Oreo Shake (300ml)", calories: 420, protein: 6, carbs: 65, fat: 15 },
      { itemName: "KitKat Shake (300ml)", calories: 450, protein: 7, carbs: 68, fat: 16 },
      { itemName: "Cold Coffee (300ml)", calories: 180, protein: 4, carbs: 28, fat: 5 },
      { itemName: "Belgian Chocolate Shake (300ml)", calories: 480, protein: 8, carbs: 70, fat: 18 },
      { itemName: "Brownie Shake (300ml)", calories: 520, protein: 9, carbs: 75, fat: 20 },
      { itemName: "Mango Shake (Seasonal, 300ml)", calories: 280, protein: 5, carbs: 55, fat: 4 },
      { itemName: "Strawberry Shake (300ml)", calories: 260, protein: 5, carbs: 50, fat: 3 },
      { itemName: "Banana Shake (300ml)", calories: 300, protein: 6, carbs: 58, fat: 5 },
      { itemName: "Choco Hazelnut Shake (300ml)", calories: 490, protein: 8, carbs: 72, fat: 19 },
      
      // Nagpur Street Food
      { itemName: "Tarri Poha (1 plate)", calories: 280, protein: 7, carbs: 50, fat: 6 },
      { itemName: "Misal Pav (1 plate)", calories: 400, protein: 12, carbs: 55, fat: 14 },
      { itemName: "Patodi Rassa (1 serving)", calories: 350, protein: 10, carbs: 40, fat: 12 },
      { itemName: "Matka Biryani (1 pot, veg)", calories: 600, protein: 15, carbs: 90, fat: 18 },
      { itemName: "Bhutte ka Kees (1 plate)", calories: 220, protein: 6, carbs: 40, fat: 5 },
      { itemName: "Pav Bhaji (1 plate)", calories: 450, protein: 10, carbs: 65, fat: 16 },
      { itemName: "Bhel Puri (1 plate)", calories: 180, protein: 5, carbs: 35, fat: 4 },
      { itemName: "Pani Puri (6 pcs)", calories: 150, protein: 3, carbs: 30, fat: 2 },
      { itemName: "Dabeli (1 piece)", calories: 320, protein: 7, carbs: 42, fat: 12 },
      { itemName: "Saoji Chicken Curry (1 plate, with roti)", calories: 600, protein: 35, carbs: 40, fat: 28 },
      { itemName: "Orange Barfi (Santra Barfi, 2 pcs)", calories: 250, protein: 5, carbs: 45, fat: 7 },
      { itemName: "Basundi (1 small bowl)", calories: 280, protein: 8, carbs: 35, fat: 12 },
      { itemName: "Soan Papdi (50g)", calories: 200, protein: 3, carbs: 28, fat: 8 }
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