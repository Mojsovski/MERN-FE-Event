import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constans";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useNavbarLayout from "./useNavbarLayout";
import { Fragment } from "react";

function NavbarLayout() {
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useNavbarLayout();

  const getProfilePictureUrl = () => {
    if (!dataProfile?.profilePicture) return "";

    if (dataProfile.profilePicture.startsWith("http")) {
      return dataProfile.profilePicture;
    }
  };

  return (
    <Navbar
      maxWidth="full"
      className="px-5"
      isBlurred={false}
      isBordered
      shouldHideOnScroll
    >
      {/*  menu 1*/}
      <div className=" flex items-center gap-10 ">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex lg:gap-3 " justify="center">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              as={Link}
              href={item.href}
              className={cn(
                "font-medium text-default-700 hover:text-danger hover:font-bold ",
                {
                  "font-bold text-danger-500": router.pathname === item.href,
                }
              )}
            >
              {item.label}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      {/* menu 2*/}
      <NavbarContent justify="end">
        {/* search event*/}
        <NavbarItem className="hidden lg:flex relative ">
          <Input
            isClearable
            className="w=[300px]"
            placeholder="Search Event"
            startContent={<CiSearch />}
            onClear={() => {}}
            onChange={() => {}}
          />
        </NavbarItem>

        {/* account menu */}
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.fullName}
                  className="cursor-pointer"
                  showFallback
                  name={dataProfile?.fullName}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/dashboard"
                  className={cn({ hidden: dataProfile?.role !== "admin" })}
                >
                  Admin Dashboard
                </DropdownItem>
                <DropdownItem key="profile" href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key="signout" onPress={() => signOut()}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden lg:flex lg:gap-2 ">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`button-${item.label}`}>
                <Button
                  color="danger"
                  as={Link}
                  href={item.href}
                  variant={item.variant as ButtonProps["variant"]}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}

        {/* mobile*/}
        <NavbarMenuToggle className="lg:hidden" />
        <NavbarMenu className="gap-4 bg-white">
          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem
              key={`nav-${item.label}`}
              className={cn(
                "font-medium text-default-700 hover:text-danger hover:font-bold ",
                {
                  "font-bold text-danger-500": router.pathname === item.href,
                }
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
          {/* mobile account menu */}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                className={cn(
                  "font-medium text-default-700 hover:text-danger hover:font-bold ",
                  {
                    hidden: dataProfile?.role !== "admin",
                  }
                )}
              >
                <Link href="/admin/dashboard">Admin Dashboard</Link>
              </NavbarMenuItem>
              <NavbarMenuItem
                className={cn(
                  "font-medium text-default-700 hover:text-danger hover:font-bold ",
                  {
                    hidden: dataProfile?.role !== "member",
                  }
                )}
              >
                <Link href="/member/profile">Member Profile</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  color="danger"
                  onPress={() => signOut()}
                  className="mt-2 w-full"
                  variant="bordered"
                  size="md"
                >
                  Log Out
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            <Fragment>
              {BUTTON_ITEMS.map((item) => (
                <NavbarMenuItem key={`button-${item.label}`}>
                  <Button
                    fullWidth
                    as={Link}
                    color="danger"
                    variant={item.variant as ButtonProps["variant"]}
                    size="md"
                    href={item.href}
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              ))}
            </Fragment>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarLayout;
