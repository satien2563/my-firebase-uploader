const admin = require("firebase-admin");
const fs = require("fs");

// Initialize firebase-admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Function to update a menu item
async function updateMenuItem({
  dishNameEn,        // ex: "Khao Soi"
  newImageMainUrl,   // ex: "https://new-url.com/khao-soi-main.jpg"
  newImageDetailUrl, // ex: "https://new-url.com/khao-soi-detail.jpg"
  newRecommend       // ex: true or false
}) {
  try {
    const docRef = db.collection("thai_food_guide").doc("northern");

    // Read current data
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log("❌ Document does not exist.");
      return;
    }

    let menus = docSnap.data().menus;

    // Update the target menu item
    let updated = false;
    menus = menus.map(menu => {
      if (menu["Dish (en)"] === dishNameEn) {
        console.log(`🎯 Found: ${menu["Dish (en)"]}, updating...`);
        if (newImageMainUrl) menu["Image Main URL"] = newImageMainUrl;
        if (newImageDetailUrl) menu["Image Detail URL"] = newImageDetailUrl;
        if (typeof newRecommend === "boolean") menu["Recommend"] = newRecommend;
        updated = true;
      }
      return menu;
    });

    if (!updated) {
      console.log(`⚠️ Menu item "${dishNameEn}" not found.`);
      return;
    }

    // Save updated array back to Firestore
    await docRef.set({ menus });

    console.log("✅ Update DONE!");
  } catch (error) {
    console.error("❌ Error updating menu item:", error);
  }
}

// Example usage:
updateMenuItem({
  dishNameEn: "Khao Soi",
  newImageMainUrl: "https://new-url.com/khao-soi-main.jpg",
  newImageDetailUrl: "https://new-url.com/khao-soi-detail.jpg",
  newRecommend: true
});
