import React from "react";
import { Menu } from "@headlessui/react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { ProductEnum, useProductStore } from "../utls/Product.store";

function ProfilePopup({ user }: any) {
  const { dispatch } = useProductStore();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
    Cookies.remove("cart");
    dispatch({ type: ProductEnum.CART_RESET });
  };

  const menu = [
    {
      title: "Profile",
      icon: <AccountBoxIcon className="w-[20px]" />,
      url: "/profile",
    },
    {
      title: "Oder Histoy",
      icon: <HistoryIcon className="w-[20px]" />,
      url: "/order-history",
    },
    {
      title: "Logout",
      icon: <ExitToAppIcon className="w-[18px]" />,
      url: "#",
      onClick: () => handleLogout(),
    },
  ];
  return (
    <Menu.Items className="absolute right-1 origin-top-right bg-white shadow-lg rounded-lg">
      {menu.map((menuItem) => (
        <Menu.Item>
          <Link href={menuItem.url}>
            <div
              className="flex flex-row px-2 my-1 items-center gap-2 hover:bg-[#e8e8e8]"
              onClick={menuItem.onClick}
            >
              {menuItem.icon}
              <span className="text-sm font-semibold">{menuItem.title}</span>
            </div>
          </Link>
        </Menu.Item>
      ))}
    </Menu.Items>
  );
}

export default ProfilePopup;
