export const COMPLAINTS = [
    {
      _id: "1",
      text: "The WiFi in our building is constantly down! Please fix it ASAP! ⚠️",
      img: "../../../public/cover.png",  // Image representing the complaint
      
      user: {
        rollNo: "2301420100153", // Roll number as unique identifier
        profileImg: "/avatars/boy1.png", // Avatar image
      },
      likes: ["6658s891", "6658s892", "6658s893"],
    },
    {
      _id: "2",
      text: "The classroom projector isn't working! 😩 Can someone fix it before the lecture?",
      img: "../../../public/cover.png",
      user: {
        rollNo: "2301420100154",
        profileImg: "/avatars/girl1.png",
      },
      likes: ["6658s893", "6658s894", "6658s895", "6658s896"],
    },
    {
      _id: "3",
      text: "I need help with my assignment submission. It’s not working, please check. 🤔",
      user: {
        rollNo: "2301420100155",
        profileImg: "/avatars/boy2.png",
      },
      likes: ["6658s897", "6658s898"],
    },
    {
      _id: "4",
      text: "The AC in the computer lab is not cooling properly. It's way too hot in here. 🔥",
      img:"../../../public/cover.png",
      video: "/complaints/ac-issue.mp4",  // Video showing the issue
      user: {
        rollNo: "2301420100156",
        profileImg: "/avatars/girl2.png",
      },
      likes: [
        "6658s899", "6658s900", "6658s901", "6658s902",
      ],
    },
    {
      _id: "5",
      text: "There’s a broken chair in the library. Someone might get hurt! Please fix it ASAP! ⚠️",
      img: "../../../public/cover.png", // Image of the broken chair
      user: {
        rollNo: "2301420100157",
        profileImg: "/avatars/boy3.png",
      },
      likes: ["6658s903", "6658s904", "6658s905"],
    },
  ];