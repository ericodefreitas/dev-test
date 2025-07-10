import { SidebarItemsType } from "@/types/sidebar";
import { NAVIGATION_PATH } from "@/constants";
import { UserProfile } from "@/types/api/enums/UserProfile";
import { FaRegAddressBook } from "react-icons/fa";

// PAGES
const CLIENTS_PAGE: SidebarItemsType = { href: NAVIGATION_PATH.CLIENTS.LISTING.ABSOLUTE, title: "Clientes", icon: FaRegAddressBook }

export const SIDEBAR = {
    [UserProfile.Administrator]: [
        {
            title: "Gestão",
            pages: [CLIENTS_PAGE]
        }
    ],
}