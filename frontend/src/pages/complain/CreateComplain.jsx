import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../../component/Button";
import { useMutation,useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const CreateComplain = () => {
  const [title, setTitle] = useState(""); 
  const [text, setText] = useState(""); 
  const [img, setImg] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories
  const [isOtherSelected, setIsOtherSelected] = useState(false); // State to track "Other" category selection
  const [otherCategory, setOtherCategory] = useState(""); // State for "Other" category input
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility
  const imgRef = useRef(null);

  const categories = [
    "General Issue",
    "Service Complaint",
    "Late Response",
    "Facilities Issue",
    "academic",
    "technical",
  ];

  useQuery({queryKey : ["authUser"]})
	const queryClient = useQueryClient();

  const {
    mutate: createComplaint,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async ({ title, text, img, categories }) => {
      try {
        
        const res = await fetch("/api/complaints/create", {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, text, img, categories }),
        });
        
        console.log("Response Status:", res.status); 
        const data = await res.json();
        console.log("Response Data:", data); // Log response data
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong while submitting the complaint.");
        }

        return data;
      } catch (error) {
        throw new Error(error.message || "An error occurred.");
      }
    },

    onSuccess: () => {
      
      setTitle(""); // Reset title input
      setText(""); // Reset text input
      setImg(null); // Reset image
      setSelectedCategories([]);

      toast.success("Complaint submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["complaints"] }); 
    },

    onError: () => {
      
      toast.error("Failed to submit the complaint, please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 

    createComplaint({
        title,
        text,
        img,
        categories: selectedCategories,

    });
};


  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelect = (category) => {
    if (category === "Other") {
      setIsOtherSelected(true);
      setSelectedCategories([]); // Reset selected categories when 'Other' is selected
    } else {
      if (!selectedCategories.includes(category)) {
        setSelectedCategories([...selectedCategories, category]);
      }
      setDropdownOpen(false); // Close the dropdown after selection
    }
  };
  
  const handleOtherSubmit = () => {
    if (otherCategory.trim()) {
      // Validate custom category
      const validCategory = /^[a-zA-Z0-9\s]+$/.test(otherCategory.trim());  // Example of simple validation
      if (validCategory) {
        setSelectedCategories([...selectedCategories, otherCategory.trim()]);
        setIsOtherSelected(false);
        setOtherCategory("");
      } else {
        toast.error("Please enter a valid category.");
      }
    }
  };
  
  
  const removeCategory = (categories) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== categories));
  };

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src="/avatar-placeholder.png" alt="Profile" />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        {/* Title Input Section */}
        <input
          type="text"
          className="w-full p-2 mb-2  text-lg focus:outline-none border-b border-gray-800 bg-transparent placeholder-gray-500"
          placeholder="Enter the title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Complaint Description */}
        <textarea
          className="textarea w-full ml-2 p-0 text-lg resize-none border-none focus:outline-none border-gray-800"
          placeholder="Describe your complaint..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Dropdown for categories */}
        <div
          className="dropdown flex border-t border-t-gray-700 mt-2 relative"
          onClick={(e) => {
            e.stopPropagation(); // Prevent toggling dropdown unnecessarily
            setDropdownOpen((prev) => !prev);
          }}
        >
          {!isOtherSelected && (
            <>
              <div tabIndex={0} role="button" className="btn m-1">
                Select Category
              </div>
              {dropdownOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow absolute"
                  onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing on internal clicks
                >
                  {categories.map((categories, index) => (
                    <li key={index}>
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategorySelect(categories); // Add selected category
                        }}
                      >
                        {categories}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect("Other"); // Select "Other"
                      }}
                    >
                      Other
                    </a>
                  </li>
                </ul>
              )}
            </>
          )}

          {/* Input for "Other" category */}
          {isOtherSelected && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your category..."
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOtherSubmit}
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Selected categories displayed as hashtags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedCategories.map((categories, index) => (
            <span
              key={index}
              className="bg-gray-700 text-white px-2 py-1 rounded-full flex items-center gap-1 text-sm"
            >
              #{categories}
              <IoCloseSharp
                className="cursor-pointer"
                onClick={() => removeCategory(categories)}
              />
            </span>
          ))}
        </div>

        {/* If an image is selected, show the preview and the remove button */}
        {img && (
          <div className="relative w-72 mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={img}
              alt="Preview"
              className="w-full mx-auto h-72 object-contain rounded"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between border-t py-2 border-t-gray-700 mt-4">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-info w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-info w-5 h-5 cursor-pointer" />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
          />
          <Button className="animate-slideUp">
            {isPending ? "Submitting..." : "Submit Complaint"}
          </Button>
        </div>
        {isError && (
          <div className="text-red-500">
            Something went wrong. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateComplain;
