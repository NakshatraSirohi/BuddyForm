import { Routes, Route, useLocation } from "react-router-dom";

// Import pages
import Home from "./pages/homePage/Home";
import Login from "./pages/auth/LoginPage";
import SignUp from "./pages/auth/SignUp";
import Complain from "./pages/complain/Complain";
import Contact from "./pages/Contact";

import Notification from "./pages/notification/NotificationPage";
import Notes from "./pages/Notes";
import AppLink from "./pages/AppLink";
import Roadmap from "./pages/Roadmap";

// Components for all pages
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";
import Sidebar from "./component/commonForComplain/SideBar";

const App = () => {
  const location = useLocation(); 

  // Define routes where the header and footer should be hidden
  const hideHeaderRoutes = ["/login", "/signup"];
  const hideFooterRoutes = ["/login", "/signup"];
  const sidebarRoutes = ["/complain", "/notification", "/yourComplain"];

  return (
    <>
      <ScrollToTop />
      <>
        {/* Sidebar and Complain page specific layout */}
        {sidebarRoutes.includes(location.pathname) ? (
          <div className="flex pt-4 md:ml-10 max-w-6xl">
            {/* Sidebar */}
            <Sidebar />
            {/* Main content */}
            <div className="flex-1">
              <Routes>
                <Route path="/complain" element={<Complain />} />
                <Route path="/notification" element={<Notification/>} />
             
              </Routes>
            </div>
          </div>
        ) : (
          // Default layout for other pages
          <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
            {/* Header */}
            {!hideHeaderRoutes.includes(location.pathname) && <Header />}
            
            {/* Routes for pages */}
            <Routes>
              <Route path="/" element={<Home />} /> {/* Homepage */}
              <Route path="/login" element={<Login />} /> {/* Login page */}
              <Route path="/signup" element={<SignUp />} /> {/* Signup page */}
              <Route path="/contact" element={<Contact />} /> {/* Contact page */}
              <Route path="/notes" element={<Notes />} /> {/* Notes page */}
              <Route path="/app" element={<AppLink />} /> {/* App page */}
              <Route path="/roadmap" element={<Roadmap />} /> {/* Roadmap page */}
            </Routes>
            
            {/* Footer */}
            {!hideFooterRoutes.includes(location.pathname) && <Footer />}
          </div>
        )}
      </>

      {/* Gradient button that remains on all pages */}
      <ButtonGradient />
    </>
  );
};

export default App;
