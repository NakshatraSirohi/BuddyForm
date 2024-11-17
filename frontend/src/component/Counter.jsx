import { counter } from "../constants/index.js";
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Counter = () => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <div>
      <h5 className=" h4 mb-6 text-center text-n-1/50">Success in numbers</h5>
      
        <ul className="flex">
          {counter.map((logo, index) => (
            <li
              className="flex items-center justify-around flex-1  h-[8.5rem]"
              key={index}
            >
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
                  <p className="mt-2 text-lg">Successful Complains</p>
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
                  <p className="mt-2 text-lg">Registered Complains</p>
                </ScrollTrigger>
              </div>
              <img className="hidden lg:block" src={logo} width={184} height={28} alt={logo} />
            </li>
          ))}
        </ul>
      </div>
  
  );
};

export default Counter;
