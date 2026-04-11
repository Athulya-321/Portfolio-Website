const fs = require('fs');
const path = require('path');

const certsDir = path.join(__dirname, '../public/certificates');

// Get all directories in public/certificates
const folders = fs.readdirSync(certsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

// Define some predefined colors
const colors = [
    'from-blue-500 to-cyan-400',
    'from-blue-600 to-indigo-500',
    'from-sky-500 to-blue-400',
    'from-emerald-500 to-teal-400',
    'from-rose-500 to-pink-400',
    'from-fuchsia-500 to-purple-400',
    'from-yellow-400 to-orange-400',
    'from-violet-500 to-purple-500',
    'from-orange-500 to-amber-400'
];

let tsContent = `export interface CategoryMeta {
  key: string;
  label: string;
  description: string;
  color: string;
  images: string[];
}\n\n`;

let categoriesMeta = [];

folders.forEach((folder, index) => {
    const folderPath = path.join(certsDir, folder);
    const files = fs.readdirSync(folderPath)
        .filter(file => /\.(png|jpe?g)$/i.test(file))
        .map(file => `/certificates/${folder}/${file}`);
    
    if (files.length === 0) return;

    const camelKey = folder.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');

    tsContent += `export const ${camelKey} = ${JSON.stringify(files, null, 2)};\n\n`;

    categoriesMeta.push({
        key: camelKey,
        label: folder,
        description: `${folder} collection.`,
        color: colors[index % colors.length],
        imagesRef: camelKey
    });
});

tsContent += `export const CATEGORIES: CategoryMeta[] = [\n`;
categoriesMeta.forEach(cat => {
    tsContent += `  {
    key: '${cat.key}',
    label: '${cat.label}',
    description: '${cat.description}',
    color: '${cat.color}',
    images: ${cat.imagesRef},
  },\n`;
});
tsContent += `];\n`;

fs.writeFileSync(path.join(__dirname, '../src/components/sections/certificatesData.ts'), tsContent);
console.log("Successfully generated src/components/sections/certificatesData.ts based on new folders!");
