"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setUserInfo } from "@/utils/DataSlice";
import { UserInfo } from "@/utils/DataSlice";
import { useRouter } from "next/navigation";
export const useUserData = () => {
  const { data: session } = useSession();
  const [userInfo, setuserInfo] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {
    const fetchuserInfo = async () => {
      try {
        setLoading(true);
        if (!session?.user?.id) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`/api/getUser?id=${session.user.id}`);
        const { success, userInfo, message } = res.data;

        if (success && userInfo) {
          const data = {
            ...userInfo,
            email: session.user.email,
            id: session.user.id,
          } as UserInfo;
          setuserInfo(data);
          console.log(session.user.role);
          if (session.user.role === "ADMIN") {
            navigate.push("/dashboard");
          }
        } else {
          setError(message || "Failed to fetch user data");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchuserInfo();
  }, [session?.user?.id]); // Only re-run if user ID changes

  useEffect(() => {
    if (userInfo) {
      dispatch(setUserInfo(userInfo));
    }
  }, [dispatch, userInfo]);

  return { userInfo, loading, error };
};
