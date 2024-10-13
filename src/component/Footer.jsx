import Section from './Section';
import MainLogo from '../assets/MainLogo.png';
import Button from './Button';
import Arrow from '../assets/svg/Arrow';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10 text-n-2">
      <div className="container flex justify-around items-center gap-10 max-sm:flex-col">
       
        <div className="  ">
          <a href="#hero">
            <img src={MainLogo} width={230} height={28} alt="Buddy Forum Logo" />
          </a>
          <Button className="w-[12rem] mb-6 mt-5" white>
            App Link
          </Button>
        </div>

       
        <div className="items-center">
          <div className="flex flex-col justify-center">
            <h5 className="h5 mb-8 text-center">Our Team</h5>
            <div className="flex flex-wrap justify-center gap-x-10">
              <div className="flex flex-col mb-6">
                <a href="https://github.com/nakshatra" className="mb-4 flex items-center text-n-3">
                  <Arrow /> Nakshatra
                </a>
                <a href="https://github.com/ritik" className="mb-4 flex items-center text-n-3">
                  <Arrow /> Ritik
                </a>
                <a href="https://github.com/prabhakar" className="mb-4 flex items-center text-n-3">
                  <Arrow /> Prabhakar
                </a>
               
              </div>

              <div className="flex flex-col mb-6">
              <a href="https://github.com/robin" className="mb-4 flex items-center text-n-3">
                  <Arrow /> Robin
                </a>
               
                <a href="https://github.com/namrata" className="mb-4 flex items-center text-n-3">
                  <Arrow /> Namrata
                </a>
                <a href="https://github.com/neha" className="mb-4 flex items-center text-n-3">
                  <Arrow /> Neha Ojha
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col items-center gap-4">
          <h5 className="h5 mb-4 text-center">Follow Us</h5>
          <div className="flex gap-4">
            <a href="https://facebook.com" className="text-n-3" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" className="text-n-3" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" className="text-n-3" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="https://instagram.com" className="text-n-3" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <p className="mt-6 text-center text-n-2 whitespace-nowrap">© {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </Section>
  );
};

export default Footer;
