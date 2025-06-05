// ใช้ Firebase Admin SDK
const admin = require("firebase-admin");

// Init Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
  storageBucket: "thaifoodguide-f109f.appspot.com", // ใช้ชื่อ bucket ของท่าน
});

const bucket = admin.storage().bucket();

// ภาคต่าง ๆ ที่ต้องการอ่าน
const regions = ["central", "northern", "northeastern", "southern"];

async function listFilesInRegion(region) {
  console.log(`\n📂 Region: ${region}`);

  const [files] = await bucket.getFiles({ prefix: `${region}/` });

  if (files.length === 0) {
    console.log(`⚠️ No files found in region: ${region}`);
    return;
  }

  files.forEach(file => {
    // ✅ Generate Public URL → ใช้แบบ firebasestorage.app
    const publicUrl = `https://thaifoodguide-f109f.firebasestorage.app/${file.name}`;
    console.log(`✅ ${file.name} → ${publicUrl}`);
  });
}

async function main() {
  console.log("🚀 Start generating Public URLs (via Firebase Admin SDK)...");

  for (const region of regions) {
    await listFilesInRegion(region);
  }

  console.log("\n✅ Done! All Public URLs generated.");
}

main().catch(err => {
  console.error("❌ Error:", err);
});

