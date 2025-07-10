import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";

const useSidebar = () => useContext(SidebarContext);

export default useSidebar;
