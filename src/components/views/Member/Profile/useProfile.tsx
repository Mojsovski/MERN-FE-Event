import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { addToast } from "@heroui/react";

import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";

const useProfile = () => {
  const { isReady } = useRouter();

  // get profile
  const getProfileById = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfileById,
    enabled: isReady,
  });

  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessMutateUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
    onError: (error) => {
      addToast({
        color: "danger",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      refetchProfile();
      addToast({
        color: "success",
        title: "Success",
        description: "update profile successfully",
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  return {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  };
};

export default useProfile;
