import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./component/commonForComplain/LoadingSpinner";


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

  const {data:authUser, isLoading} = useQuery({
		queryKey: ['authUser'],
		queryFn: async()=>{
			try{
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				if(data.error) return null;
				if(!res.ok){
					throw new Error(data.error || "Something went wrong ");
				}
				// console.log( "auth user is here : ", data);
				return data;
			}catch(error){
				throw new Error(error);
			}
		},
		retry:false,
	});
	if(isLoading){
		return (
			<div className="h-screen flex justify-center items-center" >
				<LoadingSpinner size='lg'/>
			</div>
		)
	}

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
                <Route path="/complain" element={authUser? <Complain /> : <Navigate to="/login"/>} />
                <Route path="/notification" element={authUser? <Notification/> : <Navigate to="/"/>} />
             
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
              <Route path="/" element={<Home />} /> 
              <Route path="/login" element={!authUser? <Login />:<Navigate to="/complain"/>} /> 
              <Route path="/signup" element={!authUser?<SignUp />:<Navigate to="/login"/>} /> 
              <Route path="/contact" element={<Contact />} /> 
              <Route path="/notes" element={<Notes />} /> 
              <Route path="/app" element={<AppLink />} />
              <Route path="/roadmap" element={<Roadmap />} /> 
            </Routes>
            
            {/* Footer */}
            {!hideFooterRoutes.includes(location.pathname) && <Footer />}
          </div>
        )}
      </>

      {/* Gradient button that remains on all pages */}
      <ButtonGradient />
      <Toaster/>
    </>
  );
};

export default App;
