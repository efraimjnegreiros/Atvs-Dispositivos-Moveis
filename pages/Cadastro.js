import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

function Cadastro({ navigation }) {

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
            />
            
            <Text style={styles2.label}>CPF</Text>
            <Input
              placeholder="Digite o seu cpf..."
              secureTextEntry={false}
              leftIcon={<Icon name="lock" size={20} color="gray" />}
              inputContainerStyle={styles2.inputContainer}
              inputStyle={styles2.input}
            />

            <Text style={styles2.label}>Email</Text>
            <Input
              placeholder="Digite o seu email..."
              secureTextEntry={false}
              leftIcon={<Icon name="lock" size={20} color="gray" />}
              inputContainerStyle={styles2.inputContainer}
              inputStyle={styles2.input}
            />

            <Text style={styles2.label}>Senha</Text>
            <Input
              placeholder="Digite a sua senha..."
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={20} color="gray" />}
              inputContainerStyle={styles2.inputContainer}
              inputStyle={styles2.input}
            />
            <Button title="Cadastrar" buttonStyle={styles2.botao} titleStyle={{ color: 'white' }} onPress={()=>navigation.navigate('Login') } />
          </ScrollView>
          <StatusBar style="auto" />
        </View>
      </SafeAreaProvider>
    );
  }

export default Cadastro;
