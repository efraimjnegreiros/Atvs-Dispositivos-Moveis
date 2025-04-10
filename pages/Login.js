import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

function Login({ navigation, route }) {
  const { contatos } = route.params || {};

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
        leftIcon={<Icon name="envelope" size={20} color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Text style={styles.label}>Senha</Text>
      <Input
        placeholder="Digite a sua senha..."
        secureTextEntry={true}
        leftIcon={<Icon name="lock" size={20} color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Button
        title="Login"
        buttonStyle={styles.botao}
        titleStyle={{ color: 'white' }}
        onPress={() => navigation.navigate('Exibicao', { contatos: contatos })} 
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
