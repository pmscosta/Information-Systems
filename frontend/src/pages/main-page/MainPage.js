import React from "react";

import MainPageLayout from '../../components/layout/MainPageLayout';
import TabsLayout from '../../components/layout/tabs/TabsLayout'
import MainTabsConfig from './MainTabsConfig';
import {useParams} from "react-router-dom";

const MainPage = () => 
    <MainPageLayout>
        <br/>
        <TabsLayout value={useParams().view} options={MainTabsConfig()} />
    </MainPageLayout>



export default MainPage;