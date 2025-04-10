import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

function CadastroContatos({ navigation, route }) {
  const { contatos, setContatos } = route.params; 

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const adicionarContato = () => {
    if (nome && telefone && email) {
      const novoContato = {
        nome,
        telefone,
        email,
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      };

      setContatos(prevContatos => [...prevContatos, novoContato]);

      setNome('');
      setTelefone('');
      setEmail('');

      navigation.navigate('Exibicao', { contatos: [...contatos, novoContato] });
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    <View style={styles2.container}>
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

        <Text style={styles2.label}>Email</Text>
        <Input
          placeholder="Digite o seu email..."
          leftIcon={<Icon name="envelope" size={20} color="gray" />}
          inputContainerStyle={styles2.inputContainer}
          inputStyle={styles2.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles2.label}>Telefone</Text>
        <Input
          placeholder="Digite o seu telefone..."
          leftIcon={<Icon name="phone" size={20} color="gray" />}
          inputContainerStyle={styles2.inputContainer}
          inputStyle={styles2.input}
          value={telefone}
          onChangeText={setTelefone}
        />

        <Button
          title="Salvar"
          buttonStyle={styles2.botao}
          titleStyle={{ color: 'white' }}
          onPress={adicionarContato}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

export default CadastroContatos;
