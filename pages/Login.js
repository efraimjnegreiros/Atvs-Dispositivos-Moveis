import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';


function Login({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const login = async () => {
    try {
      console.log('Tentando fazer login...');
      const response = await axios.get(`http://127.0.0.1:3000/usuarios?email=${email}&senha=${senha}`);
      
      console.log('Resposta do servidor:', response.data);
  
      if (response.data.length > 0) {
        alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Exibicao');
      } else {
        alert('Erro', 'Credenciais inválidas.');
      }
    } catch (error) {
      console.log('Erro no Login:', error.message); 
      alert('Erro', 'Não foi possível fazer o login.');
    }
  };
  
    const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    label: {
      fontSize: 20,
      marginBottom: 5,
      color: 'gray',
    },
    input: {
      height: 50,
      paddingHorizontal: 10,
    },
    botao: {
      width: 200,
      height: 50,
      backgroundColor: 'green',
      borderRadius: 5,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        rounded
        title="EN"
        source={{
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
      />
      <Text style={styles.label}>Login</Text>
      <Input
        placeholder="Digite o seu login..."
        keyboardType="email-address"
        

        leftIcon={<FontAwesome5 name="envelope" size={20} color="#gray"/>}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={email}
          onChangeText={setEmail}
      />
      <Text style={styles.label}>Senha</Text>
      <Input
        placeholder="Digite a sua senha..."
        secureTextEntry={true}
        leftIcon={<FontAwesome5 name="lock" size={20} color="#gray"/>}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={senha}
          onChangeText={setSenha}
      />
      <Button
        title="Login"
        buttonStyle={styles.botao}
        titleStyle={{ color: 'white' }}
        onPress={login} 
      />
      <Button
        title="Cadastre-se"
        buttonStyle={styles.botao}
        titleStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('Cadastro')}  
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default Login;