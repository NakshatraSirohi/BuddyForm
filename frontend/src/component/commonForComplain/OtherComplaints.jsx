/* eslint-disable react/prop-types */
import OComplain from "./OComplain"; 
import OtherComplainSkeleton from "../skeletons/OtherComplainSkeleton";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const OtherComplaints = ({ feedType }) => {
  const getComplainEndPoint = () => {
    switch (feedType) {
      case "allComplaints":
        return "/api/complaints/"; // For all complaints
      case "yourComplaints":
        return `/api/complaints/your-complain`; // For user-specific complaints
      default:
        return "/api/complaints/"; // Default route
    }
  };

  const Complain_EndPoint = getComplainEndPoint();

  const {
    data: { complaints = [] } = {}, 
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      try {
        const res = await fetch(Complain_EndPoint);
        const data = await res.json();

        // console.log("Fetched Data:", data); 

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;  
      } catch (error) {

        console.error("Error fetching complaints:", error);

        throw error; // Rethrow error for React Query
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType,  refetch]);

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <OtherComplainSkeleton />
          <OtherComplainSkeleton />
          <OtherComplainSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && complaints?.length === 0 && (
        <p className="text-center my-4">No complaints in this category. 👻</p>
      )}
      {!isLoading && !isRefetching && complaints?.length > 0 && (
        <div>
          {complaints.reverse().map((complaint) => (
            <OComplain key={complaint._id} complaint={complaint} />
          ))}
        </div>
      )}
    </>
  );
};


export default OtherComplaints;
