import Section from "./Section";
import Button from "./Button";
import HeaderImage from "../assets/hero/HeaderAnimated.svg";
import curve from "../assets/hero/curve.png";

import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import Counter from "./Counter";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h3 mb-6 animate-zoomIn"> 
            Where student&apos;s concern <br />
            finds a solution:
            <br />
            <span className="h2 inline-block relative font-grotesk uppercase">
              BuddyForum{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 animate-slideUp">
            We lets you raise concerns, vote on issues, track progress, and
            more. <br /> Be heard and make a difference at your college.
          </p>
          <Button href="/complain" className='animate-slideUp' white>
            Complain
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl mb-12">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[35/] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/190] lg:aspect-[1024/625]">
                <img
                  src={HeaderImage}
                  width={1024}
                  height={490}
                />
                <Generating className="hidden absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>
                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Voting System"
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient className=" hidden " />
          </div>
          
          <BackgroundCircles />
        </div>
        <Counter className=" hidden  "/>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
