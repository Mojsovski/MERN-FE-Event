import categoryServices from "@/services/category.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string(),
  isFeatured: yup.string(),
  isOnline: yup.string(),
});

function useEventFilter() {
  const { control, reset, watch, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // fetch category list to autocomplete form
  const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
  });

  return {
    control,
    dataCategory,
    isSuccessGetCategory,
    setValue,
  };
}

export default useEventFilter;
