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
  const [contatos, setContatos] = useState([
    { nome: 'João', telefone: '123-456-7890', email: 'teste@email.com', avatar: require('./assets/img.jpg') },
    { nome: 'Maria', telefone: '987-654-3210', email: 'teste1@email.com', avatar: require('./assets/img.jpg') },
    { nome: 'Carlos', telefone: '456-789-1230', email: 'teste2@email.com', avatar: require('./assets/img.jpg') },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Exibicao"
        component={Exibicao}
        initialParams={{ contatos }} 
        options={({ navigation }) => ({
          headerTitleAlign: 'center', 
          headerRight: () => (
            <Ionicons
              name="add" 
              size={24}
              color="black"
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate('CadastroContatos', { contatos, setContatos })}
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
              onPress={() => navigation.navigate('Exibicao', { contatos, setContatos })}                
            />
          ),
        })}
        />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} initialParams={{ contatos }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
