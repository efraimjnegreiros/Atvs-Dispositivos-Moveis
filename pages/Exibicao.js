import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

function Exibicao({ route, navigation }) {
  const { contatos } = route.params || []; 
  const goToDetalheContato = (contato) => {
    navigation.navigate('DetalheContato', { contato });
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <FlatList
        data={contatos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToDetalheContato(item)}>
            <View style={styles.itemContainer}>
              <Avatar
                rounded
                size="medium"
                source={item.avatar} 
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.text}>{item.nome}</Text>
                <Text>{item.telefone}</Text>
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
});

export default Exibicao;
