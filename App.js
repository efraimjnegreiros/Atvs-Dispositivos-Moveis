import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from './pages/Cadastro';
import Exibicao from './pages/Exibicao';
import CadastroContatos from './pages/CadastroContatos';
import DetalheContato from './pages/DetalheContato';
import Login from './pages/Login';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Exibicao"
        component={Exibicao}
        options={({ navigation }) => ({
          headerTitleAlign: 'center', 
          headerRight: () => (
            <Ionicons
              name="add" 
              size={24}
              color="black"
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate('CadastroContatos')}
            />
          ),
          headerLeft: () => null, 
        })}
      />

        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroContatos" component={CadastroContatos} />
        <Stack.Screen name="DetalheContato" component={DetalheContato} 
        options={({ navigation }) => ({
          headerTitle: 'Contato', 
          headerTitleAlign: 'center',  
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate('Exibicao')}
            />
          ),
        })}
        />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
