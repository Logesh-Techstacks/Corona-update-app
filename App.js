import React from 'react';
import {
  StatusBar,
} from 'react-native';

import CoronaUpdate from './src/screens/coronaUpdate';

const App= () =>{
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <CoronaUpdate/>
    </>
  );
};


export default App;
