import {
  CiBookmark,
  CiGrid41,
  CiShoppingTag,
  CiViewList,
  CiWallet,
} from "react-icons/ci";

const SIDEBAR_ADMIN = [
  {
    key: " dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: " event",
    label: "Event",
    href: "/admin/event",
    icon: <CiViewList />,
  },
  {
    key: " category",
    label: "Category",
    href: "/admin/category",
    icon: <CiShoppingTag />,
  },
  {
    key: " banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <CiBookmark />,
  },
  {
    key: " transaction",
    label: "Transaction",
    href: "/admin/transaction",
    icon: <CiWallet />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: " dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: " transaction",
    label: "Transaction",
    href: "/member/transaction",
    icon: <CiWallet />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
