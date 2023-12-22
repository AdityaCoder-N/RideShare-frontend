import React, { useEffect, useState , useContext } from "react";
import axios from "axios";
import UserContext from '../context/UserContext';

const options = [
  { value: "Pending", label: "Pending" },
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
];

const RidesStatus = () => {
    const {user} = useContext(UserContext)
  const [rideShared, setRideShared] = useState(true);
  const [RideSharedList, setRideSharedList] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleEditClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log(selectedStatus);
    setDropdownVisible(false);
  };
  useEffect(() => {
    const fetch = () => {
        console.log(user , 30)
      axios
        .get(
          "http://localhost:3001/ride/ride-shared-status/658334622d19a60daf3c5ab9"
        )
        .then((response) => {
          console.log(response);
          setRideSharedList(response.data.rides);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetch();
  }, []);

  return (
    <div className="bg-slate-800 h-[92vh] w-full py-1 px-8">
      <div className="flex justify-end text-white gap-5 mt-8">
        <button
          className="border-2 hover:border-blue-700 bg-yellow-500 p-2 hover:text-black hover:bg-blue-300"
          onClick={() => {
            setRideShared(true);
          }}
        >
          {" "}
          Rides I have Shared
        </button>
        <button
          className="border-2 hover:border-blue-700 bg-yellow-500 p-2 hover:text-black hover:bg-blue-300"
          onClick={() => {
            setRideShared(false);
          }}
        >
          {" "}
          Rides I am Taking
        </button>
      </div>

      {rideShared && (
        <div>
          <h1 className="text-white text-2xl font-bold">Rides I have Shared</h1>

          <div className="container mx-auto mt-8">
            <div className="bg-white  shadow-md rounded-lg">
              {/* Table Header */}
              <div className="grid grid-cols-6 border-b border-gray-200 p-4 font-bold">
                <div className="col-span-1">Source</div>
                <div className="col-span-1">Destination</div>
                <div className="col-span-1">Accepted By</div>
                <div className="col-span-1">Departure Time</div>
                <div className="col-span-1 ">Status</div>
                <div className="col-span-1 ">Action</div>
              </div>

              {/* Table Body (Sample Data) */}
              {RideSharedList.map((r, index) => {
                return (
                  <div key={index} className="grid grid-cols-6 p-4">
                    <div className="col-span-1">{r.source}</div>
                    <div className="col-span-1">{r.destination}</div>
                    {r.acceptedBy && (
                      <div className="col-span-1">{r.acceptedBy}</div>
                    )}
                    {!r.acceptedBy && <div className="col-span-1">---</div>}
                    <div className="col-span-1">{r.startTime}</div>
                    <div className="col-span-1 flex">
                      {r.status === "PENDING" && (
                        <span className="text-yellow-500 font-bold ">
                          {" "}
                          Pending{" "}
                        </span>
                      )}
                      {r.status === "ACTIVE" && (
                        <span className="text-green-500 font-bold ">
                          {" "}
                          Active{" "}
                        </span>
                      )}
                      {r.status === "COMPLETED" && (
                        <span className="text-red-500 font-bold ">
                          {" "}
                          Completed{" "}
                        </span>
                      )}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {/* Edit Button with Dropdown */}
                      {r.acceptedBy && (
                        <div className="flex gap-2">
                          {r.status === "PENDING" && (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                              onClick={handleEditClick }
                            >
                              Active
                            </button>
                          )}

                          {r.status === "ACTIVE" && (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                              onClick={handleEditClick}
                            >
                              Completed
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {!rideShared && (
        <div>
          <h1 className="text-white text-2xl font-bold mt-2">
            Rides I am Taking
          </h1>

          <div className="bg-slate-400 rounded-md p-4">
            <div className="grid grid-cols-5 gap-4 text-xl mb-4 font-bold">
              <div>Locations</div>
              <div>Accepted By</div>
              <div>Departure Time</div>
              <div>Cost</div>
              <div className="flex justify-end">Status</div>
            </div>

            <div className="flex flex-col gap-2  p-2 h-[30vh] max-h-[28vh] overflow-y-scroll scroll-hide">
              <div className="grid grid-cols-5 gap-4 text-xl bg-slate-600 p-4 rounded-lg text-white">
                <div>
                  <div>From - Chandigarh</div>
                  <div>To - Dehradun</div>
                </div>
                <div>Accepted/Not Accepted</div>
                <div>3:00pm</div>
                <div>349</div>
                <div className="flex justify-end">Active/Pending/Completed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RidesStatus;
