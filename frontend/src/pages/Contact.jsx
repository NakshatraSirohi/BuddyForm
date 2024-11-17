import { useState } from "react";
import Section from "../component/Section";
import Button from "../component/Button";
import Heading from "../component/Heading";
import gridBackground from "../assets/grid.png";
import policy from "../assets/paper.jpg";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    
    message: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Section id="contact">
      <div className="container">
        <Heading
          title="Contact Us"
          text="We would love to hear from you. Please fill out the form below."
        />
        <div className="relative z-1 flex justify-center items-center h-[46rem] p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
            <img
              src={policy}
              className="object-cover opacity-30"
              alt="Policy GIF"
              height={930}
            />
          </div>
          <div className="relative z-1 max-w-[32rem]">
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="mt-7 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border rounded-2xl p-3 mb-5 w-full bg-cover"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="mt-7 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border rounded-2xl p-3 mb-5 w-full bg-cover"
                />
              </div>

             

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="mt-7 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border rounded-2xl p-3 w-full bg-cover"
                  style={{
                    backgroundImage: `url(${gridBackground})`,
                    backgroundSize: "cover",
                  }}
                  rows={6}
                  placeholder="Type your message..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex mt-6 justify-center">
                <Button>Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactForm;
