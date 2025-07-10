import { UserProfile } from "./api/enums/UserProfile";

export type SidebarItemsType = {
  href: string;
  title: string;
  icon: React.FC<any>;
  children?: SidebarItemsType[];
  badge?: string;
  permission?: UserProfile[]
};
