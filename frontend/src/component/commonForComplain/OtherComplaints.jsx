import { useState, useEffect } from "react";
import OComplain from "./OComplain";
import OtherComplainSkeleton from "../skeletons/OtherComplainSkeleton";
import PropTypes from "prop-types";
import { COMPLAINTS } from "../../utils/db/dummy";

const OtherComplaints = ({ feedType }) => {
	const [userComplaints, setUserComplaints] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Simulate fetching data based on feedType
	useEffect(() => {
		// Simulate loading state
		setIsLoading(true);
		setTimeout(() => {
			// Filter complaints based on feedType
			if (feedType === "yourComplaints") {
				
				const userComplaints = COMPLAINTS.filter(
					(complaint) => complaint.user.rollNo === "2301420100153" 
				);
				setUserComplaints(userComplaints);
			} else {
				setUserComplaints(COMPLAINTS); 
			}
			setIsLoading(false);
		}, 1000); 
	}, [feedType]);

	return (
		<>
			{isLoading ? (
				<div className="flex flex-col justify-center">
					<OtherComplainSkeleton />
					<OtherComplainSkeleton />
					<OtherComplainSkeleton />
				</div>
			) : userComplaints.length === 0 ? (
				<p className="text-center my-4">No complaints in this category. 👻</p>
			) : (
				<div>
					{userComplaints.map((complaint) => (
						<OComplain key={complaint._id} complaint={complaint} />
					))}
				</div>
			)}
		</>
	);
};

OtherComplaints.propTypes = {
  feedType: PropTypes.oneOf(["allComplaints", "yourComplaints"]).isRequired,  // Define possible values for feedType
};

export default OtherComplaints;
