// 🔸 ตั้งค่าชื่อ bucket (ของท่านเอง)
const bucket = "thaifoodguide-f109f.firebasestorage.app";

// 🔸 Northern menu
const northernMenu = [
  "Khao-Soi",
  "Nam-Ngiao",
  "Sai-Ua",
  "Khaep-Moo",
  "Larb-Kua",
  "Nam-Prik-Noom",
  "Nam-Prik-Ong",
  "Jin-Som",
  "Jin-Ping",
  "Gaeng-Hung-Lay",
  "Gaeng-Ho",
  "Kanom-Jeen-Nam-Ngiao",
  "Tom-Saep-Nuea",
  "Kai-Pam",
  "Moo-Tod-Chiang-Mai",
  "Khao-Lam",
  "Gaeng-Khanun",
  "Khao-Niew-Gai-Tod",
  "Het-Thop-Tom",
  "Khao-Ram-Fuen"
];

// 🔸 Central menu
const centralMenu = [
  "Pad-Thai",
  "Tom-Yum-Goong",
  "Gaeng-Khiao-Wan",
  "Gaeng-Massaman",
  "Khao-Man-Gai",
  "Khao-Kha-Moo",
  "Khao-Moo-Daeng",
  "Kuai-Tiao-Ruea",
  "Kuai-Tiao-Tom-Yum",
  "Kanom-Jeen-Gaeng-Khiao-Wan",
  "Tod-Mun-Goong",
  "Khao-Pad-Poo",
  "Por-Pia-Tod",
  "Pla-Kapong-Tod-Nam-Pla",
  "Khao-Kluk-Kapi",
  "Suki-Haeng",
  "Moo-Satay",
  "Kai-Jiew-Moo-Sap",
  "Gaeng-Pa",
  "Khao-Rad-Na-Gai"
];

// 🔸 Northeastern menu
const northeasternMenu = [
  "Som-Tam",
  "Larb-Moo",
  "Nam-Tok-Moo",
  "Gai-Yang",
  "Khao-Niew",
  "Tom-Saep-Kradook-On",
  "Jaew-Bong",
  "Moo-Dad-Deaw",
  "Nuea-Dad-Deaw",
  "Khao-Jee",
  "Sai-Krok-Isan",
  "Soup-Nor-Mai",
  "Khai-Mod-Daeng",
  "Mok-Hed",
  "Pla-Duk-Yang",
  "Gaeng-Nor-Mai",
  "Tab-Waan",
  "Tam-Thaad",
  "Jaew-Hon",
  "Kai-Jiew-Ton-Hom"
];

// 🔸 Southern menu
const southernMenu = [
  "Gaeng-Leuang",
  "Kua-Kling",
  "Sataw-Pad-Kapi-Goong",
  "Moo-Hong",
  "Khao-Yam-Pak-Tai",
  "Gaeng-Tai-Pla",
  "Hor-Mok-Talay",
  "Kanom-Jeen-Nam-Ya-Tai",
  "Gai-Tom-Khamin",
  "Tom-Som-Pla",
  "Gaeng-Bai-Liang-Sai-Khai",
  "Khao-Mok-Gai-Muslim-Tai",
  "Roti-Gaeng",
  "Pla-Tod-Khamin",
  "Pad-Phed-Talay",
  "Look-Chin-Yang-Phang-Nga",
  "Nam-Prik-Goong-Siab",
  "Tod-Mun-Pla",
  "Sataw-Pad-Kapi-Moo-Sap",
  "Mee-Hoon-Gaeng-Poo"
];

// 🔸 รวมเป็น regions
const regions = [
  { name: "northern", menu: northernMenu },
  { name: "central", menu: centralMenu },
  { name: "northeastern", menu: northeasternMenu },
  { name: "southern", menu: southernMenu }
];

// 🔸 เริ่ม generate
for (const region of regions) {
  console.log(`\n===== Region: ${region.name} =====`);

  // --- Main URLs ---
  console.log(`\n--- Main URLs ---`);
  region.menu.forEach((menuName, index) => {
    const number = (index + 1).toString().padStart(2, '0');
    const mainUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${region.name}%2F${number}-${menuName}-main.jpg?alt=media`;
    console.log(`${mainUrl}`);
  });

  // --- Thumb URLs ---
  console.log(`\n--- Thumb URLs ---`);
  region.menu.forEach((menuName, index) => {
    const number = (index + 1).toString().padStart(2, '0');
    const thumbUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${region.name}%2F${number}-${menuName}-thumb.jpg?alt=media`;
    console.log(`${thumbUrl}`);
  });
}
