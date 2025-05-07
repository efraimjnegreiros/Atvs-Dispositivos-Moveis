import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Input, Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

function Home({ navigation }) {
    const [usuario, setUsuario] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [doctors, setDoctors] = useState([]);
    
    const buscarCategorias = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/categorias'); 
            if (response.status === 201 || response.status === 200) {
                setCategorias(response.data); 
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível buscar os contatos.');
        }
    };

    const buscarDoctors = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/doctors'); 
            if (response.status === 201 || response.status === 200) {
                setDoctors(response.data); 
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível buscar os contatos.');
        }
    };

    const buscarUsuario = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/usuario'); 
            if (response.status === 201 || response.status === 200) {
                setUsuario(response.data); 
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível buscar os contatos.');
        }
    };

    const [busca, setBusca] = useState('');

    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: "#fff" },
        headerContent: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginBottom: 30,
            marginTop: 20,
        },
        avatar: { width: 40, height: 40, borderRadius: 20 },
        userInfo: { marginLeft: 10 },
        userName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
        userEmail: { fontSize: 14, color: '#ddd' },
        main: {
            flex: 1,
            paddingHorizontal: 20,
            paddingBottom: 20,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        label: { fontSize: 20, marginBottom: 5, color: 'gray' },
        inputContainer: {
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
        },
        input: {
            height: 50,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            width: '100%',
        },
        footer: {
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#1E3A5F',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 10,
        },
        iconContainer: { alignItems: 'center' },
        iconText: { color: 'white', fontSize: 12, marginTop: 5 },
        categoriasContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        categoriaItem: {
            width: '30%',
            alignItems: 'center',
            marginBottom: 20,
        },
        categoriaTexto: {
            marginTop: 8,
            fontSize: 14,
            color: 'gray',
            textAlign: 'center',
        },
        headerCategoryText: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 10,
        },
        doctorCard: {
            flexDirection: 'row',
            padding: 15,
            backgroundColor: '#fff',
            marginBottom: 10,
            borderRadius: 10,
            elevation: 2,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 5,
            height: 120, // <- altura fixa para o cartão
            width: '100%', // <- largura fixa
            alignItems: 'center', // <- centraliza verticalmente
        },        
        avatarContainer: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#1E3A5F',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
        },
        avatarIcon: {
            fontSize: 30,
            color: '#fff',
        },
        doctorInfo: {
            flex: 1,
            justifyContent: 'center',
        },        
        doctorName: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        doctorDescription: {
            fontSize: 14,
            color: 'gray',
        },
        doctorRating: {
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 12,
            color: '#FFD700',
        },
        starIcon: {
            marginRight: 5,
        },
        searchWrapper: {
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#1E3A5F',
        },
        headerWrapper: {
            backgroundColor: '#1E3A5F',
            paddingHorizontal: 20,
            paddingBottom: 10,
        },
        searchBox: {
            backgroundColor: '#fff',
            borderRadius: 15,
            height: 50,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        searchInputText: {
            fontSize: 16,
            color: '#333',
        },
    });

    useEffect(() => {
        buscarCategorias();
        buscarDoctors();
        buscarUsuario();
    }, []);

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Header
                        containerStyle={{
                            backgroundColor: '#1E3A5F',
                            borderBottomWidth: 0,
                            paddingBottom: 0,
                            paddingTop: 30,
                        }}
                        leftComponent={
                            <View style={styles.headerContent}>
                                <FontAwesome name={usuario.avatar} size={40} color="white" style={styles.avatar} />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>Welcome</Text>
                                    <Text style={styles.userEmail}>{usuario.nome}</Text>
                                </View>
                            </View>
                        }
                    />
                    <View style={styles.searchBox}>
                        <Input
                            placeholder="Search doctor"
                            placeholderTextColor="#999"
                            value={busca}
                            onChangeText={setBusca}
                            inputStyle={styles.searchInputText}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            containerStyle={{ flex: 1, paddingHorizontal: 0 }}
                            rightIcon={<FontAwesome name="search" size={20} color="#5E6BE3" />}
                        />
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.main}>
                    <View style={styles.headerCategoryText}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Categories</Text>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Show All</Text>
                    </View>

                    <View style={styles.categoriasContainer}>
                        {categorias.map((cat, index) => (
                            <View key={index} style={styles.categoriaItem}>
                                {cat.icone === 'tooth' ? (
                                    <FontAwesome5 name={cat.icone} size={30} color="blue" />
                                ) : (
                                    <FontAwesome name={cat.icone} size={30} color="blue" />
                                )}
                                <Text style={styles.categoriaTexto}>{cat.nome}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.headerCategoryText}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Top doctors</Text>
                    </View>

                    {doctors.map((doctor, index) => (
                        <View key={index} style={styles.doctorCard}>
                            <View style={styles.avatarContainer}>
                                <FontAwesome name={doctor.avatar} size={30} color="#fff" style={styles.avatarIcon} />
                            </View>
                            <View style={styles.doctorInfo}>
                                <Text style={styles.doctorName}>{doctor.nome}</Text>
                                <Text style={styles.doctorDescription}>{doctor.describe}</Text>
                                <View style={styles.doctorRating}>
                                    <FontAwesome5 name="star" size={12} color="#FFD700" style={styles.starIcon} />
                                    <Text>{doctor.avaliacao}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="home" size={24} color="white" />
                        <Text style={styles.iconText}>Início</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="stethoscope" size={24} color="white" />
                        <Text style={styles.iconText}>Consulta</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="calendar" size={24} color="white" />
                        <Text style={styles.iconText}>Calendário</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="user" size={24} color="white" />
                        <Text style={styles.iconText}>Perfil</Text>
                    </View>
                </View>

                <StatusBar style="auto" />
            </View>
        </SafeAreaProvider>
    );
}

export default Home;
