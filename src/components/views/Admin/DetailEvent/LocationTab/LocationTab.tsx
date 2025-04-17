import { IEventForm, IRegency } from "@/types/Event";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@heroui/react";
import useLocationTab from "./useLocationTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface IProps {
  dataEvent: IEventForm;
  dataDefaultRegion: string;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isPendingDefaultRegion: boolean;
  isSuccessUpdate: boolean;
}

const LocationTab = (props: IProps) => {
  const {
    dataEvent,
    dataDefaultRegion,
    onUpdate,
    isPendingUpdate,
    isPendingDefaultRegion,
    isSuccessUpdate,
  } = props;
  const {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,
    handleSearchRegion,
    dataRegion,
    searchRegency,
  } = useLocationTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates[0]}`
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates[1]}`
      );
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="  flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-xl font-bold">Event Location</h1>
          <p className="text-small text-default-400">
            Manage location of this event
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton
            isLoaded={!!dataEvent?.location?.address}
            className="rounded-lg"
          >
            <Controller
              name="address"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Address"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.address !== undefined}
                  errorMessage={errorsUpdateLocation.address?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.isOnline} className="rounded-lg">
            <Controller
              name="isOnline"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  variant="bordered"
                  isInvalid={errorsUpdateLocation.isOnline !== undefined}
                  errorMessage={errorsUpdateLocation.isOnline?.message}
                  disallowEmptySelection
                  labelPlacement="outside"
                  defaultSelectedKeys={[dataEvent.isOnline ? "true" : "false"]}
                >
                  <SelectItem key="true">Online</SelectItem>
                  <SelectItem key="false">Offline</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  errorMessage={errorsUpdateLocation.latitude?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Longitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  errorMessage={errorsUpdateLocation.longitude?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={
                      dataRegion?.data.data && searchRegency !== ""
                        ? dataRegion?.data.data
                        : []
                    }
                    defaultInputValue={dataDefaultRegion}
                    label="City"
                    labelPlacement="outside"
                    variant="bordered"
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    errorMessage={errorsUpdateLocation.region?.message}
                    onSelectionChange={(value) => onChange(value)}
                    onInputChange={(search) => handleSearchRegion(search)}
                    placeholder="Search city here..."
                  >
                    {(regency: IRegency) => (
                      <AutocompleteItem key={`${regency.id}`}>
                        {regency.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            ) : (
              <div className="w-full h-24" />
            )}
          </Skeleton>
          <Button
            color="danger"
            className="mt-1 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataEvent?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LocationTab;
