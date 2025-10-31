const mongoose = require("mongoose");

// Your MongoDB connection string
const MONGO_URI =
  "mongodb+srv://sahusanjeet42_db_user:GUX3JInWLMJkTS4u@cluster0.ktulviv.mongodb.net/?appName=Cluster0";

// 1. Category Schema and Model (from your prompt)
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});
const Category = mongoose.model("Category", categorySchema);

// 2. Menu Item Schema and Model (from your prompt)
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  // PRICE IS SET AS STRING HERE to accept inputs like "$12.99"
  price: { type: String, required: true },
  category: { type: String, required: true }, // Stores the category name
});
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// --- Data to Insert ---

const categoriesToInsert = [
  { name: "Chaumein" },
  { name: "Rice" },
  { name: "Roll" },
  { name: "Momos" },
  { name: "Soup" },
  { name: "Tandoor" },
  { name: "Chilli" },
  { name: "Chopsy" },
  { name: "Special" },
  { name: "Biryani" },
];

const menuItemsToInsert = [
  // Chaumein
  { name: "Veg Chaumein", price: "Half-30 Full-60", category: "Chaumein" },
  { name: "Egg Chaumein", price: "Half-40 Full-80", category: "Chaumein" },
  {
    name: "Mix Chicken Chaumein",
    price: "Half-60 Full-120",
    category: "Chaumein",
  },
  {
    name: "Boneless Chicken Chaumein",
    price: "Half-70 Full-140",
    category: "Chaumein",
  },
  {
    name: "Liver pot Chaumein",
    price: "Half-70 Full-140",
    category: "Chaumein",
  },

  // Rice
  { name: "Veg Rice", price: "Half-40 Full-80", category: "Rice" },
  { name: "Egg Rice", price: "Half-50 Full-100", category: "Rice" },
  { name: "Mine Chicken Rice", price: "Half-40 Full-80", category: "Rice" },
  { name: "Boneless Chicken Rice", price: "Half-40 Full-80", category: "Rice" },
  { name: "Liverpot Chicken Rice", price: "Half-40 Full-80", category: "Rice" },

  // Roll
  { name: "Single Egg Roll", price: "30/pc", category: "Roll" },
  { name: "Double Egg Roll", price: "40/pc", category: "Roll" },
  { name: "Chicken Egg Roll", price: "60/pc", category: "Roll" },
  { name: "Paneer Roll", price: "60/pc", category: "Roll" },
  { name: "Sahi Egg Roll Single Egg", price: "40/pc", category: "Roll" },
  { name: "Sahi Egg Roll Double Egg", price: "50/pc", category: "Roll" },
  { name: "Sahi Chicken Roll", price: "70/pc", category: "Roll" },
  { name: "Sahi Paneer Roll", price: "70/pc", category: "Roll" },
  { name: "Veg Spring Roll", price: "40/pc", category: "Roll" },
  { name: "Chicken Spring Roll", price: "60/pc", category: "Roll" },

  // Momos
  { name: "Veg Momos", price: "Half-30 Full-60", category: "Momos" },
  { name: "Chicken Momos", price: "Half-40 Full-80", category: "Momos" },
  { name: "Paneer Momos", price: "Half-40 Full-80", category: "Momos" },

  // Soup
  { name: "Chicken Soup", price: "50", category: "Soup" },
  { name: "Chicken Hot n Soup", price: "60", category: "Soup" },
  { name: "Chicken Special Soup", price: "90", category: "Soup" },
  { name: "Chicken Clear Soup", price: "70", category: "Soup" },
  { name: "Chicken Lungfung Soup", price: "80", category: "Soup" },
  { name: "Veg Tomato Soup", price: "70", category: "Soup" },
  { name: "Veg Manchow Soup", price: "50", category: "Soup" },
  { name: "Veg Hot n Sour Soup", price: "60", category: "Soup" },
  { name: "Veg Special Soup", price: "70", category: "Soup" },
  { name: "Veg Clear Soup", price: "50", category: "Soup" },
  { name: "Veg Lungfung Soup", price: "60", category: "Soup" },

  // Tandoor
  { name: "Chicken Tandoori", price: "Half-150 Full-300", category: "Tandoor" },
  {
    name: "Chicken Tikka Tandoori",
    price: "Half-150 Full-300",
    category: "Tandoor",
  },
  {
    name: "Paneer Tikka Tandoori",
    price: "Half-150 Full-300",
    category: "Tandoor",
  },
  {
    name: "Chicken Seekh Kabab Tandoori",
    price: "Half-200 Full-400",
    category: "Tandoor",
  },
  {
    name: "Chicken Kaali Mirch Tandoori",
    price: "Half-300 Full-600",
    category: "Tandoor",
  },
  {
    name: "Chicken Tandoori Kabab",
    price: "Half-400 Full-800",
    category: "Tandoor",
  },
  {
    name: "Chicken Pahadi Kabab",
    price: "Half-250 Full-500",
    category: "Tandoor",
  },
  {
    name: "Chicken Kaali Mirch Kabab",
    price: "Half-250 Full-500",
    category: "Tandoor",
  },

  // Chilli
  { name: "Veg ManChurian Dry", price: "Half-50 Full-100", category: "Chilli" },
  {
    name: "Veg ManChurian Gravy Dry",
    price: "Half-60 Full-120",
    category: "Chilli",
  },
  {
    name: "Chicken Chilli Bone Dry",
    price: "Half-60 Full-120",
    category: "Chilli",
  },
  {
    name: "Chicken Chilli Bone Gravy",
    price: "Half-70 Full-140",
    category: "Chilli",
  },
  {
    name: "Chicken Chilli Boneless Dry",
    price: "Half-70 Full-140",
    category: "Chilli",
  },
  {
    name: "Chicken Chilli Boneless Gravy",
    price: "Half-80 Full-160",
    category: "Chilli",
  },
  {
    name: "Chicken Lollipop Dry",
    price: "Half-80 Full-160",
    category: "Chilli",
  },
  {
    name: "Chicken Lollipop Gravy",
    price: "Half-90 Full-180",
    category: "Chilli",
  },
  { name: "Chicken Crispy", price: "Half-90 Full-180", category: "Chilli" },
  { name: "Chicken Hot Garlic", price: "Half-90 Full-180", category: "Chilli" },
  { name: "Chicken Sorte", price: "Half-90 Full-180", category: "Chilli" },
  { name: "Chicken Helmet", price: "Half-90 Full-180", category: "Chilli" },
  { name: "Paneer Chilli Dry", price: "Half-70 Full-140", category: "Chilli" },
  {
    name: "Paneer Chilli Gravy",
    price: "Half-80 Full-160",
    category: "Chilli",
  },

  // Chopsy
  { name: "Veg Chopsy", price: "Half-50 Full-100", category: "Chopsy" },
  { name: "Chicken Chopsy", price: "Half-90 Full-180", category: "Chopsy" },
  { name: "Chicken Salad", price: "Half-90 Full-180", category: "Chopsy" },
  { name: "Veg Bhel", price: "Half-50 Full-100", category: "Chopsy" },
  { name: "Chicken Bhel", price: "Half-60 Full-120", category: "Chopsy" },

  // Special
  {
    name: "Hot n Spicy Special Helmet",
    price: "Half-200 Full-400",
    category: "Special",
  },
  {
    name: "Chicken Tripple Chaumein",
    price: "Half-150 Full-300",
    category: "Special",
  },
  {
    name: "Chicken Tripple Rice",
    price: "Half-150 Full-300",
    category: "Special",
  },
  {
    name: "Veg Tripple Chaumein",
    price: "Half-150 Full-300",
    category: "Special",
  },
  { name: "Veg Tripple Rice", price: "Half-150 Full-300", category: "Special" },
  {
    name: "Chicken Hongkong Chaumein",
    price: "Half-90 Full-180",
    category: "Special",
  },
  {
    name: "Chicken Hongkong Rice",
    price: "Half-90 Full-180",
    category: "Special",
  },
  {
    name: "Chicken Singapuri Chaumein",
    price: "Half-90 Full-180",
    category: "Special",
  },
  {
    name: "Chicken Singapuri Rice",
    price: "Half-90 Full-180",
    category: "Special",
  },
  {
    name: "Chicken Mancturian Chaumein",
    price: "Half-70 Full-140",
    category: "Special",
  },
  {
    name: "Chicken Mancturian Rice",
    price: "Half-70 Full-140",
    category: "Special",
  },
  { name: "Chicken Dragon", price: "Half-70 Full-140", category: "Special" },

  // Biryani
  { name: "Veg Dam Biryani", price: "Half-90 Full-180", category: "Biryani" },
  {
    name: "Chicken Dam Birayani",
    price: "Half-90 Full-180",
    category: "Biryani",
  },
];

// --- Main Function to Handle DB Operations ---

async function replaceAllData() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // You may need to add this for the new Mongoose version
      // family: 4,
    });
    console.log("✅ Connected to MongoDB successfully.");

    // 2. Delete ALL existing data from both collections
    console.log("🗑️ Deleting all existing data...");
    const deleteCategoriesResult = await Category.deleteMany({});
    const deleteMenuItemsResult = await MenuItem.deleteMany({});

    console.log(
      `   - Deleted ${deleteCategoriesResult.deletedCount} categories.`
    );
    console.log(
      `   - Deleted ${deleteMenuItemsResult.deletedCount} menu items.`
    );

    // 3. Insert NEW data into both collections
    console.log("➕ Inserting new data...");
    const insertedCategories = await Category.insertMany(categoriesToInsert);
    const insertedMenuItems = await MenuItem.insertMany(menuItemsToInsert);

    console.log(`   - Inserted ${insertedCategories.length} new categories.`);
    console.log(`   - Inserted ${insertedMenuItems.length} new menu items.`);

    console.log("🎉 Data replacement complete!");
  } catch (error) {
    console.error("❌ An error occurred:", error.message);
  } finally {
    // 4. Close the connection
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB.");
  }
}

replaceAllData();
