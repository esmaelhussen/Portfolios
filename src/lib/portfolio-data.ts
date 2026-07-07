import img1 from "../images/hagere-client/im-1.png";
import img2 from "../images/hagere-client/im-2.png";
import img3 from "../images/hagere-client/im-3.png";
import img4 from "../images/hagere-client/im-4.png";
import img5 from "../images/hagere-client/im-5.png";
import img6 from "../images/hagere-client/im-6.png";

import sell1 from "../images/hagere-seller/im-1.png";
import sell2 from "../images/hagere-seller/im-2.png";
import sell3 from "../images/hagere-seller/im-3.png";
import sell4 from "../images/hagere-seller/im-4.png";

import admin1 from "../images/hagere-admin/im-1.png";
import admin2 from "../images/hagere-admin/im-2.png";
import admin3 from "../images/hagere-admin/im-3.png";
import admin4 from "../images/hagere-admin/im-4.png";

import stock1 from "../images/stock/im-1.png";
import stock2 from "../images/stock/im-2.png";
import stock3 from "../images/stock/im-3.png";
import stock4 from "../images/stock/im-4.png";

export const profile = {
  name: "Esmael Hussen",
  role: "Full Stack Developer",
  tagline: "I craft fast, elegant web experiences",
  bio: "Full stack developer with a passion for building products that blend thoughtful design with rock-solid engineering. I specialize in React, Node.js, and next.js.",
  longBio:
    "I'm a Full Stack Developer with over 1 year of experience building modern, scalable web applications. I specialize in creating seamless user experiences with React, Next.js, Node.js, and PostgreSQL, combining thoughtful design with robust backend architecture. From responsive front-end interfaces to secure APIs and database systems, I enjoy turning ideas into reliable, production-ready products. I'm passionate about clean code, performance optimization, and building applications that are both functional and enjoyable to use.",
  location: "Addis Ababa, Ethiopia",
  email: "esmaelehussen@gmail.com",
  phone: "+251 930 67 09 90",
  github: "https://github.com/esmaelhussen",
  linkedin: "https://linkedin.com/in/esmaelhussen",
  twitter: "https://twitter.com/esmaelhussen",
  cvUrl: "https://drive.google.com/file/d/155J8j-niyZ5qlYPaHgI8rs5DErr3Of1A/view?usp=sharing",
  typingPhrases: [
    "Full Stack Developer",
    "React & Node.js Developer",
    "Building Scalable Web Applications",
    "Turning Ideas Into Digital Products",
  ],
  stats: [
    { label: "Years Experience", value: "1+" },
    { label: "Projects Shipped", value: "10+" },
    { label: "Technologies", value: "10+" },
    // { label: "Happy Clients", value: "20+" },
  ],
};

export const experience = [
  {
    year: "Jan 2026 — May 2026",
    role: "Full Stack Developer",
    company: "Perfonet ICT Solution",
    description:
      "Worked remotely as a Full Stack Developer on a role-based stock management system, developing scalable frontend and backend features using Next.js and NestJS, building secure RESTful APIs, implementing role-based access control, and creating dashboards and reports to support inventory management and business decision-making.",
  },
  {
    year: "July 2025 – Oct 2025",
    role: "Full Stack Developer(Intern)",
    company: "Perfonet ICT Solution",
    description:
      "Developed a role-based stock management system using Next.js and NestJS, built secure RESTful APIs for inventory and stock operations, and created dashboards and analytical reports that improved operational efficiency and data-driven decision-making.",
  },
  {
    year: "Jun 2025 – Nov 2025",
    role: "Frontend Developer(Intern)",
    company: "Kuraz Tech",
    description:
      "Designed and developed responsive, cross-browser compatible web applications using React.js and TypeScript, implemented interactive learning features, integrated RESTful APIs for educational content delivery, and optimized mobile responsiveness using modern development practices and Git-based workflows.",
  },
];

export const education = [
  {
    year: "2021 — 2026",
    title: "B.Sc. Computer Science",
    place: "Wollo University, Ethiopia",
    cgpa: "3.75",
    description: "Graduated with honors. Thesis on real-time collaborative editing systems.",
  },
];

export const interests = [
  "Learning new Technologies",
  "Artificial Intelligence & Machine Learning",
  "Problem Solving & Competitive Programming",
  "Open Source Contribution",
  "watching Tech Talks & Webinars",
  "Watch football",
  "Running & Hiking",
];

