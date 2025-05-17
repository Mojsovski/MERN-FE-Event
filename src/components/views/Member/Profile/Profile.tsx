import { Tabs, Tab } from "@heroui/react";
import PictureTab from "./PictureTab";
import useProfile from "./useProfile";
import InfoTab from "./InfoTab";
import SecurityTab from "./SecurityTab";

function Profile() {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
  } = useProfile();
  return (
    <Tabs aria-label="Option">
      <Tab key="cover" title="Picture">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataProfile={dataProfile}
          onUpdate={handleUpdateProfile}
          isPendingUpdate={isPendingMutateUpdateProfile}
          isSuccessUpdate={isSuccessMutateUpdateProfile}
        />
      </Tab>
      <Tab key="security" title="Security">
        <SecurityTab />
      </Tab>
    </Tabs>
  );
}

export default Profile;
