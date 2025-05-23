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
  Link,
  Listbox,
  ListboxItem,
  Spinner,
} from "@heroui/react";
import Image from "next/image";

import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constans";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useNavbarLayout from "./useNavbarLayout";
import { Fragment } from "react";
import { IEvent } from "@/types/Event";

function NavbarLayout() {
  const router = useRouter();
  const session = useSession();
  const {
    dataProfile,
    handleSearch,
    dataSearchEvent,
    isLoadingSearchEvent,
    isRefetchingSearchEvent,
    search,
    setSearch,
  } = useNavbarLayout();

  return (
    <Navbar
      maxWidth="full"
      className="px-5"
      isBordered
      isBlurred
      shouldHideOnScroll={false}
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
        {/* search form event*/}
        <NavbarItem className="hidden lg:flex lg:relative ">
          <Input
            isClearable
            className="w=[300px]"
            placeholder="Search Event"
            startContent={<CiSearch />}
            onClear={() => setSearch("")}
            onChange={handleSearch}
          />

          {search !== "" && (
            <Listbox
              items={dataSearchEvent?.data || []}
              className="absolute right-0 top-12 rounded-xl border bg-white"
            >
              {!isRefetchingSearchEvent && !isLoadingSearchEvent ? (
                (item: IEvent) => (
                  <ListboxItem key={item._id} href={`/event/${item.slug}`}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={`${item.banner}`}
                        alt={`${item.name}`}
                        className="w-2/5 rounded-md"
                        width={100}
                        height={40}
                      />
                      <p className="line-clamp-2 w-3/5 text-wrap">
                        {item.name}
                      </p>
                    </div>
                  </ListboxItem>
                )
              ) : (
                <ListboxItem key="loading">
                  <Spinner
                    color="danger"
                    size="sm"
                    className="flex justify-center items-center"
                  />
                </ListboxItem>
              )}
            </Listbox>
          )}
        </NavbarItem>

        {/* account menu */}
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="admin"
                  href="/admin/dashboard"
                  className={cn({
                    hidden: dataProfile?.role !== "admin",
                  })}
                >
                  Admin Dashboard
                </DropdownItem>
                <DropdownItem
                  key="member"
                  href="/member/profile"
                  className={cn({
                    hidden: dataProfile?.role !== "member",
                  })}
                >
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
            <NavbarMenuItem key={`nav-${item.label}`}>
              <Link
                className={cn(
                  "font-medium text-default-700 hover:text-danger hover:font-bold ",
                  {
                    "font-bold text-danger-500": router.pathname === item.href,
                  }
                )}
                href={item.href}
              >
                {item.label}
              </Link>
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
