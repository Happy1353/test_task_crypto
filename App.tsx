import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListTokens, Swap } from './src/pages';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Swap" component={Swap} />
        <Stack.Screen name="List Tokens" component={ListTokens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
