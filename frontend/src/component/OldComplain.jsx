import Heading from "./Heading";
import Section from "./Section";
import { oldComplaints } from "../constants";
import ClipPath from "../assets/svg/ClipPath";
import { Link } from "react-router-dom";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import Button from "../component/Button";

const OldComplain = () => {
  return (
   <Section crosses>
       <Heading
        title="Vote On relavent Complain"
        />

        <div className="flex justify-center flex-wrap gap-8 mb-10"> 
        {oldComplaints.map((item) => (
            <div
              className="block relative p-2.5 bg-no-repeat bg-[length:100%_100%] max-w-[21rem] md:max-w-[22rem] group"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-10 flex flex-col min-h-[22rem] p-[2.4rem]">
                <h5 className="h5 mb-5">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto">
                  {/* Link to corresponding page */}
                  <Link to={item.id === "0" ? "/complain" : item.id === "1" ? "/notes" : "/features"}>
                    <Button>Upvote</Button>
                  </Link>
                  
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    {item.buttonText}
                  </p>
                  
                  <Link to={item.id === "0" ? "/complain" : item.id === "1" ? "/notes" : "/features"}>
                    <Arrow className="cursor-pointer" />
                  </Link>
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8 z-1"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
   </Section>
  )
}

export default OldComplain
