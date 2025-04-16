import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Input, Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';

function Home({ navigation }) {
    
    const categorias = [
        { nome: 'Consultation', icone: 'comments' },
        { nome: 'Dentist', icone: 'tooth' },
        { nome: 'Cardiologist', icone: 'heartbeat' },
        { nome: 'Hospital', icone: 'hospital-o' },
        { nome: 'Emergency', icone: 'ambulance' },
        { nome: 'Laboratory', icone: 'flask' },
    ];

    const doctors = [
        { nome: 'dr. Efraim Negreiros', describe: 'Consultant - Internal Medicine', avaliacao: '4.9 (37 Reviews)', avatar: 'user' },
        { nome: 'dr. Hércules Negreiros', describe: 'Consultant - Physiotherapy', avaliacao: '4.9 (37 Reviews)', avatar: 'male' },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
        },
        headerContent: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },
        userInfo: {
            marginLeft: 10,
        },
        userName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
        },
        userEmail: {
            fontSize: 14,
            color: '#ddd',
        },
        main: {
            flex: 1,
            paddingHorizontal: 20,
            paddingBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
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
            backgroundColor: '#ffffff',
        },
        botao: {
            width: 200,
            height: 50,
            backgroundColor: 'green',
            borderRadius: 5,
            marginTop: 20,
            alignSelf: 'center',
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
            alignItems: 'center',
            paddingTop: 10,
        },
        iconContainer: {
            alignItems: 'center',
        },
        searchInputContainer: {
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: 'white',
            borderRadius: 5,
            marginTop: 10,
            width: '100%',
        },
        inputMargin: {
            marginBottom: 15,
        },
        iconText: {
            color: 'white',
            fontSize: 12,
            marginTop: 5,
        },
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
            paddingHorizontal: 0,
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
            fontSize: 12,
            color: '#FFD700', 
            flexDirection: 'row',
            alignItems: 'center',
        },
        starIcon: {
            marginRight: 5,
        },
    });

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        backgroundColor: '#1E3A5F',
                        height: 150,
                    }}
                    leftComponent={
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.headerContent}>
                                <Icon name="user-circle" size={40} color="white" style={styles.avatar} />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>Welcome</Text>
                                    <Text style={styles.userEmail}>Efraim Negreiros</Text>
                                </View>
                            </View>
                            <View style={styles.searchInputContainer}>
                                <Input
                                    style={styles.input}
                                    placeholder="Buscar..."
                                    inputStyle={styles.input}
                                    containerStyle={{ flex: 1 }}
                                    rightIcon={<Icon name="search" size={20} color="black" />}
                                />
                            </View>
                        </View>
                    }
                    leftContainerStyle={{ flex: 1, flexDirection: 'column' }}
                />

                {/* Main Content */}
                <ScrollView contentContainerStyle={styles.main}>
                    <View style={styles.headerCategoryText}>
                        <Text style={{ textAlign: 'left', fontSize: 16, color: 'black', fontWeight: 'bold' }}>Categories</Text>
                        <Text style={{ textAlign: 'right', fontSize: 16, color: 'black', fontWeight: 'bold' }}>Show All</Text>
                    </View>

                    <View style={styles.categoriasContainer}>
                        {categorias.map((cat, index) => (
                            <View key={index} style={styles.categoriaItem}>
                                {cat.icone === 'tooth' ? (
                                    <FontAwesome5 name="tooth" size={30} color="blue" />
                                ) : (
                                    <Icon name={cat.icone} size={30} color="blue" />
                                )}
                                <Text style={styles.categoriaTexto}>{cat.nome}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.headerCategoryText}>
                        <Text style={{ textAlign: 'left', fontSize: 16, color: 'black', fontWeight: 'bold' }}>Top doctors</Text>
                    </View>
                    {doctors.map((doctor, index) => (
                        <View key={index} style={styles.doctorCard}>
                            <View style={styles.avatarContainer}>
                                <Icon name={doctor.avatar} size={50} color="#fff" style={styles.avatarIcon} />
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
                        <Icon name="home" size={24} color="white" />
                        <Text style={styles.iconText}>Início</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Icon name="stethoscope" size={24} color="white" />
                        <Text style={styles.iconText}>Consulta</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Icon name="calendar" size={24} color="white" />
                        <Text style={styles.iconText}>Calendário</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Icon name="user" size={24} color="white" />
                        <Text style={styles.iconText}>Perfil</Text>
                    </View>
                </View>

                <StatusBar style="auto" />
            </View>
        </SafeAreaProvider>
    );
}

export default Home;
