// 1️⃣ import modules
const admin = require("firebase-admin");
const fs = require("fs");

// 2️⃣ initialize firebase-admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 3️⃣ read northern.json
const data = JSON.parse(fs.readFileSync("./Northeastern.json", "utf8"));

// 4️⃣ upload to firestore
async function uploadNorthern() {
  try {
    const docRef = db.collection("thai_food_guide").doc("northeastern");

    // ใช้ field: menus → ใส่ array ทั้งชุด
    await docRef.set({
      menus: data
    });

    console.log("✅ Upload northern.json → Firestore DONE!");
  } catch (error) {
    console.error("❌ Error uploading northern.json:", error);
  }
}

// 5️⃣ run function
uploadNorthern();
