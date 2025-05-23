import { DELAY } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateLocation = yup.object().shape({
  isOnline: yup.string().required("Please select online or offline "),
  address: yup.string().required("Please input address"),
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Please select latitude coordinate"),
  longitude: yup.string().required("Please select longitude coordinate"),
});

const useLocationTab = () => {
  const debounce = useDebounce();
  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
  });

  // fetch region by regency
  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  // handle search region
  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  return {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    handleSearchRegion,
    resetUpdateLocation,
    setValueUpdateLocation,
    dataRegion,
    searchRegency,
  };
};

export default useLocationTab;
