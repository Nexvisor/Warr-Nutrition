"use client";
import Loader from "@/app/component/Loader";

import { UserInfo } from "@/utils/DataSlice";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";

const tableHeader = [
  "User ID",
  "Username",
  "Email",
  "Phone Number",
  "SignUp At",
];

export default function Users() {
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const res = await axios.get("/api/getAllUser");
      const allUserInfo = res.data.allUsers;
      setAllUsers(allUserInfo);
    });
  }, []);

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="flex py-10 px-12 justify-center items-center bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-6 w-full max-w-6xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800">All Users</h2>

        <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
          {/* Scrollable Container */}
          <div className="max-h-[500px] overflow-y-auto">
            {/* Sticky Header */}
            <div className="grid grid-cols-5 bg-gray-100 py-3 px-4 text-center text-sm font-semibold text-gray-700 sticky top-0 z-10 shadow-sm">
              {tableHeader.map((header, index) => (
                <div key={index} className="flex justify-center items-center">
                  {header}
                </div>
              ))}
            </div>

            {/* Table Rows */}
            <div className="flex flex-col divide-y divide-gray-200">
              {allUsers?.map((info, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-4 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  <p className="text-center">{info.id}</p>
                  <p className="text-center font-medium">{`${info.firstName} ${info.lastName}`}</p>
                  <p className="text-center">{info.email}</p>
                  <p className="text-center">{info.phone}</p>
                  <p className="text-center">
                    {format(new Date(info.createdAt), "dd/MM/yyyy")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
