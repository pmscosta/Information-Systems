import React from "react";

import MainPageLayout from '../../components/layout/MainPageLayout';
import TabsLayout from '../../components/layout/tabs/TabsLayout'
import MainTabsConfig from './MainTabsConfig';

const MainPage = () =>
    <MainPageLayout>
        <br /> <br /> <br /> <br />
        <TabsLayout options={MainTabsConfig()} />
        <br /> <br />
    </MainPageLayout>



export default MainPage;