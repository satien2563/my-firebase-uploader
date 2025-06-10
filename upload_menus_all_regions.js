// 1️⃣ import modules
const admin = require("firebase-admin");
const fs = require("fs");

// 2️⃣ initialize firebase-admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 3️⃣ prepare regions + file names
const uploads = [
  { region: "northern", file: "./Nornthern-Final.json" },
  { region: "central", file: "./Central-Final.json" },
  { region: "northeastern", file: "./Isan-Final.json" },
  { region: "southern", file: "./Southern-Final.json" }
];

// 4️⃣ upload function
async function uploadMenus(region, fileName) {
  try {
    console.log(`\n🚀 Start uploading → ${region} → ${fileName}`);

    const data = JSON.parse(fs.readFileSync(fileName, "utf8"));
    const docRef = db.collection("thai_food_guide").doc(region);

    await docRef.set({
      menus: data
    });

    console.log(`✅ Upload DONE → Region: ${region} → File: ${fileName}`);
  } catch (error) {
    console.error(`❌ Error uploading ${fileName} to region ${region}:`, error);
  }
}

// 5️⃣ run all uploads
async function uploadAll() {
  for (const upload of uploads) {
    await uploadMenus(upload.region, upload.file);
  }

  console.log(`\n🎉 All uploads completed!`);
}

// 6️⃣ start process
uploadAll();
