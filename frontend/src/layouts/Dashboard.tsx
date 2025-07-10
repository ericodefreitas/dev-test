import React, { Suspense, ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthState, setProfile } from "@/redux/slices/auth.slice";
import SplashScreenLayout from "./SplashScreenLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { store } from "@/redux/store";
import { NavigationWatcher } from "@/routes";
import { ReactQueryKeys } from "@/constants/ReactQueryKeys";
import useAppSelector from "@/hooks/useAppSelector";

import Wrapper from "../components/Wrapper"
import Sidebar from "../components/sidebar/Sidebar"
import Main from "../components/Main"
import Navbar from "../components/navbar/Navbar"
import Content from "../components/Content"
import Footer from "../components/Footer"

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth: AuthState = useAppSelector(state => state.auth);

  // const { data } = useSuspenseQuery<AuthState["profile"]>({
  //   queryKey: [ReactQueryKeys.PROFILE],
  //   meta: {
  //     fetchFn: async () => {
  //       if (!!auth.session)
  //         return {};

  //       const response = await authService.getProfile();
  //       store.dispatch(setProfile(response.data));
  //       return response.data;
  //     }
  //   }
  // });

  // useEffect(() => {
  //   if (data) {
  //     setLoading(false);
  //   }
  // }, [])

  // if (loading || !data) {
  //   return <SplashScreenLayout />
  // }

  return (
    <Suspense fallback={<SplashScreenLayout />}>
      <NavigationWatcher />
      <Wrapper>
        <Sidebar />
        <Main>
          <Navbar />
          <Content>
            {children}
            <Outlet />
          </Content>
          <Footer />
        </Main>
      </Wrapper>
    </Suspense>
  );
}

export default Dashboard;
