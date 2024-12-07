/* eslint-disable react/prop-types */
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const OComplain = ({ complaint }) => {
  const queryClient = useQueryClient();


  // Fetch authenticated user data
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // Upvote mutation
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
      queryClient.invalidateQueries({ queryKey: ["complaints"] }); // Refetch complaints not a good method bcz whole page is loading
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });


  // Delete mutation
  const { mutate: deleteComplaint, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/complaints/${complaint._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete complaint");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Complaint deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["complaints"] }); // Refetch complaints
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Check if the user is authorized to delete this complaint
  const isMyComplaint = authUser?._id === String(complaint.user);

  // Handle upvote
  const handleUpvote = () => {
    if (isUpvoting) return;
    upvoteC();
  };

  // Handle delete
  const handleDelete = () => {
    if (isDeleting) return;
    deleteComplaint();
  };

  // Ensure likes count is valid
  const likesCount = (complaint.upvotes || []).length;
  const isUpvoted = (complaint.upvotes || []).includes(authUser?._id);

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
          <strong>Category:</strong> {complaint.categories || "Not available"}
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

      {/* Actions: Upvote and Delete */}
      <div className="flex justify-around items-center mt-3 ml-11 mr-11">
        {/* Upvote Button */}
        <button
          className={`flex items-center gap-1 text-lg ${
            isUpvoted ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={handleUpvote}
        >
          <FaThumbsUp className="w-7 h-7" />
          <span>{likesCount}</span>
        </button>

        {/* Delete Button (Visible only to the complaint owner) */}
        {isMyComplaint && (
          <span className='flex justify-end flex-1'>
          {!isDeleting && <FaTrash className='cursor-pointer hover:text-red-500' 
          onClick={handleDelete} />}
          {isDeleting && (
            <LoadingSpinner size="sm"/>
          )}
        </span>
        )}
      </div>
    </div>
  );
};

export default OComplain;
