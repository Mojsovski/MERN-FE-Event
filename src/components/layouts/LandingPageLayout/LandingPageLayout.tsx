import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import NavbarLayout from "./NavbarLayout";
import FooterLayout from "./FooterLayout";

interface IProps {
  title: string;
  children: ReactNode;
}

function LandingPageLayout(props: IProps) {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <NavbarLayout />
      <div className="w-screen py-10 md:p-6 ">{children}</div>
      <FooterLayout />
    </Fragment>
  );
}

export default LandingPageLayout;
