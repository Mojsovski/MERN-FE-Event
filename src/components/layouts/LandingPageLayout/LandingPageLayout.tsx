import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface IProps {
  title: string;
  children: ReactNode;
}

function LandingPageLayout(props: IProps) {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
        {children}
      </div>
    </Fragment>
  );
}

export default LandingPageLayout;
