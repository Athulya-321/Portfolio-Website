export interface CategoryMeta {
  key: string;
  label: string;
  description: string;
  color: string;
  images: string[];
}

// ─── Individual Category Arrays ───────────────────────────────────────────

export const achievementsAndOtherActivities = [
  '/certificates/Achievements & Other Activities/oc1.jpg',
  '/certificates/Achievements & Other Activities/oc2.jpg',
  '/certificates/Achievements & Other Activities/oc3.jpg',
  '/certificates/Achievements & Other Activities/oc4.jpg',
  '/certificates/Achievements & Other Activities/oc5.jpg',
];

export const badges = [
  '/certificates/Badges/b1.png',
  '/certificates/Badges/b2.png',
  '/certificates/Badges/b3.png',
  '/certificates/Badges/b4.png',
  '/certificates/Badges/b5.png',
  '/certificates/Badges/b6.png',
  '/certificates/Badges/b7.png',
  '/certificates/Badges/b8.png',
  '/certificates/Badges/b9.png',
  '/certificates/Badges/b10.png',
  '/certificates/Badges/b11.jpg',
  '/certificates/Badges/b15.png',
  '/certificates/Badges/b16.png',
  '/certificates/Badges/b17.png',
  '/certificates/Badges/b18.png',
  '/certificates/Badges/b19.png',
  '/certificates/Badges/b20.png',
  '/certificates/Badges/b21.png',
  '/certificates/Badges/b23.png',
  '/certificates/Badges/b24.png',
  '/certificates/Badges/b25.png',
  '/certificates/Badges/b26.png',
  '/certificates/Badges/b27.png',
];

export const bootCampsAndWorkshops = [
  '/certificates/Boot Camps & Workshops/bc0.jpg',
  '/certificates/Boot Camps & Workshops/bc1.jpg',
  '/certificates/Boot Camps & Workshops/bc4.jpg',
  '/certificates/Boot Camps & Workshops/bc5.jpg',
  '/certificates/Boot Camps & Workshops/bc7.jpg',
  '/certificates/Boot Camps & Workshops/bc9.jpg',
  '/certificates/Boot Camps & Workshops/bc10.jpg',
  '/certificates/Boot Camps & Workshops/bc10.png',
  '/certificates/Boot Camps & Workshops/bc14.png',
  '/certificates/Boot Camps & Workshops/bc15.png',
  '/certificates/Boot Camps & Workshops/bc17.png',
];

export const certificationsAndSkillTests = [
  '/certificates/Certifications & Skill Tests/c2.jpg',
  '/certificates/Certifications & Skill Tests/c3.png',
  '/certificates/Certifications & Skill Tests/c4.jpg',
  '/certificates/Certifications & Skill Tests/c5.png',
  '/certificates/Certifications & Skill Tests/c6.png',
  '/certificates/Certifications & Skill Tests/c7.png',
];

export const hackathons = [
  '/certificates/Hackathons/h1.jpg',
  '/certificates/Hackathons/h2.jpg',
  '/certificates/Hackathons/h3.jpg',
  '/certificates/Hackathons/h4.jpg',
];

export const infosysCertificates = [
  '/certificates/Infosys Certificates/cc1.jpg',
  '/certificates/Infosys Certificates/cc2.jpg',
  '/certificates/Infosys Certificates/cc3.jpg',
  '/certificates/Infosys Certificates/cc4.jpg',
  '/certificates/Infosys Certificates/cc5.jpg',
  '/certificates/Infosys Certificates/cc6.jpg',
  '/certificates/Infosys Certificates/cc7.jpg',
  '/certificates/Infosys Certificates/cc8.jpg',
  '/certificates/Infosys Certificates/cc9.jpg',
  '/certificates/Infosys Certificates/cc10.jpg',
  '/certificates/Infosys Certificates/cc11.jpg',
  '/certificates/Infosys Certificates/cc12.jpg',
  '/certificates/Infosys Certificates/cc13.jpg',
  '/certificates/Infosys Certificates/cc15.jpg',
  '/certificates/Infosys Certificates/cc16.jpg',
  '/certificates/Infosys Certificates/cc17.jpg',
  '/certificates/Infosys Certificates/cc18.jpg',
  '/certificates/Infosys Certificates/cc20.jpg',
  '/certificates/Infosys Certificates/cc23.jpg',
  '/certificates/Infosys Certificates/cc24.jpg',
  '/certificates/Infosys Certificates/cc25.jpg',
  '/certificates/Infosys Certificates/cc26.jpg',
];

export const internships = [
  '/certificates/internships/i1.png',
  '/certificates/internships/i2.jpg',
];

export const linkedInAndMSCertificates = [
  '/certificates/LinkedIn & MS Certificates/ccc1.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc2.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc3.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc4.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc5.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc6.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc7.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc8.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc9.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc10.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc11.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc12.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc13.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc14.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc15.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc16.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc17.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc18.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc19.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc20.jpg',
  '/certificates/LinkedIn & MS Certificates/ccc25.jpg',
];

export const projectCompletionCertificates = [
  '/certificates/Project Completion Certificates/p1.jpg',
  '/certificates/Project Completion Certificates/p2.png',
  '/certificates/Project Completion Certificates/p4.png',
];

// ─── Main Categories Mapping ──────────────────────────────────────────────

export const CATEGORIES: CategoryMeta[] = [
  {
    key: 'certificationsAndSkillTests',
    label: 'Certifications & Skill Tests',
    description: 'Industry recognized certifications and standardized skill assessments.',
    color: 'from-blue-500 to-cyan-400',
    images: certificationsAndSkillTests,
  },
  {
    key: 'infosysCertificates',
    label: 'Infosys Certificates',
    description: 'Certifications completed via Infosys Springboard platform.',
    color: 'from-blue-600 to-indigo-500',
    images: infosysCertificates,
  },
  {
    key: 'linkedInAndMSCertificates',
    label: 'LinkedIn & MS Certificates',
    description: 'Professional development courses from LinkedIn Learning and Microsoft.',
    color: 'from-sky-500 to-blue-400',
    images: linkedInAndMSCertificates,
  },
  {
    key: 'bootCampsAndWorkshops',
    label: 'Boot Camps & Workshops',
    description: 'Intensive bootcamps and specialized technical workshops.',
    color: 'from-orange-500 to-amber-400',
    images: bootCampsAndWorkshops,
  },
  {
    key: 'achievementsAndOtherActivities',
    label: 'Achievements & Other Activities',
    description: 'Awards, recognition, and extracurricular technical activities.',
    color: 'from-emerald-500 to-teal-400',
    images: achievementsAndOtherActivities,
  },
  {
    key: 'hackathons',
    label: 'Hackathons',
    description: 'Participation and winning certificates from various hackathons.',
    color: 'from-rose-500 to-pink-400',
    images: hackathons,
  },
  {
    key: 'projectCompletionCertificates',
    label: 'Project Completion Certificates',
    description: 'Official recognition for successfully completed major projects.',
    color: 'from-fuchsia-500 to-purple-400',
    images: projectCompletionCertificates,
  },
  {
    key: 'badges',
    label: 'Badges',
    description: 'Digital badges reflecting specific skill mastery and achievements.',
    color: 'from-yellow-400 to-orange-400',
    images: badges,
  },
  {
    key: 'internships',
    label: 'Internships',
    description: 'Professional experience certificates from internship programs.',
    color: 'from-violet-500 to-purple-500',
    images: internships,
  },
];
