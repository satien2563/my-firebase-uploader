const { google } = require("googleapis");
const axios = require("axios");

const key = require("./serviceAccountKey.json");

const SCOPES = ["https://www.googleapis.com/auth/devstorage.read_only"];

async function getAccessToken() {
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES
  );

  await jwtClient.authorize();
  const tokens = await jwtClient.getAccessToken();
  return tokens.token;
}

async function listFilesInRegion(region, accessToken) {
  console.log(`\n📂 Region: ${region}`);

  const bucketName = "thaifoodguide-f109f.appspot.com"; // ใช้ได้กับ REST API แน่นอน
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o?prefix=${region}/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      console.log(`⚠️ No files found in region: ${region}`);
      return;
    }

    response.data.items.forEach(item => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(item.name)}?alt=media`;
      console.log(`✅ ${item.name} → ${publicUrl}`);
    });

  } catch (error) {
    console.error(`❌ Error fetching files for region ${region}:`, error.response?.data?.error || error.message);
  }
}

async function main() {
  console.log("🚀 Start generating Public URLs (via REST API)...");

  const accessToken = await getAccessToken();

  const regions = ["central", "northern", "northeastern", "southern"];

  for (const region of regions) {
    await listFilesInRegion(region, accessToken);
  }

  console.log("\n✅ Done! All Public URLs generated.");
}

main().catch(err => {
  console.error("❌ Fatal Error:", err);
});
