require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTANT: Replace this with your connection string provided earlier.
// Ensure your IP address is whitelisted in MongoDB Atlas.
const MONGO_URI = process.env.MONGO_URI;

// --- Middleware Setup ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// --- Mongoose Models ---

// 1. Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});
const Category = mongoose.model("Category", categorySchema);

// 2. Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" }, // PRICE IS SET AS STRING HERE to accept inputs like "$12.99"
  price: { type: String, required: true },
  category: { type: String, required: true }, // Stores the category name
});
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// --- Database Connection ---
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connection successful."); // Start server ONLY after successful DB connection

    app.listen(PORT, () => {
      console.log(`Restaurant app listening at http://localhost:${PORT}`);
      console.log(`Admin panel available at http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Make sure your IP address is whitelisted in MongoDB Atlas!");
    process.exit(1);
  }
}

// --- Helper function to group menu items by category ---
const groupMenuItems = (items) => {
  return items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
};

// --- Routes ---

// GET / - Home Page (Display Menu)
app.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find({});
    const menu = groupMenuItems(items);

    res.render("index", { menu: menu, error: null });
  } catch (error) {
    console.error("Error fetching menu:", error.message);
    res.render("index", {
      menu: {},
      error: "Could not load menu. Database connection issue.",
    });
  }
});

// GET /admin - Admin Page (Displays forms)
app.get("/admin", async (req, res) => {
  try {
    // Fetch all categories to populate the dropdown
    const categories = await Category.find({}).sort({ name: 1 });
    // Fetch all menu items to display for deletion/editing
    const items = await MenuItem.find({}).sort({ category: 1, name: 1 });
    const menu = groupMenuItems(items); // Pass the message from the query string to the template

    res.render("admin", {
      categories: categories,
      menu: menu, // Pass grouped menu items to admin
      message: req.query.message || null,
    });
  } catch (error) {
    console.error("Error fetching data for admin:", error.message);
    res.render("admin", {
      categories: [],
      menu: {},
      message: "Database error loading data for admin panel.",
    });
  }
});

// POST /admin/category - Add a new Category
app.post("/admin/category", async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.redirect("/admin?message=Category name is required.");
  }
  try {
    const newCategory = new Category({ name: categoryName.trim() });
    await newCategory.save();
    res.redirect("/admin?message=Category added successfully!");
  } catch (error) {
    let message = "Error adding category.";
    if (error.code === 11000) {
      message = `Category "${categoryName}" already exists.`;
    }
    res.redirect(`/admin?message=${encodeURIComponent(message)}`);
  }
});

// POST /admin/item - Add a new Menu Item
app.post("/admin/item", async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !price || !category) {
    return res.redirect(
      "/admin?message=Name, price, and category are required."
    );
  }

  try {
    const newItem = new MenuItem({
      name: name.trim(),
      description: description.trim(), // Price is stored as a string
      price: price.trim(),
      category: category.trim(),
    });
    await newItem.save();
    res.redirect("/admin?message=Menu item added successfully!");
  } catch (error) {
    console.error("Error adding menu item:", error.message);
    res.redirect(
      `/admin?message=${encodeURIComponent(
        "Error adding menu item. Please check all fields."
      )}`
    );
  }
});

// 1. POST /admin/item/delete - Delete a single Menu Item
app.post("/admin/item/delete", async (req, res) => {
  // We use the item's MongoDB _id to uniquely identify it for deletion
  const { itemId } = req.body;

  if (!itemId) {
    return res.redirect("/admin?message=Menu item ID is missing.");
  }

  try {
    const result = await MenuItem.findByIdAndDelete(itemId);

    if (result) {
      res.redirect("/admin?message=Menu item deleted successfully!");
    } else {
      res.redirect("/admin?message=Error: Menu item not found.");
    }
  } catch (error) {
    console.error("Error deleting menu item:", error.message);
    res.redirect(
      `/admin?message=${encodeURIComponent(
        "Database error deleting menu item."
      )}`
    );
  }
});

// 2. POST /admin/category/delete - Delete a Category AND all associated Menu Items
app.post("/admin/category/delete", async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.redirect("/admin?message=Category name is missing.");
  }

  try {
    // Step 1: Delete the Category document
    const categoryResult = await Category.deleteOne({
      name: categoryName.trim(),
    });

    // Step 2: Delete all Menu Items belonging to that category
    const itemResult = await MenuItem.deleteMany({
      category: categoryName.trim(),
    });

    if (categoryResult.deletedCount === 0) {
      return res.redirect("/admin?message=Error: Category not found.");
    }

    const message = `Category '${categoryName}' and ${itemResult.deletedCount} associated item(s) deleted successfully.`;
    res.redirect(`/admin?message=${encodeURIComponent(message)}`);
  } catch (error) {
    console.error("Error deleting category and items:", error.message);
    res.redirect(
      `/admin?message=${encodeURIComponent(
        "Database error during category deletion."
      )}`
    );
  }
});

connectDB();
