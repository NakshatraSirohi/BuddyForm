/* eslint-disable react/prop-types */
import { FaThumbsUp } from "react-icons/fa";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";



// eslint-disable-next-line react/prop-types
const OComplain = ({ complaint }) => {

  const queryClient = useQueryClient();

  const {mutate:upvoteC, isPending:isUpvoting} = useMutation({
    mutationFn: async () => {
      const res = await fetch(`api/complaints/${complaint._id}/upvote`, {
        method: "POST",
      });
      
      const data = await res.json();
      console.log("Fetched Complaints:", data);
    
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
    
    onSuccess: (data) =>{
      queryClient.setQueryData(["complaints"], (oldData) => {
        const complaints = Array.isArray(oldData) ? oldData : [];

        return complaints.map((p) => {
          if (p._id === complaint._id) {
            return {
              ...p,
              upvotes: data.updatedUpvotes || [],  // Ensure updatedUpvotes is used here
            };
          }
          return p;
        });
      });
      
    },
    onError:(error) =>{
			toast.error(error.message)
		}
  })
  const {data:authUser} = useQuery({queryKey: ["authUser"]});
  const isUpvoted = (complaint.upvote || []).includes(authUser?._id);


  // Handle upvote
  const handleUpvote = () => {
    if(isUpvoting) return;
    upvoteC();
  };

  // Ensure likes is always an array
  const likesCount = (complaint.upvotes || []).length;

  return (
    <div className="p-7 border-b border-gray-700 flex flex-col gap-7">
      {/* Use complainText instead of title */}
      <div className="font-bold text-xl text-center text-info">
        {complaint.title}
      </div>
      <div className="text-md text-center">
        {complaint.complainText || 'No description available'} {/* Using complainText */}
      </div>
      
      {/* Categories and Severity in the same row */}
      <div className="flex justify-between items-center text-sm text-secondary">
        <div>
          <strong>Severity:</strong> {complaint.severity || 'Not available'}
        </div>
        <div>
          <strong>Category:</strong> {complaint.category || 'Not available'} {/* Handle category properly */}
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
          className={`flex items-center gap-1 text-lg ${isUpvoted? 'text-blue-500' : 'text-gray-500'}`}
          onClick={handleUpvote}
        >
          <FaThumbsUp className="w-7 items-center h-7" />
          <span>{likesCount}</span>
        </button>
      </div>
    </div>
  );
};

// Adding PropTypes for validation


export default OComplain;
