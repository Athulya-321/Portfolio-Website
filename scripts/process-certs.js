const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/components/Certificates');
const destDir = path.join(__dirname, '../public/certificates/all');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Map of screenshot specific hashes/names to real names
const exactMatches = {
    "Screenshot 2024-05-01 204850": { title: "Design a machine learning model training solution", issuer: "Microsoft", category: "AI & Machine Learning" },
    "IMG-20260409-WA0012": { title: "YODHA 24H National Level Hackathon Volunteer", issuer: "Jyothi Engineering College", category: "Hackathons & OSS" },
    "IMG-20260409-WA0013": { title: "NASA Space Apps Challenge Galactic Problem Solver", issuer: "NASA", category: "Hackathons & OSS" },
    "IMG-20260409-WA0014": { title: "Neophyte 1.0 24H Hackathon Participant", issuer: "TinkerHub / JEC", category: "Hackathons & OSS" }
};

// Keyword based rules for remaining files
const keywords = [
    { match: "GSSoC", title: "GSSoC 2024 Contributor Badge", issuer: "GirlScript", category: "Hackathons & OSS" },
    { match: "NASA", title: "NASA Space Apps Challenge 2024", issuer: "NASA", category: "Hackathons & OSS" },
    { match: "GenAI-Prompt", title: "GenAI Prompt Engineering Masterclass", issuer: "LinkedIn Learning", category: "Generative AI" },
    { match: "AI Productivity", title: "AI Productivity Hacks & Tools", issuer: "LinkedIn Learning", category: "Generative AI" },
    { match: "Generative AI", title: "Generative AI Fundamentals", issuer: "LinkedIn Learning", category: "Generative AI" },
    { match: "Copilot", title: "Microsoft Copilot Integrations", issuer: "Microsoft", category: "Generative AI" },
    { match: "Backend Bootcamp", title: "Node.js & Express Backend Bootcamp", issuer: "DevTown", category: "Full-Stack Development" },
    { match: "responsive website", title: "Responsive Web Design Masterclass", issuer: "NxtWave", category: "Web Design & UI/UX" },
    { match: "static website", title: "Static Website Design Masterclass", issuer: "NxtWave", category: "Web Design & UI/UX" },
    { match: "Cloud Computing", title: "Cloud Computing & DevOps", issuer: "DevTown", category: "Cloud Computing" },
    { match: "DevOps", title: "DevOps Masterclass", issuer: "DevTown", category: "Cloud Computing" },
    { match: "Data+Science+Internship", title: "Data Science Internship (30 Days)", issuer: "YBI Foundation", category: "Data Science & Analytics" },
    { match: "Figma_Basics", title: "Figma UI/UX Basics", issuer: "Coursera", category: "Web Design & UI/UX" },
    { match: "Gen AI Megha", title: "GenAI Mega Workshop", issuer: "NxtWave", category: "Generative AI" },
    { match: "Power BI", title: "Getting Started with Power BI", issuer: "Simplilearn", category: "Data Science & Analytics" },
    { match: "Hotstar", title: "Hotstar UI Clone Masterpiece", issuer: "Independent", category: "Web Design & UI/UX" },
    { match: "Intro_AI_ML", title: "Introduction to AI & Machine Learning", issuer: "Simplilearn", category: "AI & Machine Learning" },
    { match: "Intro_CyberSecurity", title: "Introduction to Cybersecurity", issuer: "Simplilearn", category: "Cybersecurity & IoT" },
    { match: "Intro_IoT", title: "Introduction to IoT", issuer: "Simplilearn", category: "Cybersecurity & IoT" },
    { match: "Gemini AI", title: "Mastering Machine Learning with Gemini AI", issuer: "GUVI", category: "AI & Machine Learning" },
    { match: "Python and Artificial", title: "Python & Artificial Intelligence", issuer: "AWS / Microsoft", category: "AI & Machine Learning" },
    { match: "Red Team", title: "Red Teaming Operations Masterclass", issuer: "Simplilearn", category: "Cybersecurity & IoT" },
    { match: "teaching_assistant", title: "Teaching Assistant Excellence", issuer: "NxtWave", category: "Professional Growth" },
    { match: "UI UX Project", title: "UI/UX Design Capstone", issuer: "Coursera", category: "Web Design & UI/UX" },
    { match: "Hall of Fame", title: "CCBP 4.0 Hall of Fame", issuer: "NxtWave", category: "Professional Growth" },
    { match: "Wordpress", title: "WordPress Web Development", issuer: "Coursera", category: "Web Design & UI/UX" },
    { match: "Data analytics and AI", title: "Data Analytics & AI Workshop", issuer: "InternPe", category: "Data Science & Analytics" },
    { match: "Campus Ambassador", title: "Campus Ambassador Role", issuer: "InternPe", category: "Professional Growth" },
    { match: "AR VR", title: "AR / VR Introduction", issuer: "Simplilearn", category: "Web Design & UI/UX" },
    { match: "Communication", title: "Arts and Science of Communication", issuer: "TCS iON", category: "Professional Growth" },
    { match: "AWS-Project", title: "AWS Cloud Project Completion", issuer: "AWS", category: "Cloud Computing" },
    { match: "SEO1", title: "SEO Fundamentals", issuer: "Simplilearn", category: "Web Design & UI/UX" }
];

