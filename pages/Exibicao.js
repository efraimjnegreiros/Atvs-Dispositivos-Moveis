import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

function Exibicao({ route, navigation }) {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    buscarContatos();
  }, []);

  const buscarContatos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/contatos'); 
      if (response.status === 201 || response.status === 200) {
        setContatos(response.data); 
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar os contatos.');
    }
  };

  const goToDetalheContato = (contato) => {
    navigation.navigate('DetalheContato', { contatoId: contato.id });
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        data={contatos} 
        keyExtractor={(item) => item.id.toString()}  
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToDetalheContato(item)}>
            <View style={styles.itemContainer}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{item.nome[0]}</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.text}>{item.nome}</Text>
                <Text>{item.telefone}</Text>
                <Text>{item.email}</Text> 
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Exibicao;
