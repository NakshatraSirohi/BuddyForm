import { useState } from "react";

import OtherComplaints from "../../component/commonForComplain/OtherComplaints";
import CreatePost from "./CreateComplain";

const Complain = () => {
	const [feedType, setFeedType] = useState("allComplaints");

	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
				
				<div className='flex w-full border-b border-gray-700'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-primary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("allComplaints")}
					>
						All Complaints
						{feedType === "allComplaints" && (
							<div className='absolute bottom-0 w-20  h-1 rounded-full bg-info'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-primary transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("yourComplaints")}
					>
						Your Complaints
						{feedType === "yourComplaints" && (
							<div className='absolute bottom-0 w-20  h-1 rounded-full bg-info'></div>
						)}
					</div>
				</div>

				
				<CreatePost />

				
				<OtherComplaints feedType={feedType} />
			</div>
		</>
	);
};
export default Complain;