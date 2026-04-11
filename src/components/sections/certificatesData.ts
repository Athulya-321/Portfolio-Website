export interface CategoryMeta {
  key: string;
  label: string;
  description: string;
  color: string;
  images: string[];
}

export const certificationsSkillTests = [
  "/certificates/Certifications & Skill Tests/cc1.jpg",
  "/certificates/Certifications & Skill Tests/cc2.jpg",
  "/certificates/Certifications & Skill Tests/cc3.jpg"
];

export const cISCOCertificates = [
  "/certificates/CISCO Certificates/1000123378.jpg",
  "/certificates/CISCO Certificates/1000123381.jpg",
  "/certificates/CISCO Certificates/1000123384.jpg",
  "/certificates/CISCO Certificates/1000123451.jpg",
  "/certificates/CISCO Certificates/1000123473.jpg",
  "/certificates/CISCO Certificates/1000123474.jpg",
  "/certificates/CISCO Certificates/1000123478.jpg",
  "/certificates/CISCO Certificates/1000123479.jpg",
  "/certificates/CISCO Certificates/1000123480.jpg"
];

export const hackathons = [
  "/certificates/Hackathons/1000123299.jpg",
  "/certificates/Hackathons/1000123475.jpg",
  "/certificates/Hackathons/1000123481.jpg"
];

export const iBMCertificatesAndBadges = [
  "/certificates/IBM Certificates and Badges/1000123439.jpg",
  "/certificates/IBM Certificates and Badges/1000123438.jpg",
  "/certificates/IBM Certificates and Badges/1000123459.jpg",
  "/certificates/IBM Certificates and Badges/1000123387.jpg",
  "/certificates/IBM Certificates and Badges/1000123392.jpg",
  "/certificates/IBM Certificates and Badges/1000123395.jpg",
  "/certificates/IBM Certificates and Badges/1000123398.jpg",
];

export const infosysCertificates = [
  "/certificates/Infosys Certificates/1000123402.jpg",
  "/certificates/Infosys Certificates/1000123405.jpg",
  "/certificates/Infosys Certificates/1000123412.jpg",
  "/certificates/Infosys Certificates/1000123415.jpg",
  "/certificates/Infosys Certificates/1000123416.jpg",
  "/certificates/Infosys Certificates/1000123417.jpg",
  "/certificates/Infosys Certificates/1000123418.jpg",
  "/certificates/Infosys Certificates/1000123419.jpg",
  "/certificates/Infosys Certificates/1000123420.jpg",
  "/certificates/Infosys Certificates/1000123421.jpg",
  "/certificates/Infosys Certificates/1000123422.jpg",
  "/certificates/Infosys Certificates/1000123423.jpg",
  "/certificates/Infosys Certificates/1000123425.jpg",
  "/certificates/Infosys Certificates/1000123426.jpg",
  "/certificates/Infosys Certificates/1000123428.jpg",
  "/certificates/Infosys Certificates/1000123443.jpg",
  "/certificates/Infosys Certificates/1000123449.jpg"
];

export const internshipsAndOtherParticipations = [
  "/certificates/Internships and other Participations/1000123362.jpg",
  "/certificates/Internships and other Participations/1000123440.jpg",
  "/certificates/Internships and other Participations/ch1.jpg",
  "/certificates/Internships and other Participations/ch2.jpg",
  "/certificates/Internships and other Participations/p1.jpg",
  "/certificates/Internships and other Participations/p2.jpg",
  "/certificates/Internships and other Participations/p3.jpg",
  "/certificates/Internships and other Participations/p6.jpg",
  "/certificates/Internships and other Participations/p7.jpg"
];

export const linkedinCourseraCertificates = [
  "/certificates/Linkedin & Coursera Certificates/1000123373.jpg",
  "/certificates/Linkedin & Coursera Certificates/1000123427.jpg",
  "/certificates/Linkedin & Coursera Certificates/1000123429.jpg",
  "/certificates/Linkedin & Coursera Certificates/1000123430.jpg",
  "/certificates/Linkedin & Coursera Certificates/1000123462.jpg",
  "/certificates/Linkedin & Coursera Certificates/1000123466.jpg",
  "/certificates/Linkedin & Coursera Certificates/1000123477.jpg",
  "/certificates/Linkedin & Coursera Certificates/c1.jpg",
  "/certificates/Linkedin & Coursera Certificates/c10.jpg",
  "/certificates/Linkedin & Coursera Certificates/c2.jpg",
  "/certificates/Linkedin & Coursera Certificates/c3.jpg",
  "/certificates/Linkedin & Coursera Certificates/c4.jpg",
  "/certificates/Linkedin & Coursera Certificates/c5.jpg",
  "/certificates/Linkedin & Coursera Certificates/c6.jpg",
  "/certificates/Linkedin & Coursera Certificates/c7.jpg",
  "/certificates/Linkedin & Coursera Certificates/c9.jpg"
];

export const CATEGORIES: CategoryMeta[] = [
  {
    key: 'certificationsSkillTests',
    label: 'Certifications & Skill Tests',
    description: 'Certifications & Skill Tests collection.',
    color: 'from-blue-600 to-indigo-500',
    images: certificationsSkillTests,
  },
  {
    key: 'cISCOCertificates',
    label: 'CISCO Certificates',
    description: 'CISCO Certificates collection.',
    color: 'from-sky-500 to-blue-400',
    images: cISCOCertificates,
  },
  {
    key: 'hackathons',
    label: 'Hackathons',
    description: 'Hackathons collection.',
    color: 'from-emerald-500 to-teal-400',
    images: hackathons,
  },
  {
    key: 'iBMCertificatesAndBadges',
    label: 'IBM Certificates and Badges',
    description: 'IBM Certificates and Badges collection.',
    color: 'from-rose-500 to-pink-400',
    images: iBMCertificatesAndBadges,
  },
  {
    key: 'infosysCertificates',
    label: 'Infosys Certificates',
    description: 'Infosys Certificates collection.',
    color: 'from-fuchsia-500 to-purple-400',
    images: infosysCertificates,
  },
  {
    key: 'internshipsAndOtherParticipations',
    label: 'Internships and other Participations',
    description: 'Internships and other Participations collection.',
    color: 'from-yellow-400 to-orange-400',
    images: internshipsAndOtherParticipations,
  },
  {
    key: 'linkedinCourseraCertificates',
    label: 'Linkedin & Coursera Certificates',
    description: 'Linkedin & Coursera Certificates collection.',
    color: 'from-violet-500 to-purple-500',
    images: linkedinCourseraCertificates,
  },
];
