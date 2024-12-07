import LoadingSpinner from "../../component/commonForComplain/LoadingSpinner";
import { IoSettingsOutline } from "react-icons/io5";
import { FaThumbsUp, FaArrowUp } from "react-icons/fa";

const NotificationPage = () => {
  const isLoading = false;
  const notifications = [
    {
      _id: "1",
      rollNo: "2301420100153",
      type: "upvote",
      complainTitle: "WiFi Connectivity Issue",
    },
    {
      _id: "2",
      rollNo: "2301420100154",
      type: "statusUpdate",
      complainTitle: "Broken Chair in Library",
      severity: "Major",
    },
  ];

  const deleteNotifications = () => {
    alert("All notifications deleted");
  };

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <p className="font-bold">Notifications</p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1">
            <IoSettingsOutline className="w-4" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={deleteNotifications}>Delete all notifications</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center h-full items-center">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* No Notifications */}
      {notifications?.length === 0 && (
        <div className="text-center p-4 font-bold">No notifications 🤔</div>
      )}

      {/* Notifications List */}
      {notifications?.map((notification) => (
        <div className="border-b border-gray-700" key={notification._id}>
          <div className="flex gap-2 p-4 items-center">
            {/* Icons Based on Notification Type */}
            {notification.type === "upvote" && (
              <FaThumbsUp className="w-7 h-7 text-blue-500" />
            )}
            {notification.type === "statusUpdate" && (
              <FaArrowUp className="w-7 h-7 text-green-500" />
            )}

            {/* Notification Text */}
            <div>
              {notification.type === "upvote" && (
                <div className="flex gap-1">
                  <span className="font-bold text-info">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;someone</span>{" "}
                  upvoted your complaint:{" "}
                  <span className="text-info">{notification.complainTitle}</span>
                </div>
              )}
              {notification.type === "statusUpdate" && (
                <div className="flex gap-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Complaint{" "}
                  <span className="text-secondary">
                    {notification.complainTitle}
                  </span>{" "}
                  status updated to{" "}
                  <span className="font-bold">{notification.severity}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
