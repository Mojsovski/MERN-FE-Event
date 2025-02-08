import React, { ReactNode, Fragment } from "react";
import PageHead from "@/components/commons/PageHead";

interface IProps {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: IProps) => {
  const { title, children } = props;

  return (
    <Fragment>
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </Fragment>
  );
};

export default AuthLayout;
