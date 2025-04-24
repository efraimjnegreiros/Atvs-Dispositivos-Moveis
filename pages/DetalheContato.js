import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; 

function DetalheContato({navigation, route }) {
  const { contatoId } = route.params; 

  const [contato, setContato] = useState(null);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const buscarContatoDetalhe = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/contatos/${contatoId}`);
        if (response.status === 200) {
          const dadosContato = response.data;
          setContato(dadosContato); 
          setNome(dadosContato.nome); 
          setTelefone(dadosContato.telefone);
          setEmail(dadosContato.email);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do contato.');
      }
    };
    if (contatoId) {
      buscarContatoDetalhe();
    }
  }, [contatoId]); 
  const atualizar = async () => {
    try {
      console.log('Tentando Atualizar...');
      const response = await axios.put(`http://127.0.0.1:3000/contatos/${contatoId}`, {
        nome,
        telefone,
        email
      });

      console.log(response);

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Atualização realizada com sucesso!');
        navigation.navigate('Exibicao');
      }
    } catch (error) {
      console.log('Erro na atualização:', error); // Log do erro
      Alert.alert('Erro', 'Não foi possível atualizar o contato.');
    }
  };

  const deletar = async () => {
    try {
      console.log('Tentando Deletar...');
      const response = await axios.delete(`http://127.0.0.1:3000/contatos/${contatoId}`);

      console.log(response);

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Deleção realizada com sucesso!');
        navigation.navigate('Exibicao');
      }
    } catch (error) {
      console.log('Erro na Deleção:', error); // Log do erro
      Alert.alert('Erro', 'Não foi possível deletar o contato.');
    }
  };
  const handleAlterar = () => {
    Alert.alert('Alterar', 'Os dados foram alterados!');
  };

  const handleExcluir = () => {
    // Lógica para excluir o contato
    Alert.alert('Excluir', 'O contato foi excluído!');
  };

  if (!contato) {
    return <Text>Carregando...</Text>; 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome</Text>
      <Input
        leftIcon={<Icon name="user" size={20} color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.text}>Telefone</Text>
      <Input
        leftIcon={<Icon name="phone" size={20} color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={telefone}
        onChangeText={setTelefone} 
      />

      <Text style={styles.text}>Email</Text>
      <Input
        leftIcon={<Icon name="envelope" size={20} color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Button
        title="Alterar"
        buttonStyle={styles.botao}
        titleStyle={{ color: 'white' }}
        onPress={atualizar}
      />
      <Button
        title="Excluir"
        buttonStyle={styles.botao1}
        titleStyle={{ color: 'white' }}
        onPress={deletar} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
  },
  botao: {
    width: 200,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginBottom: 10,
  },
  botao1: {
    width: 200,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default DetalheContato;
