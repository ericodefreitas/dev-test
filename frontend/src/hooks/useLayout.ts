import { LayoutContext } from "@/contexts/LayoutContext";
import { useContext } from "react";

const useLayout = () => useContext(LayoutContext);

export default useLayout;
