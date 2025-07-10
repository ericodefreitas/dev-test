import SidebarNavSection from "./SidebarNavSection";
import { SIDEBAR } from "@/components/sidebar/dashboardItems";
import useAppSelector from "@/hooks/useAppSelector";
import { AuthState } from "@/redux/slices/auth.slice";

const SidebarNav = () => {
  const { user } = useAppSelector((state: { auth: AuthState }) => state.auth);

  const sidebar = user?.profile
    ? SIDEBAR[user?.profile]
    : [];

  return (
    <ul className="sidebar-nav">
      {sidebar && sidebar.map((item: any) => (
        <SidebarNavSection
          key={item.title}
          pages={item.pages}
          title={item.title}
        />
      ))}
    </ul>
  );
};

export default SidebarNav;
