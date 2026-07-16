import { Wing, CommunityEvent, GalleryItem } from "./types";

export const WINGS_DATA: Wing[] = [
  {
    id: "music",
    name: "Music Club",
    tagline: "Where melodies bring people together.",
    iconName: "Music",
    shortIntro: "A space for singers, musicians, instrumentalists, and everyone who simply loves music.",
    detailedDesc: "From acoustic jamming sessions under the open sky to energetic live stage performances, the Music Club creates cozy spaces for people to connect through sound, rhythm, and creative energy. Whether you are an accomplished instrumentalist, a bedroom vocalist, or an eager listener, we have a mic and a cushion reserved for you.",
    activities: [
      {
        title: "Sunset Jam Sessions",
        description: "Unplugged backyard circles where members pick up acoustic guitars, ukuleles, and percussions to play old classics and modern indie hits.",
        frequency: "Every Saturday Evening"
      },
      {
        title: "Live Open Mic Showcase",
        description: "A supportive, low-pressure community platform designed to encourage first-time performers to showcase their vocals, instrumentals, or poetry.",
        frequency: "Monthly"
      },
      {
        title: "Rhythm & Vocal Workshops",
        description: "Interactive learning masterclasses hosted by professional mentors covering voice control, scale dynamics, and collaborative songwriting.",
        frequency: "Bi-monthly"
      }
    ],
    team: [
      { name: "Aarav Sharma", role: "Club Coordinator & Lead Guitarist" },
      { name: "Anjali Rao", role: "Co-coordinator & Lead Vocalist" }
    ],
    accentColor: "from-purple-500 to-indigo-600",
    hoverAccent: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-purple-950 via-slate-900 to-black"
  },
  {
    id: "books",
    name: "Books Club",
    tagline: "Read. Discuss. Connect.",
    iconName: "BookOpen",
    shortIntro: "A welcoming space where stories and ideas come alive through deep conversations.",
    detailedDesc: "We believe books are gateways to deeper friendships. The Books Club hosts highly engaging discussions that venture far beyond the final page. In our sessions, members share raw reviews, exchange life perspectives, participate in silent read-a-thons, and build an inclusive intellectual home.",
    activities: [
      {
        title: "The Sunday Book Talk",
        description: "Our signature bi-weekly circle discussing pre-selected books across fiction, philosophy, self-development, and poetry over tea.",
        frequency: "Alternate Sundays"
      },
      {
        title: "Silent Reading Hours",
        description: "Two hours of pure digital detox where members gather in a cozy, sunlit room to read their personal books in shared silence.",
        frequency: "Every Wednesday"
      },
      {
        title: "Book Exchange & Donating",
        description: "A miniature community library project where members swap old favorites, recommend hidden gems, and curate community reading chests.",
        frequency: "Ongoing"
      }
    ],
    team: [
      { name: "Meera Nair", role: "Club Coordinator & Literary Curator" },
      { name: "Vikram Seth", role: "Co-coordinator & Editorial Lead" }
    ],
    accentColor: "from-blue-500 to-sky-600",
    hoverAccent: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-blue-950 via-slate-900 to-black"
  },
  {
    id: "playing",
    name: "Playing & Games Wing",
    tagline: "Play together. Connect beyond the game.",
    iconName: "Gamepad2",
    shortIntro: "A fun and energetic space that brings people together through sports and board games.",
    detailedDesc: "The Playing Wing believes in healthy competition, outdoor play, and intellectual play. From intense tabletop strategy games and social deduction circles to full-day outdoor trekking expeditions in Tirupati's beautiful landscape, we break regular routines to spark pure childhood joy.",
    activities: [
      {
        title: "Trek to Talakona & Beyond",
        description: "Day-long trekking and outdoor camping expeditions exploring natural waterfalls, hill trails, and rich wildlife reserves near Tirupati.",
        frequency: "Seasonal / Monthly"
      },
      {
        title: "Tabletop Strategy Nights",
        description: "Immersive games of Settlers of Catan, Ticket to Ride, Avalon, and standard classic chess to spark quick thinking and laughter.",
        frequency: "Every Thursday"
      },
      {
        title: "Weekend Turf Sports",
        description: "Recreational box cricket tournaments, high-intensity turf football, and casual badminton matches welcoming players of all skill levels.",
        frequency: "Every Sunday Morning"
      }
    ],
    team: [
      { name: "Rohan Verma", role: "Adventure & Sports Lead" },
      { name: "Kavya Hegde", role: "Tabletop & Board Games Coordinator" }
    ],
    accentColor: "from-emerald-500 to-green-600",
    hoverAccent: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-emerald-950 via-slate-900 to-black"
  },
  {
    id: "craft",
    name: "Craft Club",
    tagline: "Create. Express. Inspire.",
    iconName: "Palette",
    shortIntro: "A creative, tactile space for people who enjoy hands-on making, art, and DIY craft.",
    detailedDesc: "The Craft Club celebrates fine arts, custom designs, and raw imagination. Through guided, step-by-step sessions on painting, upcycling, clay modeling, and candle making, our members decompress from daily screens and build beautiful tactile pieces with their own hands.",
    activities: [
      {
        title: "DIY Candle Making",
        description: "Learning the science of wax pouring, scent formulation, and container styling to create custom-scented soy and gel candles.",
        frequency: "Monthly"
      },
      {
        title: "Watercolor & Painting Walks",
        description: "Taking drawing boards outdoors to historical spots in Tirupati to sketch and paint landscapes, temple architecture, and nature.",
        frequency: "Alternate Saturdays"
      },
      {
        title: "Pottery & Upcycling Workshops",
        description: "Guided hands-on clay manipulation and creative lessons turning vintage plastic, cardboard, and glass into unique home art.",
        frequency: "Every Quarter"
      }
    ],
    team: [
      { name: "Neha Patel", role: "Fine Arts & Painting Instructor" },
      { name: "Aditya Sen", role: "Co-coordinator & DIY Specialist" }
    ],
    accentColor: "from-amber-500 to-orange-600",
    hoverAccent: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-amber-950 via-slate-900 to-black"
  },
  {
    id: "photo",
    name: "Photo Club",
    tagline: "Capture moments. Create stories.",
    iconName: "Camera",
    shortIntro: "See the world through a creative lens and preserve stunning slices of community life.",
    detailedDesc: "For visual dreamers, street photowalkers, and smartphone camera enthusiasts. The Photo Club focuses on the art of capturing true emotions, dramatic shadows, and historical narratives. We travel around Tirupati's rich cultural avenues to explore composition, lighting, and cinematic visual stories.",
    activities: [
      {
        title: "Tirupati Heritage PhotoWalks",
        description: "Morning expeditions photographing the streets, street markets, and temple architecture around Kapilatheertham and Tiruchanoor.",
        frequency: "Monthly"
      },
      {
        title: "Mobile & DSLR Editing Masterclass",
        description: "Practical tutorials on Adobe Lightroom mobile, color grading, tone curves, and curation rules to establish a personal style.",
        frequency: "Bi-monthly"
      },
      {
        title: "Theme Photography Contests",
        description: "Open community challenges with creative constraints (e.g. 'Shadow Play', 'Rhythm of Streets', 'Golden Hours') evaluated by veterans.",
        frequency: "Monthly"
      }
    ],
    team: [
      { name: "Siddharth Roy", role: "Lead Visual Storyteller & Filmmaker" },
      { name: "Riya Deshmukh", role: "Street & Portrait Specialist" }
    ],
    accentColor: "from-rose-500 to-pink-600",
    hoverAccent: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-rose-950 via-slate-900 to-black"
  },
  {
    id: "social",
    name: "Social Club",
    tagline: "Serve. Share. Make impact.",
    iconName: "Heart",
    shortIntro: "A purposeful space to give back, organize social drives, and build a kinder society.",
    detailedDesc: "We believe community is not just about our personal enjoyment, but also about supporting the society we reside in. The Social Club orchestrates environmental preservation, tree planting, food distribution campaigns, and educational activities at orphanages and remote schools around Tirupati.",
    activities: [
      {
        title: "Green Tirupati Preservation Drive",
        description: "Dedicated morning tree plantations, waste segregation awareness booths, and cleanliness campaigns around water reservoirs.",
        frequency: "Monthly"
      },
      {
        title: "Volunteering & Education Circles",
        description: "Weekend coaching, painting municipal schools, and distributing school kits, stationery, and books to underfunded children.",
        frequency: "Bi-weekly"
      },
      {
        title: "Kindness Kitchen Initiative",
        description: "A collaborative kitchen project preparing and serving highly nutritious, home-cooked weekend meals to homeless populations.",
        frequency: "Every Sunday Afternoon"
      }
    ],
    team: [
      { name: "Dr. Amit Prasad", role: "Director of Social Welfare Projects" },
      { name: "Sneha Murthy", role: "Co-coordinator & Volunteer Manager" }
    ],
    accentColor: "from-teal-500 to-cyan-600",
    hoverAccent: "bg-teal-500",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-teal-950 via-slate-900 to-black"
  }
];

