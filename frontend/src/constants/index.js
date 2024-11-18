

export const navigation = [
  { id: 0, title: "Home", url: "/" },
  { id: 1, title: "Notes", url: "/notes" },
  { id: 2, title: "RoadMap", url: "/roadmap" }, 
  { id: 3, title: "Contact", url: "/contact" },
  { id: 4, title: "New account", url: "#signup", onlyMobile: true },
  { id: 5, title: "Sign in", url: "#login", onlyMobile: true },
];


import benefitIcon1 from '../assets/benefits/icon-1.svg'
import benefitIcon2 from '../assets/benefits/icon-2.svg'
import benefitIcon3 from '../assets/benefits/icon-3.svg'
import benefitImage2 from '../assets/benefits/image-2.jpg'


export const benefits = [
    {
      id: "0",
      title: "Complain",
      text: "Allow students to easily submit and track complaints using a user-friendly interface, ensuring that issues are addressed promptly and efficiently.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
      buttonText: "Submit a Complaint",
    },
    {
      id: "1",
      title: "Get Notes",
      text: "Easily access and share course notes with fellow students, ensuring you have the resources you need to succeed academically.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
      light: true,
      buttonText: "View Notes", 
    },
    {
      id: "2",
      title: "RoadMap",
      text: "Explore our initiatives, future plans, and key milestones. Our roadmap outlines ongoing projects, upcoming features, and implementation timelines.",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage2,
      light: true,
      buttonText: "View Roadmap", 
    },
  ];
  

  export const notesText = 
  "Effortlessly access, share, and collaborate on course notes, providing a seamless academic resource hub for students.";

  export const notesContent = [
    {
      id: "0",
      title: "Access a vast library of course notes and materials with ease.",
    },
    {
      id: "1",
      title: "Seamlessly share and collaborate on notes with fellow students.",
      
    },
    {
      id: "2",
      title: "Quickly find essential study resources for every subject.",
    },
    {
      id: "3",
      title: "All your notes stored securely in one organized platform.",
    },
  ];

  import pythonIcon from '../assets/notesIcon/pythonIcon.png';
  import c from '../assets/notesIcon/c.png';
  import sql from '../assets/notesIcon/sql.png';
  import jsIcon from '../assets/notesIcon/javascriptIcon.png';
  import  htmlIcon from '../assets/notesIcon/html.png';
  import viteIcon from '../assets/notesIcon/vite.svg';
  import javaIcon from '../assets/notesIcon/javaIcon.svg';
  import helpCenter from '../assets/notesIcon/helpCenter.svg';

  
  export const notesApps = [
    {
      id: "0",
      title: "Python Notes",
      icon: pythonIcon, 
      width: 36,
      height: 36,
      url: "/notes/python", 
    },
    {
      id: "1",
      title: "Java Notes",
      icon: javaIcon, 
      width: 36,
      height: 36,
      url: "/notes/java",
    },
    {
      id: "2",
      title: "JavaScript Notes",
      icon: jsIcon, 
      width: 36,
      height: 36,
      url: "/notes/javascript", 
    },
    {
      id: "3",
      title: "HTML Notes",
      icon: htmlIcon, 
      width: 36,
      height: 36,
      url: "/notes/react",
    },
    {
      id: "4",
      title: "Vite Notes",
      icon: viteIcon, 
      width: 36,
      height: 36,
      url: "/notes/vite", 
    },
    {
      id: "5",
      title: "helpCenter",
      icon: helpCenter, 
      width: 36,
      height: 36,
      url: "/notes/nodejs", 
    },
    {
      id: "6",
      title: "Course Notes",
      icon: c,
      width: 36,
      height: 36,
      url: "/notes/html-css", 
    },
    {
      id: "7",
      title: "SQL Notes",
      icon: sql, 
      width: 36,
      height: 36,
      url: "/notes/database", 
    },
  ];
  



  import roadmap1 from '../assets/roadmap/image-1.png'
  import roadmap2 from '../assets/roadmap/image-2.png'
  import roadmap3 from '../assets/roadmap/image-3.png'
  import roadmap4 from '../assets/roadmap/image-4.png'

  export const roadmap = [
    {
      id: "0",
      title: "AI Integration for Complaint Categorization",
      text: "Implement AI to automatically categorize and prioritize complaints based on content and user votes, improving the response time from relevant authorities.",
      date: "April 2025",
      status: "progress",
      imageUrl: roadmap1,
      colorful: true,
    },
    {
      id: "1",
      title: "Gamification",
      text: "Incorporate game-like elements such as badges, leaderboards, and rewards for students who actively participate by submitting complaints or upvoting others' issues. This will encourage more engagement.",
      date: "February 2025",
      status: "planned",
      imageUrl: roadmap2,
    },
    {
      id: "2",
      title: "Chatbot Customization",
      text: "Allow users to interact with a customized chatbot that can provide personalized responses to complaint status, note sharing, and placement preparation tips.",
      date: "December 2024",
      status: "done",
      imageUrl: roadmap3,
      
    },
    {
      id: "3",
      title: "Coding Blocks and Resource Sharing",
      text: "Implement a feature for students to submit, share, and access code snippets, notes, and other study materials seamlessly. This section will have a built-in code editor for direct use.",
      date: "January 2025",
      status: "planned",
      imageUrl: roadmap4,
      colorful: true,
    },
   
  ];
  

  export const complainFormInput = [
    {
      type: "text",
      id: "name",
      label: "Name",
      placeholder: "Enter your name",
      required: true,
    },
    {
      type: "email",
      id: "emailId",
      label: "Email Id",
      placeholder: "Enter email",
      required: true,
    },
   
    {
      type: "select",
      id: "subject",
      label: "Subject",
      options: [
        { value: "", label: "Select a subject" },
        { value: "Bug Report", label: "Bug Report" },
        { value: "Feature Request", label: "Feature Request" },
        { value: "General Inquiry", label: "General Inquiry" },
        { value: "Other", label: "Other" },
      ],
      required: true,
     
      showOtherInput: true,
    },
    
    {
      type: "textarea",
      id: "description",
      label: "Description/Attachments",
      placeholder: "Describe your issue or attach a file...",
      rows: 6,
      required: true,
    
    },
  ];
  
  
  export const oldComplaints = [
    {
      id: "0",
      title: "Fees Related Problem",
      text: "Issues regarding late fee submission or incorrect fees charged.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      buttonText: "5 Votes",
    },
    {
      id: "1",
      title: "Books Not Available",
      text: "Important textbooks or reference materials are not available in the library.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      buttonText: "7 Votes",
    },
    {
      id: "2",
      title: "WiFi Issues",
      text: "Frequent disconnections and low speeds affecting the campus WiFi.",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      buttonText: "15 Votes",
    },
    {
      id: "3",
      title: "Hostel Room Cleanliness",
      text: "Complaints regarding improper or irregular cleaning of hostel rooms.",
      backgroundUrl: "./src/assets/benefits/card-4.svg",
      buttonText: "23 Votes",
    },
    {
      id: "4",
      title: "Mess Food Quality",
      text: "Poor quality food being served in the mess affecting student health.",
      backgroundUrl: "./src/assets/benefits/card-5.svg",
      buttonText: " 12 Votes",
    },
    {
      id: "5",
      title: "Lab Equipment Not Functioning",
      text: "Complaints about malfunctioning lab equipment affecting practicals.",
      backgroundUrl: "./src/assets/benefits/card-6.svg",
      buttonText: " 12 Votes",
    },
  ];
  

  
  