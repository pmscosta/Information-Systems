import React from "react";

import MainPageLayout from '../../components/layout/MainPageLayout';
import TabsLayout from '../../components/layout/tabs/TabsLayout'
import MainTabsConfig from './MainTabsConfig';

const MainPage = () =>
    <MainPageLayout>
        <p/>
        <TabsLayout options={MainTabsConfig()} />
    </MainPageLayout>



export default MainPage;