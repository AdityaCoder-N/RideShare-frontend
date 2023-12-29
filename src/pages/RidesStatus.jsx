import React, { useEffect, useState , useContext } from "react";
import axios from "axios";
import HostContext from "../context/HostContext";

const options = [
  { value: "Pending", label: "Pending" },
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
];

const RidesStatus = () => {
  const {host} = useContext(HostContext);
  const user = JSON.parse(localStorage.getItem('user'));

  const [rideShared, setRideShared] = useState(true);
  const [RideSharedList, setRideSharedList] = useState([]);
  const [RideTakenList, setRideTakenList] = useState([]);
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

  const getRideTaken = ()=>{
    let u = JSON.parse(localStorage.getItem("user"));
    axios.get(`${host}/ride/ride-taken-status/${u._id}`).then((response)=>{
        setRideTakenList(response.data.rides);
        console.log(response.data)
    }).catch((error)=>{
        console.log(error);
    })
  }

  const rideCompleteHandler = (id)=>{
    axios.get(`${host}/ride/ride-complete/${id}`).then((response)=>{
        if(response.status === 200)
        {
            getRideShared();
        }
    }).catch((error)=>{
        console.log(error);
    })
  }


  const getRideShared = () => {
      // console.log(user , 30)
      let u = JSON.parse(localStorage.getItem("user"));
    axios
      .get(
        `${host}/ride/ride-shared-status/${u._id}`
      )
      .then((response) => {
        // console.log(response);
        setRideSharedList(response.data.rides);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
   
    getRideShared();
  }, []);

  return (
    <div className="bg-slate-800 h-auto md:h-[92vh] w-full py-1 px-2 md:px-8">
      <div className="flex justify-end text-white gap-5 mt-8">
        <button
          className="border-2 hover:border-blue-700 bg-yellow-500 p-2 hover:text-black hover:bg-blue-300"
          onClick={() => {
            setRideShared(true);
            getRideShared();
          }}
        >
          {" "}
          Rides I have Shared
        </button>
        <button
          className="border-2 hover:border-blue-700 bg-yellow-500 p-2 hover:text-black hover:bg-blue-300"
          onClick={() => {
            setRideShared(false);
            getRideTaken();
          }}
        >
          {" "}
          Rides I am Taking
        </button>
      </div>

      {rideShared && (
        <div>
          <h1 className="text-white md:text-2xl font-bold md:mt-0 mt-4">Rides I have Shared</h1>

          <div className="container mx-auto mt-8">
            <div className="bg-white  shadow-md rounded-lg">
              {/* Table Header */}
              <div className="grid grid-cols-6 border-b border-gray-200 p-4 md:gap-5 font-bold md:text-[16px] text-[8px]">
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
                  <div key={index} className="grid grid-cols-6 p-4 gap-5 md:text-[16px] text-[8px]">
                    <div className="col-span-1">{r.source}</div>
                    <div className="col-span-1">{r.destination}</div>
                    {r.acceptedBy && (
                      <div className="col-span-1">{r.acceptedBy.name}</div>
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
                              onClick={rideCompleteHandler(r._id)}
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
          <h1 className="text-white md:text-2xl font-bold md:mt-0 mt-4">
            Rides I am Taking
          </h1>

          <div className="container mx-auto mt-8">
            <div className="bg-white  shadow-md rounded-lg">
              {/* Table Header */}
              <div className="grid grid-cols-7 gap-5 border-b border-gray-200 p-4 font-bold md:text-[16px] text-[8px]">
                <div className="col-span-1">Source</div>
                <div className="col-span-1">Destination</div>
                <div className="col-span-1">Provided By</div>
                <div className="col-span-1">Departure Time</div>
                <div className="col-span-1">Contact Info</div>
                <div className="col-span-1 ">Cost</div>
                <div className="col-span-1 ">Status</div>
           
              </div>
               
              {/* Table Body (Sample Data) */}
              {RideTakenList.map((r, index) => {
                return (
                  <div key={index} className="grid grid-cols-7 gap-5 p-4 md:text-[16px] text-[8px]">
                    <div className="col-span-1">{r.source}</div>
                    <div className="col-span-1">{r.destination}</div>
                    {r.postedBy && (
                      <div className="col-span-1">{r.postedBy.name}</div>
                    )}
                    {!r.postedBy && <div className="col-span-1">---</div>}
                    <div className="col-span-1">{r.startTime}</div>
                    <div className="col-span-1">{r.postedBy?.contact}</div>
                    <div className="col-span-1">{r.cost}</div>
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
                  
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RidesStatus;
