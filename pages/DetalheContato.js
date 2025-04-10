import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 

function DetalheContato({ route }) {
  const { contato } = route.params; 

  return (
    <View style={styles.container}>

      <Text style={styles.text}>Nome</Text>

      <Input
        leftIcon={<Icon name="envelope" size={20} color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={contato.nome}
      />

      <Text style={styles.text}>Telefone</Text>
      <Input
        leftIcon={<Icon name="phone" size={20} color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={contato.telefone}
      />

      <Text style={styles.text}>Email</Text>
      <Input
        leftIcon={<Icon name="envelope" size={20} color="gray" />}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={contato.email}
      />
      <Button
              title="Alterar"
              buttonStyle={styles.botao}
              titleStyle={{ color: 'white' }}
            />
            <Button
              title="Excluir"
              buttonStyle={styles.botao1}
              titleStyle={{ color: 'white' }}
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
