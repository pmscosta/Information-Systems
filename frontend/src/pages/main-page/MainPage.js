import React from "react";

import MainPageLayout from "../../components/layout/MainPageLayout";
import TabsLayout from "../../components/layout/tabs/TabsLayout";
import MainTabsConfig from "./MainTabsConfig";
import { useParams } from "react-router-dom";

const MainPage = () => {
  const value = useParams().view || "overview";

  return (
    <MainPageLayout>
      <br />
      <TabsLayout value={value} options={MainTabsConfig()} />
    </MainPageLayout>
  );
};

export default MainPage;
