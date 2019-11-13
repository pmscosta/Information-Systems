import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import MainPageLayout from './layouts/MainPageLayout.jsx';

const App = () => (
  <MainPageLayout>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
  </MainPageLayout>
);

export default App;
