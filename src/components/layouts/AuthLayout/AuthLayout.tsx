import React, { ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";

interface IProps {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: IProps) => {
  const { title, children } = props;

  return (
    <>
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
