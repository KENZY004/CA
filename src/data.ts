import { Program, Location, Stat, Testimonial, Camp } from './types';
import { ASSETS } from './assets/images';

export const PROGRAMS: Program[] = [
  {
    id: 'little-spikers',
    title: 'Little Spikers',
    description: 'Introduction to volleyball for the youngest athletes.',
    longDescription: 'Our Little Spikers program focuses on basic coordination, motor skills, and an introduction to the very basics of volleyball in a fun, non-competitive environment. Perfect for building early interest and confidence.',
    image: ASSETS.EXPERTISE.FOUNDATIONAL,
    ageRange: '5 - 10',
    ageGroups: ['5-10'],
    features: ['Motor Skills', 'Fun Drills', 'Basic Rules', 'Team Play']
  },
  {
    id: 'youth-foundations',
    title: 'Youth Foundations',
    description: 'Building technical precision and core mechanics.',
    longDescription: 'Designed for middle-school aged athletes, this program dives deeper into technical mechanics. We focus on consistent passing, overhead serving, and basic offensive rotations to prepare players for school and club tryouts.',
    image: ASSETS.EXPERTISE.TACTICAL,
    ageRange: '11 - 14',
    ageGroups: ['11-14'],
    features: ['Technical Precision', 'Serving Power', 'Basic Rotations', 'Tryout Prep']
  },
  {
    id: 'high-school-prep',
    title: 'High School Prep',
    description: 'Advanced tactical systems and elite performance.',
    longDescription: 'For dedicated high school athletes, this intensive program focuses on high-level offensive and defensive systems. We emphasize positional specialization, court IQ, and the mental toughness required for varsity competition.',
    image: ASSETS.EXPERTISE.ELITE,
    ageRange: '15 - 18',
    ageGroups: ['15-18'],
    features: ['Positional IQ', 'Advanced Systems', 'Mental Game', 'College Prep']
  },
  {
    id: 'all-ages-clinics',
    title: 'Open Skills Clinics',
    description: 'Targeted skill development for all experience levels.',
    longDescription: 'These sessions are designed for specific skill work—like setting or hitting—and are open to all ages. We group athletes by skill level rather than age to ensure everyone is challenged appropriately.',
    image: ASSETS.JOURNEY.STEP_1,
    ageRange: '5 - 18',
    ageGroups: ['5-10', '11-14', '15-18'],
    features: ['Targeted Skills', 'Level Grouping', 'High Reps', 'Expert Feedback']
  },
  {
    id: 'competitive-league',
    title: 'Junior Academy League',
    description: 'Internal league play for real-game experience.',
    longDescription: 'Put your skills to the test in our internal academy league. This program is for athletes who want the thrill of competition without the travel commitment of club volleyball. Focus on game strategy and team dynamics.',
    image: ASSETS.JOURNEY.STEP_2,
    ageRange: '11 - 18',
    ageGroups: ['11-14', '15-18'],
    features: ['Game Strategy', 'Team Dynamics', 'Internal Playoffs', 'Certified Refs']
  }
];

export const PERFORMANCE_DATA = [
  { month: 'Jan', vertical: 24, speed: 65, accuracy: 40, milestones: 2 },
  { month: 'Feb', vertical: 25, speed: 68, accuracy: 45, milestones: 3 },
  { month: 'Mar', vertical: 25.5, speed: 72, accuracy: 55, milestones: 5 },
  { month: 'Apr', vertical: 26.5, speed: 70, accuracy: 65, milestones: 8 },
  { month: 'May', vertical: 28, speed: 75, accuracy: 70, milestones: 10 },
  { month: 'Jun', vertical: 29.5, speed: 80, accuracy: 85, milestones: 14 },
];

export const AGE_GROUP_BENCHMARKS = [
  { category: '5-10', vertical: 18, speed: 55, accuracy: 45, milestones: 6 },
  { category: '11-14', vertical: 24, speed: 70, accuracy: 65, milestones: 10 },
  { category: '15-18', vertical: 32, speed: 90, accuracy: 85, milestones: 15 },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Middle Blocker, U17 Elite",
    content: "The data-driven approach at Challengers changed everything for me. Seeing my vertical jump increase by 4 inches in just three months was incredibly motivating.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Setter, Varsity Captain",
    content: "The technical precision I've gained here is unmatched. The coaches don't just tell you what to do; they show you the mechanics behind every movement.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Libero, Regional MVP",
    content: "I've trained at many academies, but the community and professional atmosphere here are special. It's where athletes become leaders.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
  }
];

