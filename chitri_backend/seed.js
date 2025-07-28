// chitri_backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Your MongoDB connection function
const Painting = require('./models/Painting'); // Your Painting model

dotenv.config(); // Load environment variables from .env
connectDB(); // Connect to your MongoDB database

// Your sample painting data
// IMPORTANT: Replace the placeholder image URLs with your actual Cloudinary URLs!
const samplePaintings = [
  
  {
    _id: "66a41f2a9d20c5f2b8a7f001", // Example _id, MongoDB will generate if not provided
    name: "Mystic Shiva in Blue Bloom",
    description: "Feel the calm of divinity-Adiyogi in peaceful blue, surrounded by meditative leaves. Story Behind the Artwork :- In the silence of nature and the stillness within, this painting was born. Inspired by the eternal presence of Adiyogi, the first yogi and embodiment of peace, I envisioned him in tranquil blue, surrounded by leaves representing growth, grounding, and the rhythm of life. Each brushstroke is a quiet meditation, a tribute to the balance between divinity and the natural world. This artwork is not just a visual-it's a feeling of surrender, calm, and connection tosomething higher.",
    images: [
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546264/IMG_20250703_200202_ww5ool.jpg", 
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546285/IMG_20250703_200253_tx8fbh.jpg", 
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546263/IMG_20250703_200426_nlbzz7.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546305/IMG_20250711_131057_aqepih.jpg"
    ],
    rating: 4.5,
    size: "10x12 cm",
    shape: "Square",
    frame: "No",
    Medium: "Acrylic on canvas",
    price: 1000.00,
    offerPrice: 1.00,
    category: "Canvas Art",
    stock: 3,
    highlights: [
      "Size: 10x12 cm",
      "Medium: Acrylic on canvas",
      "Surface: Canvas Board",
      "Frame: No",
      "Finish: Matte",
      "Handmade: Yes",
      "Shape: Square",
      "Hanging Hook: Yes"
    ]
  },
  {
    _id: "66a41f2a9d20c5f2b8a7f002", // Example _id, MongoDB will generate if not provided
    name: "Shiva's Grace in Green",
    description: "Adiyogi painted in sacred green, radiating calm under the crescent moon's Watch. Story Behind the Artwork :- In the silence of early dawn, I envisioned Adiyogi not just as the destroyer of darkness, but as the heartbeat of nature itself. The green tones in this artwork reflect healing, balance, and the rhythm of the earth-echoing the energy of the Anahata, the heart chakra. The crescent moon glows gently above, while the serpent rests calmly, symbolizing control over fear and ego. With every brushstroke, I felt a connection to Shiva's boundless stillness-powerful, grounded, and deeply peaceful. This painting is a reminder that true strength lies in inner serenity.",
    images: [
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546270/IMG_20250703_200955_ibnkwv.jpg", 
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546276/IMG_20250703_200933_xflaxd.jpg", 
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546317/IMG_20250703_192731_098_mejwki.jpg"
    ],
    rating: 4.3,
    size: "12x16 cm",
    shape: "Square",
    // Medium: "Acrylic on canvas", // This field is not directly used in frontend highlights, but it's in highlights array
    price: 1200.00,
    offerPrice:  899.00,
    category: "Canvas Art",
    stock: 3,
    highlights: [
      "Size: 12x16 cm",
      "Medium: Acrylic on canvas",
      "Surface: Canvas Board",
      "Frame: No",
      "Finish: Matte",
      "Handmade: Yes",
      "Shape: Square",
      "Hanging Hook: Yes"
    ]
  },
  {
    _id: "66a41f2a9d20c5f2b8a7f003", // Example _id, MongoDB will generate if not provided
    name: "Divine Connection",
    description: "Divine Connection is a hand-painted shirt featuring Lord Ram and Sita, symbolizing pure love, faith, and strength. Surrounded by soft trees in the background, this artwork brings peace and a touch of nature to your style. Every brushstroke tells a story - painted with heart to add meaning and elegance to your wardrobe. Story Behind the Artwork :- Divine Connection - this artwork captures the eternal bond between Lord Ram and Goddess Sita, a symbol of love, strength, and dharma. Hand-painted on soft cotton, the design shows them in a serene moment, surrounded by nature - just like the forests of their exile where their love remained unshaken despite trials. The warm, earthy tones of their garments blend seamlessly with the greenery in the background, symbolizing their rootedness in values, simplicity, and grace.",
    images: [
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546323/IMG_20250711_132021_wnyuib.jpg", 
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546319/IMG_20250711_131924_aoezuf.jpg", 
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546312/IMG_20250711_131939_qlbcxm.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546326/IMG_20250711_131902_kkh43x.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546319/IMG_20250711_132111_ttmv2l.jpg"
    ],
    rating: 4.8,
    size: "Available: S, M, L, XL, XXL", // Text description for available sizes
    shape: "T-Shirt",
    material: "100% Cotton",
    price: 1200.00,
    offerPrice: 999.00,
    category: "Clothes",
    stock: 10,
    highlights: [
      "Type: Hand-painted T-Shirt",
      "Color: White (Only)",
      "Material: 100% Premium Cotton",
      "Sizes: S, M, L, XL, XXL", // This is a STRING in highlights, not the array
      "Paint Medium: Fabric-safe Acrylics",
      "Care: Gentle hand wash, iron inside out",
      "Handmade: Yes",
      "Medium: Acrylic",
      "Colour: White",
      "Unique: Each piece is individually painted"
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"], // This is the array for the dropdown
    availableColors: ["White"] // This is the array for the dropdown
  },
  // --- Resin Art ---
  {
    _id: "66a41f2a9d20c5f2b8a7f004", // Example _id, MongoDB will generate if not provided
    name: "Golden Bloom of Success",
    description: "This handcrafted resin art beautifully blends real preserved flowers, gold flakes, and a striking dual-tone design to symbolize the journey from hard work to glory. Featuring the name and title in premium golden letters, it's the perfect keepsake to honor the proud moment of becoming a CA.the perfect gift to celebrate a Chartered Accountant's journey! Whether it's your friend, family member, soulmate, or even yourself - this piece is a tribute to hard work, dedication, and dreams achieved.Crafted with real dried flowers, symbolizing the beauty of growth and the bloom of success.The black and white contrast reflects the challenges and clarity every CA aspirant experiences. Gold foil accents bring in the sparkle of achievement and the luxury of reaching your go",
    images: [
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546280/IMG_20250703_194126_w1gldy.jpg", 
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546262/IMG_20250703_194212_kuzptt.jpg", 
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546286/IMG_20250703_194849_hvgson.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546296/IMG_20250703_195052_nkrnee.jpg"
    ],
    rating: 4.6,
    size: "15 inch round curve",
    Colour: "White - Black", // This field is not directly used in frontend highlights
    price: 3000.00,
    offerPrice:  2499.00,
    category: "Resin Art",
    stock: 3,
    highlights: [
      "Size: 15 inch round curve",
      "Colour: White - Black", // This is a string in highlights
      "Handmade: Yes",
      "Customise: Yes (customise as per your choice - from flower selection to name",
      "Medium: Resin"
    ]
  },
  {
    _id: "66a41f2a9d20c5f2b8a7f005",
    name: "Essence of Earth",
    description: "Set of four modern art paintings, possibly made using acrylic colour Each artwork is framed in a simple black border, enhancing contrast and elegance.The paintings feature vibrant colours and dynamic compositions.Nature-inspired themes are evident, including stylized landscapes, plants,mountains, and celestial objects.Use of semi-abstract forms suggests emotional expression over realistic depiction Evokes feelings of tranquility, joy, and connection with nature. Ideal for those who appreciate a modern aesthetic with natural elements. Can be displayed individually or as a cohesive set to enhance any space with charm and personality.",
    images: [
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753554997/Untitled_design_jzn4fc.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546319/IMG_20250703_192743_195_k2liho.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546322/IMG_20250703_192743_200_uugwjt.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546322/IMG_20250703_192743_336_fduhqa.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546323/IMG_20250703_192743_408_yypdwj.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546275/IMG_20250703_204453_sgj8fm.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546243/IMG_20250703_192832_673_xqvfii.jpg",
      "https://res.cloudinary.com/decaobqtj/image/upload/v1753546243/IMG_20250703_192832_516_hgccxk.jpg",
    ],
    rating: 4.3,
    size: "18x25cm",
    shape: "Rectangular",
    frame: "Black",
    Medium: "Acrylic colour",
    price: 1500.00,
    offerPrice: 999.00,
    category: "Modern Art",
    stock: 1,
    highlights: [
      "Size: 18x25 cm",
      "Shape: Rectangular",
      "Frame: Black",
      "Medium: Acrylic colour",
      "Paper: GSM 270",
      "Glass: Acrylic glass",
      "Back: Wooden",
      "Hanging hook: Yes",
      "Set: 4 set of modern abstract painting",
      "Handmade: Yes",
      "Ready to hang: Yes"
    ]
  },
];

const importData = async () => {
  try {
    // Clear existing paintings
    await Painting.deleteMany();
    console.log('Existing painting data cleared.');

    // Insert new sample paintings
    await Painting.insertMany(samplePaintings);
    console.log('Sample painting data imported successfully!');
    process.exit(); // Exit the process after successful import
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1); // Exit with an error code
  }
};

importData();