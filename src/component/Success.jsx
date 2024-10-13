import Heading from "./Heading";
import Section from "./Section";
import { GradientLight } from "./design/Benefits";
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";

const Success = () => {
  const [counterOn, setCounterOn] = useState(false);

 
  const iconLinks = [
    "https://example.com/complaint1", 
    "https://example.com/complaint2",
    "https://example.com/complaint3",
    "https://example.com/complaint4",
    "https://example.com/complaint5",
  ];

  return (
    <Section crosses className="!px-0 !py-10 text-n-2 ">
      <Heading title="Success In Numbers" />
      <div className="relative max-w-[23rem] mx-auto md:max-w-5xl mb-12">
        <ScrollParallax isAbsolutelyPositioned>
        <GradientLight/>
          <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
            {heroIcons.map((icon, index) => (
              <li className="p-5" key={index}>
               
                <a href={iconLinks[index]} target="_blank" rel="noopener noreferrer">
                
                  <img src={icon} width={24} height={25} alt={`Icon ${index + 1}`} />
                </a>
              </li>
            ))}
          </ul>
        </ScrollParallax>
      </div>

      <div>
        <div className="flex justify-around flex-wrap ">
          <div className="text-center">
            <ScrollTrigger
              onEnter={() => setCounterOn(true)}
              onExit={() => setCounterOn(false)}
            >
              <h3 className="text-5xl font-bold">
                {counterOn && (
                  <CountUp start={0} end={100} duration={2} delay={0} />
                )}
                +
              </h3>
              <p className="mt-2 text-lg">Successful Complaints</p>
            
            </ScrollTrigger>
          </div>

          <div className="text-center">
            <ScrollTrigger
              onEnter={() => setCounterOn(true)}
              onExit={() => setCounterOn(false)}
            >
              <h3 className="text-5xl font-bold">
                {counterOn && (
                  <CountUp start={0} end={50} duration={2} delay={0} />
                )}
                +
              </h3>
              <p className="mt-2 text-lg">Registered Complaints</p>
            </ScrollTrigger>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Success;
