import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Avatar, Input, Button, Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import Icon from 'react-native-vector-icons/FontAwesome';

function Login() {
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
      <Text style={styles.label}>Email</Text>
      <Input
        placeholder="Digite o seu email..."
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
      <Button title="Logar" buttonStyle={styles.botao} titleStyle={{ color: 'white' }} />
      <Button title="Cadastrar-se" buttonStyle={styles.botao} titleStyle={{ color: 'white' }} />
      <Text style={{ marginTop: 10, color: 'blue' }}>Esqueceu a senha?</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function Cadastro() {
  return (
    <SafeAreaProvider>
      <View style={styles2.container}>
        <Header 
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
          <Text style={styles2.label}>Email</Text>
          <Input
            placeholder="Digite o seu email..."
            keyboardType="email-address"
            leftIcon={<Icon name="envelope" size={20} color="gray" />}
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
          <Button title="Cadastrar" buttonStyle={styles2.botao} titleStyle={{ color: 'white' }} />
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

export default function EsqueceuSenha() {
  return (
    <SafeAreaProvider>
      <View style={styles1.container}>
        <Header 
          centerComponent={{ text: 'Esqueceu a Senha', style: { color: '#fff' } }} 
          containerStyle={styles1.header} 
        />
        
        <ScrollView contentContainerStyle={styles1.formContainer}>
          <Text style={styles1.label}>Email</Text>
          <Input
            placeholder="Digite o seu email..."
            keyboardType="email-address"
            leftIcon={<Icon name="envelope" size={20} color="gray" />}
            inputContainerStyle={styles1.inputContainer}
            inputStyle={styles1.input}
          />
          <Button 
            title="Enviar" 
            buttonStyle={styles1.botao} 
            titleStyle={{ color: 'white' }} 
          />
        </ScrollView>

        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}
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


const styles1 = StyleSheet.create({
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