let generatedCertificates = [];

function sanitizeFilename(name) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function processFiles() {
    const files = fs.readdirSync(srcDir);
    let count = 0;
    files.forEach(file => {
        if (!file.match(/\.(png|jpg|jpeg|pdf)$/i)) return; // Only process valid files

        const ext = path.extname(file).toLowerCase();
        const basename = path.basename(file, ext);
        
        let title = "Professional Certificate";
        let issuer = "Verified Issuer";
        let category = "Professional Growth";
        let isFeatured = false;

        // Check explicit hashes
        let matched = false;
        for (const [key, data] of Object.entries(exactMatches)) {
            if (file.includes(key)) {
                title = data.title;
                issuer = data.issuer;
                category = data.category;
                matched = true;
                break;
            }
        }

        // Check regex keywords if not explicitly matched
        if (!matched) {
            for (const rule of keywords) {
                if (file.toLowerCase().includes(rule.match.toLowerCase())) {
                    title = rule.title;
                    issuer = rule.issuer;
                    category = rule.category;
                    matched = true;
                    break;
                }
            }
        }

        // Add some manual featuring logic for visual interest
        if (title.includes("Automated Machine Learning") || title.includes("NASA space apps") || title.includes("GSSoC") || title.includes("Teaching Assistant")) {
            isFeatured = true;
        }

        // Use a generic naming for fallback documents that weren't caught
        if (!matched) {
            title = `Professional Certification: ${basename.substring(0, 20)}...`;
            category = "Professional Growth";
        }

        // Format clean filename and copy
        const cleanName = sanitizeFilename(title) + "_" + count + ext;
        const targetPath = path.join(destDir, cleanName);
        fs.copyFileSync(path.join(srcDir, file), targetPath);

        generatedCertificates.push({
            id: count,
            title: title,
            issuer: issuer,
            category: category,
            image: `/certificates/all/${cleanName}`,
            isPdf: ext === '.pdf',
            isFeatured: isFeatured
        });

        count++;
    });

    console.log(`Processed ${count} certificates! Generating TypeScript file...`);

    // Ensure we add the "Featured" category
    // This is handled by a special featured boolean flag on the frontend, but let's make it easy to use

    const tsContent = `// Auto-generated certificate dataset
export interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  category: string;
  image: string;
  isPdf: boolean;
  isFeatured: boolean;
}

export const OFFICIAL_CATEGORIES = [
  "Featured",
  "AI & Machine Learning",
  "Generative AI",
  "Data Science & Analytics",
  "Cloud Computing",
  "Full-Stack Development",
  "Web Design & UI/UX",
  "Cybersecurity & IoT",
  "Hackathons & OSS",
  "Professional Growth"
];

export const certificatesData: CertificateItem[] = ${JSON.stringify(generatedCertificates, null, 2)};
`;

    fs.writeFileSync(path.join(__dirname, '../src/components/sections/certificatesData.ts'), tsContent);
    console.log("Successfully generated src/components/sections/certificatesData.ts");
}

processFiles();