export const LOCATIONS: Location[] = [
  {
    id: 'fremont',
    name: 'Fremont - Kerala House',
    address: '40374 Fremont Blvd',
    city: 'Fremont',
    zip: '94538',
    coords: { lat: 37.5342, lng: -121.9682 },
    description: 'Our primary facility in Fremont, offering full-court access and modern training equipment.'
  },
  {
    id: 'tracy',
    name: 'Tracy - Bethany Elementary',
    address: '570 S Escuela Dr',
    city: 'Tracy',
    zip: '95391',
    coords: { lat: 37.7314, lng: -121.5204 },
    description: 'State-of-the-art gymnasium at Bethany Elementary School, perfect for youth clinics and team practices.'
  },
  {
    id: 'san-leandro',
    name: 'San Leandro - Halcyon Park',
    address: '1245 147th Ave',
    city: 'San Leandro',
    zip: '94578',
    coords: { lat: 37.7019, lng: -122.1388 },
    description: 'Outdoor and indoor facilities at Halcyon Park, ideal for skill-focused drills and community sessions.'
  }
];

export const STATS: Stat[] = [
  { label: 'Years Coaching', value: 35, suffix: '+' },
  { label: 'Athletes Trained', value: 5000, suffix: '+' },
  { label: 'Program Locations', value: 3 },
  { label: 'Success Rate', value: 98, suffix: '%' }
];

export const performanceStats = {
  '5-10': {
    skills: [
      { label: 'Passing Accuracy', value: 70 },
      { label: 'Serving Power', value: 50 },
      { label: 'Court Positioning', value: 65 },
      { label: 'Attack Efficiency', value: 48 }
    ],
    athletic: [
      { label: 'Vertical Jump', value: 18 },
      { label: 'Pro-Agility Shuttle', value: 65 },
      { label: 'Approach Reach', value: 55 },
      { label: 'Medicine Ball Toss', value: 48 }
    ],
    history: [
      { month: 'Jan', value: 50 },
      { month: 'Feb', value: 54 },
      { month: 'Mar', value: 58 },
      { month: 'Apr', value: 60 },
      { month: 'May', value: 64 },
      { month: 'Jun', value: 68 }
    ]
  },
  '11-14': {
    skills: [
      { label: 'Passing Accuracy', value: 82 },
      { label: 'Serving Power', value: 65 },
      { label: 'Court Positioning', value: 78 },
      { label: 'Attack Efficiency', value: 60 }
    ],
    athletic: [
      { label: 'Vertical Jump', value: 24 },
      { label: 'Pro-Agility Shuttle', value: 85 },
      { label: 'Approach Reach', value: 70 },
      { label: 'Medicine Ball Toss', value: 62 }
    ],
    history: [
      { month: 'Jan', value: 65 },
      { month: 'Feb', value: 68 },
      { month: 'Mar', value: 72 },
      { month: 'Apr', value: 70 },
      { month: 'May', value: 75 },
      { month: 'Jun', value: 80 }
    ]
  },
  '15-18': {
    skills: [
      { label: 'Passing Accuracy', value: 88 },
      { label: 'Serving Power', value: 82 },
      { label: 'Court Positioning', value: 85 },
      { label: 'Attack Efficiency', value: 75 }
    ],
    athletic: [
      { label: 'Vertical Jump', value: 32 },
      { label: 'Pro-Agility Shuttle', value: 92 },
      { label: 'Approach Reach', value: 88 },
      { label: 'Medicine Ball Toss', value: 78 }
    ],
    history: [
      { month: 'Jan', value: 78 },
      { month: 'Feb', value: 80 },
      { month: 'Mar', value: 85 },
      { month: 'Apr', value: 82 },
      { month: 'May', value: 88 },
      { month: 'Jun', value: 92 }
    ]
  }
};
