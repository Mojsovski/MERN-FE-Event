import React, { ReactNode, Fragment, useState } from "react";
import PageHead from "@/components/commons/PageHead";
import SidebarLayout from "./SidebarLayout";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constans";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface IProps {
  title?: string;
  children: ReactNode;
  type: string;
  description?: string;
}

const DashboardLayout = (props: IProps) => {
  const { title, children, type, description } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <SidebarLayout
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            classNames={{ wrapper: "p-0" }}
            className="flex justify-between bg-transparent px0"
            isBlurred={false}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
