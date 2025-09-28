"use client";
import Loader from "@/app/component/Loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserInfo } from "@/utils/DataSlice";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex py-6 px-8 justify-center items-center">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold">All User</h2>
        <ScrollArea className="h-[650px] rounded-md border p-4">
          <Table>
            {allUsers.length === 0 && (
              <TableCaption>No user signup yet.</TableCaption>
            )}

            <TableHeader>
              <TableRow>
                {tableHeader.map((header: string, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {allUsers.map((info: UserInfo, index: number) => (
                <TableRow key={index}>
                  <TableCell>{info.id}</TableCell>
                  <TableCell>{`${info.firstName} ${info.lastName}`}</TableCell>
                  <TableCell>{info.email}</TableCell>
                  <TableCell>{info.phone}</TableCell>
                  <TableCell>
                    {format(new Date(info.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
