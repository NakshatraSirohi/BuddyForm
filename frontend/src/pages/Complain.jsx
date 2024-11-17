import { useState } from "react";
import Section from "../component/Section";
import Button from "../component/Button";
import Heading from "../component/Heading";
import gridBackground from "../assets/grid.png";
import policy from "../assets/paper.jpg";
import { complainFormInput } from "../constants/index.js";
import OldComplain from "../component/OldComplain.jsx";

const ComplainForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    feedbackId: "",
    subject: "",
    otherSubject: "", // Added for custom subject
    description: "",
    attachments: null,
  });

  const [showOtherSubject, setShowOtherSubject] = useState(false); // State to control "Other" subject input

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // Handle input changes for text, textarea, and otherSubject
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle subject selection (dropdown)
  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setFormData({
      ...formData,
      subject: selectedSubject,
      otherSubject: selectedSubject === "Other" ? formData.otherSubject : "", // Reset otherSubject if not "Other"
    });
    setShowOtherSubject(selectedSubject === "Other"); // Show "Other" field only if selected
  };

  // Handle file attachment
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: e.target.files[0],
    });
  };

  return (
    <Section id="complain">
      <div className="container">
        <Heading
          title="Register Your Complaint"
          text="Share your complaints and feedback to help shape a positive and collaborative community."
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
              {/* Render fields except description first */}
              {complainFormInput
                .filter((input) => input.id !== "description")
                .map((input, index) => (
                  <div key={index}>
                    <label htmlFor={input.id} className="mt-7 mb-7">
                      {input.label}
                    </label>

                    {input.type === "select" ? (
                      <select
                        id={input.id}
                        value={formData[input.id]}
                        onChange={handleSubjectChange} // Special handler for subject
                        className="border rounded-2xl p-3 mb-5 w-full bg-cover"
                      >
                        {input.options.map((option, i) => (
                          <option key={i} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : input.type === "textarea" ? (
                      <textarea
                        id={input.id}
                        value={formData[input.id]}
                        onChange={handleChange}
                        className="border rounded-2xl p-3 w-full bg-cover"
                        style={{
                          backgroundImage: `url(${gridBackground})`,
                          backgroundSize: "cover",
                        }}
                        rows={input.rows}
                        placeholder={input.placeholder}
                        required={input.required}
                      ></textarea>
                    ) : (
                      <input
                        type={input.type}
                        id={input.id}
                        placeholder={input.placeholder}
                        value={formData[input.id]}
                        onChange={handleChange}
                        required={input.required}
                        className="border rounded-2xl p-3 mb-5 w-full bg-cover"
                      />
                    )}
                  </div>
                ))}

              {/* Render "Other Subject" input if needed */}
              {showOtherSubject && (
                <div>
                  <label htmlFor="otherSubject" className="mt-7 mb-7">
                    Other Subject
                  </label>
                  <input
                    type="text"
                    id="otherSubject"
                    placeholder="Specify your subject"
                    value={formData.otherSubject}
                    onChange={handleChange}
                    required
                    className="border rounded-2xl p-3 mb-5 w-full bg-cover"
                  />
                </div>
              )}

              {/* Now render description after subject */}
              <div>
                <label htmlFor="description" className="mt-7 mb-7">
                  Description/Attachments
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded-2xl p-3 w-full bg-cover"
                  style={{
                    backgroundImage: `url(${gridBackground})`,
                    backgroundSize: "cover",
                  }}
                  rows={6}
                  placeholder="Describe your issue or attach a file..."
                  required
                ></textarea>
              </div>

              {/* File and Submit */}
              <div className="flex mt-6 justify-between items-center">
                <div>
                  <input
                    type="file"
                    id="attachments"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="attachments" className="cursor-pointer">
                    <Button white className="opacity-65 ">Attachments</Button>
                  </label>
                </div>

                <Button>Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <OldComplain/>
    </Section>
  );
};

export default ComplainForm;
  