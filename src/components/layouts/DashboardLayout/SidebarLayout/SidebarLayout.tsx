import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface ISidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface IProps {
  sidebarItems: ISidebarItem[];
  isOpen: boolean;
  buttonItems: ISidebarItem[];
}

function SidebarLayout(props: IProps) {
  const router = useRouter();
  const { sidebarItems, isOpen, buttonItems } = props;

  return (
    <div
      className={cn(
        "fixed lg:relative z-50 flex h-screen w-full max-w-[250px] flex-col justify-between border-r-1 border-default-200 bg-white px-4 py-6 transition-all -translate-x-full lg:translate-x-0",
        { "translate-x-0": isOpen }
      )}
    >
      <div>
        <div className="flex justify-center w-full">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={180}
            height={60}
            className="mb-6 w-32 "
            onClick={() => router.push("/")}
          />
        </div>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-danger text-white": router.pathname.startsWith(item.href),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              href={item.href}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex flex-col gap-2">
        {buttonItems.map((item) => (
          <Link href={item.href} className="block" key={item.key}>
            <Button
              color="danger"
              fullWidth
              variant="light"
              className={cn("flex justify-start rounded-lg px-2 py-1.5", {
                "bg-danger text-white": router.pathname === item.href,
              })}
              size="lg"
            >
              {item.icon}
              {item.label}
            </Button>
          </Link>
        ))}

        <Button
          color="danger"
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5"
          size="lg"
          onPress={() => signOut()}
        >
          <CiLogout />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default SidebarLayout;
