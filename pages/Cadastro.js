import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [senha, setSenha] = useState('');

  const cadastro = async () => {
    try {
      console.log('Tentando cadastrar...'); // Log para depuração
      const response = await axios.post('http://127.0.0.1:3000/usuarios/', {
        nome,
        email,
        idade,
        senha
      });

      console.log(response); // Log da resposta da API

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login'); 
      }
    } catch (error) {
      console.log('Erro no cadastro:', error); 
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
    }
  };

  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: 'gray',
      height: 70,  
    },
    formContainer: {
      flex: 1,
      justifyContent: 'center',  
      alignItems: 'center',      
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    label: {
      fontSize: 20,
      marginBottom: 5,
      color: 'gray',
    },
    inputContainer: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
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
      marginTop: 20,  
    },
  });

  return (
    <SafeAreaProvider>
      <View style={styles2.container}>
        <Header 
          leftComponent={
            <Icon 
              name="arrow-left" 
              size={25} 
              color="#fff" 
              onPress={() => navigation.goBack()} 
            />
          }
          centerComponent={{ text: 'Cadastro', style: { color: '#fff' } }} 
          containerStyle={styles2.header} 
        />
        <ScrollView contentContainerStyle={styles2.formContainer}>
          <Text style={styles2.label}>Nome</Text>
          <Input
            placeholder="Digite o seu nome..."
            leftIcon={<Icon name="user" size={20} color="gray" />}
            inputContainerStyle={styles2.inputContainer}
            inputStyle={styles2.input}
            value={nome}
            onChangeText={setNome}
          />
          
          <Text style={styles2.label}>Idade</Text>
          <Input
            placeholder="Digite a sua idade..."
            leftIcon={<Icon name="calendar" size={20} color="gray" />}
            inputContainerStyle={styles2.inputContainer}
            inputStyle={styles2.input}
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric" 
          />

          <Text style={styles2.label}>Email</Text>
          <Input
            placeholder="Digite o seu email..."
            leftIcon={<Icon name="envelope" size={20} color="gray" />}
            inputContainerStyle={styles2.inputContainer}
            inputStyle={styles2.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles2.label}>Senha</Text>
          <Input
            placeholder="Digite a sua senha..."
            secureTextEntry={true}
            leftIcon={<Icon name="lock" size={20} color="gray" />}
            inputContainerStyle={styles2.inputContainer}
            inputStyle={styles2.input}
            value={senha}
            onChangeText={setSenha}
          />
          
          <Button title="Cadastrar" onPress={cadastro} buttonStyle={styles2.botao} />
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

export default Cadastro;