export const EVENTS_DATA: CommunityEvent[] = [
  {
    id: "evt1",
    title: "Acoustic Jamming Night",
    wingId: "music",
    wingName: "Music Club",
    date: "25 May 2026",
    location: "Samskruthi Open Grounds, Tirupati",
    description: "An open sky campfire gathering with acoustic guitars, cajon, and raw vocals. Bring your instruments or just sing along to golden melodies under the stars.",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    id: "evt2",
    title: "Adventure Trek to Talakona",
    wingId: "playing",
    wingName: "Playing Wing",
    date: "02 June 2026",
    location: "Talakona Forest Reserve, Tirupati",
    description: "A physical escape into the dense deciduous forests of Talakona. Experience steep hill climbs, natural waterfalls, bird watching, and team building games.",
    image: "https://images.unsplash.com/photo-1551632811-561730d1e4a6?auto=format&fit=crop&w=600&q=80",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: "evt3",
    title: "The Sunday Book Talk",
    wingId: "books",
    wingName: "Books Club",
    date: "09 June 2026",
    location: "The Reading Cozy Cafe, Tirupati",
    description: "Our signature book talk discussing psychological realism, magic realism, and philosophy. This week, we explore and review 'Ikigai' and 'Atomic Habits'.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  {
    id: "evt4",
    title: "DIY Candle Making",
    wingId: "craft",
    wingName: "Craft Club",
    date: "16 June 2026",
    location: "Community Center Hall, Tirupati",
    description: "A wonderful, scented hands-on session on raw wax melting, custom fragrance selection, wick settings, and beautiful glass jar wax pouring.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal1",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    title: "Group campfire song session under open skies",
    category: "Music"
  },
  {
    id: "gal2",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    title: "Tabletop strategy meetups with board game lovers",
    category: "Playing"
  },
  {
    id: "gal3",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    title: "Creative pottery painting and clay model making",
    category: "Craft"
  },
  {
    id: "gal4",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    title: "Welfare programs spreading smiles at a neighborhood center",
    category: "Social"
  },
  {
    id: "gal5",
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    title: "Photography outdoor walks documenting Tirupati's heritage",
    category: "Photo"
  },
  {
    id: "gal6",
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    title: "Team discussions planning upcoming social work events",
    category: "Social"
  },
  {
    id: "gal7",
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    title: "Sunset jamming gathering in the outskirts of town",
    category: "Music"
  },
  {
    id: "gal8",
    url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    title: "Book reading circles discussing contemporary novels",
    category: "Books"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Joining IMC Tirupati changed my life. I went from being stuck in a boring work-home routine to jamming on Saturdays and volunteering on Sundays!",
    author: "Kiran Kumar",
    role: "Music & Social Club Member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    quote: "The Book Club is my sanctuary. The level of empathy, deep discussions, and book swaps have created an amazing intellectual family for me here.",
    author: "Priyanka Roy",
    role: "Books Club Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
  },
  {
    quote: "I coordinate treks for the Playing Wing. The energy of IMC's members is contagious. Hiking up Talakona with this group is pure bliss.",
    author: "Rohan Verma",
    role: "Adventure Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  }
];

export const STATS = [
  { label: "6+ WINGS", description: "Clubs & Spaces", icon: "Layers" },
  { label: "100+ EVENTS", description: "Conducted Annually", icon: "Calendar" },
  { label: "1000+ MEMBERS", description: "Active Community", icon: "Users" },
  { label: "ONE", description: "Vibrant Community", icon: "Heart" }
];
