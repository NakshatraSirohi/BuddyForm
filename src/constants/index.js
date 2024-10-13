
import homeSmile from '../assets/parallox/home-smile.svg';
import file02 from '../assets/parallox/file-02.svg';
import searchMd from '../assets/parallox/search-md.svg';
import plusSquare from '../assets//parallox/plus-square.svg';
export const heroIcons = [homeSmile, file02, searchMd, plusSquare];


import notification2 from "../assets/notification/image-2.png"
import notification3 from "../assets/notification/image-3.png"
import notification4 from "../assets/notification/image-4.png"
export const notificationImages = [notification4, notification3, notification2];


export const navigation = [
  { id: 0, title: "Home", url: "/" },
  { id: 1, title: "Complain", url: "/complain" },
  { id: 2, title: "DashBoard", url: "/dashboard" }, 
  { id: 3, title: "Contact", url: "/contact" },
  { id: 4, title: "New account", url: "#signup", onlyMobile: true },
  { id: 5, title: "Sign in", url: "#login", onlyMobile: true },
];


import yourlogo from '../assets/Stats.png'
export const counter = [yourlogo];


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
      title: "Features",
      text: "Explore a variety of features designed to enhance your student experience, from easy note sharing to a streamlined complaint system.",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage2,
      light:true,
      buttonText: "Discover Features", 
    },
  ];
  

  export const collabText = 
  "Effortlessly access, share, and collaborate on course notes, providing a seamless academic resource hub for students.";

  export const collabContent = [
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

  import msgg from '../assets/collaboration/msgg.svg';
  import notion from '../assets/collaboration/notion.png';
  import discord from '../assets/collaboration/discord.png';
  import discuss from '../assets/collaboration/discuss.svg';
  import files from '../assets/collaboration/userProIcon.svg';
  import userProIcon from '../assets/collaboration/msgg.svg';
  import codeBlock from '../assets/collaboration/codeBlock.svg';
  import helpCenter from '../assets/collaboration/helpCenter.svg';

  
  export const collabApps = [
    {
      id: "0",
      title: "Feedback",
      icon: msgg, 
      width: 36,
      height: 26,
      url: "/contact", 
    },
    {
      id: "1",
      title: "Notion",
      icon: notion,
      width: 34,
      height: 36,
      url: "https://www.notion.so", 
    },
    {
      id: "2",
      title: "Discord",
      icon: discord,
      width: 36,
      height: 28,
      url: "https://discord.com", 
    },
    {
      id: "3",
      title: "Notes",
      icon: discuss,
      width: 36,
      height: 36,
      url: "/notes", 
    },
    {
      id: "4",
      title: "Documents",
      icon: files, 
      width: 34,
      height: 34,
      url: "/documents", 
    },
    {
      id: "5",
      title: "User Profiles",
      icon: userProIcon, 
      width: 34,
      height: 34,
      url: "/profiles", 
    },
    {
      id: "6",
      title: "Code Block",
      icon: codeBlock, 
      width: 26,
      height: 26,
      url: "/code-block", 
    },
    {
      id: "7",
      title: "Help Center",
      icon: helpCenter, 
      width: 34,
      height: 34,
      url: "/help",   
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
      // Add a special flag to show "Other" input field conditionally
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
  

  
  