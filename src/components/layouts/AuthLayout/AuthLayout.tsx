import React, { ReactNode } from "react";
import PageHead from "@/components/commons/PageHead";

interface IProps {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: IProps) => {
  const { title, children } = props;

  return (
    <div className="py-10 lg:py-0 flex flex-col min-h-screen min-w-full items-center justify-center gap-10">
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
