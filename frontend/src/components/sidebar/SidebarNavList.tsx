import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import reduceChildRoutes from "./reduceChildRoutes";
import { SidebarItemsType } from "../../types/sidebar";

interface SidebarNavListProps {
  depth: number;
  pages: SidebarItemsType[];
}

const SidebarNavList = (props: SidebarNavListProps) => {
  const { pages, depth } = props;
  
  const childRoutes = pages.reduce(
    (items, page) => reduceChildRoutes({ items, page, depth }),
    [] as JSX.Element[]
  );

  return <React.Fragment>{childRoutes}</React.Fragment>;
};

export default SidebarNavList;
