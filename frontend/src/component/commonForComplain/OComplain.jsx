/* eslint-disable react/prop-types */
import { FaThumbsUp } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const OComplain = ({ complaint }) => {
  const queryClient = useQueryClient();

  const { mutate: upvoteC, isPending: isUpvoting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/complaints/${complaint._id}/upvote`, {
        method: "POST",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      return res.json();
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["complaints"] }); // Refetch complaints
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const isUpvoted = (complaint.upvotes || []).includes(authUser?._id);

  // Handle upvote
  const handleUpvote = () => {
    if (isUpvoting) return;
    upvoteC();
  };

  // Ensure likes count is valid
  const likesCount = (complaint.upvotes || []).length;

  return (
    <div className="p-7 border-b border-gray-700 flex flex-col gap-7">
      {/* Complaint Title */}
      <div className="font-bold text-xl text-center text-info">
        {complaint.title}
      </div>
      <div className="text-md text-center">
        {complaint.complainText || "No description available"}
      </div>

      {/* Categories and Severity */}
      <div className="flex justify-between items-center text-sm text-secondary">
        <div>
          <strong>Severity:</strong> {complaint.severity || "Not available"}
        </div>
        <div>
          <strong>Category:</strong> {complaint.category || "Not available"}
        </div>
      </div>

      {/* Complaint Image */}
      {complaint.img && (
        <img
          src={complaint.img}
          className="h-60 object-cover rounded-lg border border-gray-700 mt-3"
          alt="Complaint Image"
        />
      )}

      {/* Upvote Button */}
      <div className="flex gap-2 justify-center items-center mt-3">
        <button
          className={`flex items-center gap-1 text-lg ${
            isUpvoted ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={handleUpvote}
        >
          <FaThumbsUp className="w-7 h-7" />
          <span>{likesCount}</span>
        </button>
      </div>
    </div>
  );
};

export default OComplain;
