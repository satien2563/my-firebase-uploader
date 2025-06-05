const regions = ["central", "northern", "northeastern", "southern"];
const dishesPerRegion = 20; // ท่านมี 20 เมนูต่อภาค

const bucket = "thaifoodguide-f109f.firebasestorage.app"; // ของท่านเอง ✅

for (const region of regions) {
  console.log(`\n===== Region: ${region} =====`);

  for (let i = 1; i <= dishesPerRegion; i++) {
    const number = i.toString().padStart(2, '0'); // 01, 02, ...

    // Generate URL
    const mainUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${region}%2F${number}-main.jpg?alt=media`;
    const thumbUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${region}%2F${number}-thumb.jpg?alt=media`;

    // Print Text (Copy to Excel)
    console.log(`Dish ${number} Main URL: ${mainUrl}`);
    console.log(`Dish ${number} Thumb URL: ${thumbUrl}`);
  }
}
