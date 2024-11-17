import { FaThumbsUp } from "react-icons/fa";  // Thumbs up icon for upvote
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const OComplain = ({ complaint }) => {
  const [isLiked, setIsLiked] = useState(false); 

  // Handle upvote
  const handleUpvote = () => {
    setIsLiked((prevState) => !prevState); 
  };

  return (
    <div className="p-7 border-b border-gray-700 flex flex-col gap-7">
    
      <div className="font-bold text-xl text-center text-info">{complaint.title}</div>
      
      <div className="text-md text-center">{complaint.description}</div>
      
      {/* Categories and Severity in the same row */}
      <div className="flex justify-between items-center text-sm text-secondary">
        <div>
          <strong>Severity:</strong> {complaint.severity}
        </div>
        <div>
          <strong>Category:</strong> {complaint.category}
        </div>
      </div>

      {/* Image (if any) */}
      {complaint.img && (
        <img
          src={complaint.img}
          className="h-60 object-cover rounded-lg border border-gray-700 mt-3"
          alt="Complaint Image"
        />
      )}

      {/* Upvote Section */}
      <div className="flex gap-2 justify-center items-center mt-3">
        <button
          className={`flex items-center gap-1 text-lg ${isLiked ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={handleUpvote}
        >
          <FaThumbsUp className="w-7 items-center h-7" />
          <span>{complaint.likes.length + (isLiked ? 1 : 0)}</span>
        </button>
      </div>
    </div>
  );
};

// Adding PropTypes for validation
OComplain.propTypes = {
  complaint: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,  // Validating severity
    category: PropTypes.string.isRequired,  // Validating category
    img: PropTypes.string,  // Optional image field
    user: PropTypes.shape({
      rollNo: PropTypes.string.isRequired,
      profileImg: PropTypes.string,
    }).isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,  // Likes is an array of strings (user IDs)
  }).isRequired,
};

export default OComplain;
