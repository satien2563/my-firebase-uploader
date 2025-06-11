const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "./Images/Input_Central/";
const outputMainFolder = "./Images/Output_Central/Main/";
const outputThumbFolder = "./Images/Output_Central/Thumb/";

// Ensure output folders exist
[outputMainFolder, outputThumbFolder].forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

// Target sizes
const mainWidth = 1200;
const mainHeight = 800;

const thumbWidth = 640;
const thumbHeight = 426;

// Process images
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error("❌ Error reading input folder:", err);
    return;
  }

  if (files.length === 0) {
    console.log("⚠️ No images found in input folder.");
    return;
  }

  console.log(`🚀 Found ${files.length} image(s). Start processing...`);

  files.forEach((file, index) => {
    const inputPath = path.join(inputFolder, file);
    const fileNameWithoutExt = path.parse(file).name;
    const ext = path.parse(file).ext; // keep .jpg or .jpeg

    // Main image → -main.jpg
    const mainOutputPath = path.join(outputMainFolder, `${fileNameWithoutExt}-main${ext}`);
    sharp(inputPath)
      .resize(mainWidth, mainHeight, { fit: "cover" })
      .jpeg({ quality: 80 })
      .toFile(mainOutputPath)
      .then(() => {
        console.log(`✅ [${index + 1}/${files.length}] Main → ${path.basename(mainOutputPath)}`);
      })
      .catch(err => {
        console.error(`❌ Error resizing Main for ${file}:`, err);
      });

    // Thumb image → -thumb.jpg
    const thumbOutputPath = path.join(outputThumbFolder, `${fileNameWithoutExt}-thumb${ext}`);
    sharp(inputPath)
      .resize(thumbWidth, thumbHeight, { fit: "cover" })
      .jpeg({ quality: 80 })
      .toFile(thumbOutputPath)
      .then(() => {
        console.log(`✅ [${index + 1}/${files.length}] Thumb → ${path.basename(thumbOutputPath)}`);
      })
      .catch(err => {
        console.error(`❌ Error resizing Thumb for ${file}:`, err);
      });
  });
});