export const skills = {
  Frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 84 },
    { name: "Redux", level: 90 },
    { name: "Tailwind CSS", level: 90 },
  ],
  Backend: [
    { name: "Node.js", level: 92 },
    { name: "Express.js", level: 90 },
    { name: "NestJS", level: 84 },
  ],
  Database: [
    { name: "MongoDB", level: 85 },
    { name: "PostgreSQL", level: 90 },
    { name: "MySQL", level: 80 },
  ],
  Tools: [
    { name: "Git", level: 95 },
    { name: "GitHub", level: 95 },
    { name: "Docker", level: 70 },
    { name: "Figma", level: 70 },
  ],
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: "Web App" | "SaaS" | "Mobile" | "Open Source";
  liveUrl: string;
  githubUrl: string;
  features: string[];
  challenges: string;
  solutions: string;
  lessons: string;
  gallery: string[];
};

const cover = (seed: string, w = 1200, h = 700) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const projects: Project[] = [
  {
    slug: "Hagere Ecommerce",
    title: "Hagere Ecommerce",
    description: "A modern e-commerce platform for local businesses.",
    longDescription:
      "Hagere is a feature-rich e-commerce solution designed to empower local businesses with a seamless online shopping experience.",
    image: img1,
    tags: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Redux"],
    category: "Web App",
    liveUrl: "https://hagereshop.esmaelhussen.online/",
    githubUrl: "https://github.com/esmaelhussen/Hagere-shop",
    features: [
      "Real-time Communication with sellers",
      "Browsing & Searching Products by category, price, and rating",
      "payment integration with chapa",
      "registration with email verification and password reset",
      "user profile management with order history and wishlist",
      "order tracking and notifications",
      "OTP-based authentication for secure login",
      "Amharic and English language support for a wider audience",
    ],
    challenges:
      "Managing complex state across cart, wishlist, and authentication while keeping the UI responsive and consistent across multiple user roles (Admin, Seller, Customer).",

    solutions:
      "Implemented a structured state management approach with modular API services and role-based access control, ensuring secure data flow and optimized updates across components.",

    lessons:
      "A well-structured frontend-backend separation and clear state architecture are critical for scaling e-commerce systems without performance or maintainability issues.",
    gallery: [img2, img3, img4, img5, img6],
  },
  {
    slug: "Hagere seller",
    title: "Hagere Seller",
    description: "A seller dashboard for managing products, orders, and analytics.",
    longDescription:
      "Hagere Seller is a comprehensive dashboard that allows sellers to manage their products, track orders, and analyze sales performance in real-time.",
    image: sell4,
    tags: ["React", "Node.js", "Tailwind CSS", "Redux", "Chart.js"],
    category: "Web App",
    liveUrl: "https://dashboard.hagereshop.esmaelhussen.online/login",
    githubUrl: "https://github.com/esmaelhussen/Hagere-shop-dashboard",
    features: [
      "Add, edit, and delete products with images, pricing, and descriptions",
      "Manage product inventory and real-time stock updates",
      "Manage product categories and stock availability",
      "Responsive dashboard UI for desktop and mobile devices",
      "Real-time notifications for new orders and stock changes",
    ],
    challenges:
      "Designing a scalable seller dashboard that supports complex workflows like product management, inventory tracking, and order processing while keeping the UI fast and maintainable.",

    solutions:
      "Built a modular dashboard architecture with reusable components, role-based access control, and optimized API integration to ensure smooth performance across all seller operations.",

    lessons:
      "Good system design is about balancing flexibility and simplicity—clear structure, reusable components, and clean API separation are key to scaling real-world dashboards.",
    gallery: [sell1, sell2, sell3],
  },
  {
    slug: "hagere-admin",
    title: "Hagere Admin",
    description: "Admin dashboard for managing products, orders, and analytics.",
    longDescription:
      "Hagere Admin is a comprehensive admin dashboard that allows administrators to manage products, track orders, and analyze sales performance in real-time.",
    image: admin2,

    tags: ["React", "Node.js", "mongoDB", "chapa", "Redux", "Tailwind CSS", "Chart.js"],
    category: "Web App",
    liveUrl: "https://dashboard.hagereshop.esmaelhussen.online/admin/login",
    githubUrl: "https://github.com/esmaelhussen/Hagere-shop-dashboard",
    features: [
      "Manage all users (customers, sellers, and other admins)",
      "multi-language",
      "Approve, block, or suspend seller accounts",
      "Dashboard analytics with charts for real-time business insights",
      "Control system-wide settings and permissions",
    ],
    challenges:
      "Handling large-scale administrative operations (users, sellers, products, and orders) while keeping the dashboard responsive and preventing performance degradation as data volume grows.",

    solutions:
      "Implemented optimized API pagination, server-side filtering, and role-based access control with efficient caching strategies to reduce load time and improve dashboard responsiveness.",

    lessons:
      "Admin systems scale only when data flow is controlled—pagination, filtering, and strict access rules are essential to keep complex dashboards fast and maintainable.",
    gallery: [admin2, admin3, admin4],
  },
  {
    slug: "Stock Management System",
    title: "Stock Management System",
    description: "A comprehensive solution for managing inventory and stock levels.",
    longDescription:
      "The Stock Management System is a web-based application designed to help businesses efficiently manage their inventory, track stock levels, and optimize supply chain operations.",
    image: stock1,
    tags: ["Next.js", "TypeScript", "nestjs", "postgreSQL", "Tailwind CSS", "REST API"],
    category: "Web App",
    liveUrl: "https://stock.esmaelhussen.online/login",
    githubUrl: "https://github.com/esmaelhussen/stock-managment-frontend",
    features: [
      "Role-based access control (Admin, Manager, Staff) to ensure secure and restricted system operations.",
      "Stock transaction system to handle stock in/out operations with full audit history.",
      "Secure RESTful APIs for managing products, inventory, and user roles.",
      "Search and filter functionality for quick product and stock lookup.",
      "Responsive admin dashboard for managing all stock operations from desktop and mobile devices.",
    ],
    challenges:
      "Designing a scalable role-based stock management system that maintains data consistency across multiple users performing simultaneous inventory updates.",

    solutions:
      "Implemented transactional stock operations with secure RESTful APIs, role-based access control, and optimized database queries to ensure accurate and consistent inventory tracking.",

    lessons:
      "Strong backend design and proper access control are critical in inventory systems—data integrity matters more than feature complexity when multiple users interact with the same resources.",
    gallery: [stock2, stock3, stock4],
  },
  // {
  //   slug: "echo-chat",
  //   title: "Echo Chat",
  //   description: "End-to-end encrypted team chat with realtime collaboration.",
  //   longDescription:
  //     "Echo is a Slack alternative for security-conscious teams. End-to-end encryption, self-hostable, and built around fast keyboard-driven UX.",
  //   image: cover("1531403009284-440f080d1e12"),
  //   tags: ["React", "Node.js", "WebSockets", "PostgreSQL", "Docker"],
  //   category: "SaaS",
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com",
  //   features: [
  //     "End-to-end encryption (Signal protocol)",
  //     "Threaded conversations",
  //     "Realtime cursor presence in docs",
  //     "Self-host or cloud",
  //     "Keyboard-first UX",
  //   ],
  //   challenges: "Implementing E2EE while keeping search and notifications working at scale.",
  //   solutions:
  //     "Hybrid model: clients index encrypted content locally and push encrypted search tokens to the server.",
  //   lessons:
  //     "Security UX is hard. If users can't tell what's encrypted, they'll assume nothing is.",
  //   gallery: [
  //     cover("1531403009284-440f080d1e12"),
  //     cover("1551434678-e076c223a692"),
  //     cover("1517245386807-bb43f82c33c4"),
  //   ],
  // },
  // {
  //   slug: "lumen-blog",
  //   title: "Lumen Blog Engine",
  //   description: "Markdown-first blogging engine with built-in editorial workflow.",
  //   longDescription:
  //     "Lumen is a self-hosted, markdown-first blogging engine with a clean writing experience, editorial workflow, and an opinionated reading layout.",
  //   image: cover("1499750310107-5fef28a66643"),
  //   tags: ["Next.js", "TypeScript", "MDX", "PostgreSQL"],
  //   category: "Open Source",
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com",
  //   features: [
  //     "Distraction-free MDX editor",
  //     "Editorial workflow (draft → review → publish)",
  //     "Built-in RSS & sitemap",
  //     "Image optimization pipeline",
  //     "Comments with moderation",
  //   ],
  //   challenges:
  //     "Designing a writing experience that felt as fluid as a native app inside the browser.",
  //   solutions:
  //     "Built a custom editor on top of TipTap with carefully tuned keyboard shortcuts and slash commands.",
  //   lessons: "Writers will adopt a tool the moment it disappears. Friction is the only enemy.",
  //   gallery: [
  //     cover("1499750310107-5fef28a66643"),
  //     cover("1455390582262-044cdead277a"),
  //     cover("1432821596592-e2c18b78144f"),
  //   ],
  // },
];
