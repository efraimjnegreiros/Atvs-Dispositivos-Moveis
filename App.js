  import React, { useState } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import Home from './pages/Home';
  import { Ionicons } from '@expo/vector-icons';

  const Stack = createNativeStackNavigator();

  function App() {
    

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}  
        />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default App;