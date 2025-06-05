const { Storage } = require("@google-cloud/storage");
const path = require("path");

// กำหนด Service Account Key (ใช้ตัวเดียวกับ Firestore ได้)
const storage = new Storage({
  keyFilename: "./serviceAccountKey.json", // เปลี่ยน path ให้ตรงกับไฟล์ของท่าน
});

const bucketName = "thaifoodguide-f109f.appspot.com"; // เปลี่ยนเป็นของท่าน
const bucket = storage.bucket(bucketName);

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
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
    console.log(`✅ ${file.name} → ${publicUrl}`);
  });
}

async function main() {
  console.log("🚀 Start generating Public URLs...");
  
  for (const region of regions) {
    await listFilesInRegion(region);
  }

  console.log("\n✅ Done! All Public URLs generated.");
}

main().catch(err => {
  console.error("❌ Error:", err);
});
