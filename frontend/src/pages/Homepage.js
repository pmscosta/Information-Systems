import React from "react";
import MainPageLayout from './MainPageLayout';
import ValueCard from '../components/ValueCard';

const Homepage = () => {
    
    return (
      <MainPageLayout>
        <br/>
        <br/>
        <br/>
        <ValueCard name="Purchases" value="123k"/>
        <ValueCard name="Sales" value="343k"/>
        <ValueCard name="Equity" value="53k"/>
        <br/>
        <ValueCard name="Purchases" value="123k"/>
        <ValueCard name="Sales" value="343k"/>
        <ValueCard name="Equity" value="53k"/>
        <br/>
        <ValueCard name="Purchases" value="123k"/>
        <ValueCard name="Sales" value="343k"/>
        <ValueCard name="Equity" value="53k"/>
      </MainPageLayout>
    );
  }
  
  export default Homepage;
  