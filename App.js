import React, { useState, useEffect } from 'react';
import SvgUri from 'expo-svg-uri';
import { ActivityIndicator } from 'react-native';

import * as Location from 'expo-location';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const cidadesDisponiveis = [
  { name: 'Recife,Pe', label: 'Recife' },
  { name: 'São Paulo,Sp', label: 'São Paulo' },
  { name: 'Rio de Janeiro,Rj', label: 'Rio de Janeiro' },
  { name: 'Belo Horizonte,Mg', label: 'Belo Horizonte' },
  { name: 'Curitiba,Pr', label: 'Curitiba' },
];

const getGradientColors = (condition) => {
  switch (condition) {
    case 'clear_day':
      return ['#00c6ff', '#0072ff'];
    case 'rain':
    case 'storm':
      return ['#2c3e50', '#4ca1af'];
    case 'cloudly_day':
    case 'cloud':
      return ['#bdc3c7', '#2c3e50'];
    case 'clear_night':
      return ['#141E30', '#243B55'];
    default:
      return ['#0077be', '#00f0ff'];
  }
};

export default function App() {
  const [carregandoBusca, setCarregandoBusca] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [informacoes, setInformacoes] = useState({
    city: '',
    atual: null,
    max: null,
    min: null,
    description: '',
    condition_slug: '',
    sunrise: '',
    sunset: '',
    humidity: null,
    rain_probability: null,
    wind_speedy: '',
  });

  const [forecast, setForecast] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('Recife,Pe');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [cidadeBusca, setCidadeBusca] = useState('');

  const buscarInformacoesAtuais = async (cidade) => {
    try {
      const response = await axios.get(
        `https://api.hgbrasil.com/weather?key=de082547&city_name=${cidade}`
      );

      if (response.status === 200 || response.status === 201) {
        const data = response.data.results;

        setInformacoes({
          city: data.city,
          atual: data.temp,
          max: data.forecast[0].max,
          min: data.forecast[0].min,
          description: data.description,
          condition_slug: data.condition_slug,
          sunrise: data.sunrise,
          sunset: data.sunset,
          humidity: data.humidity,
          rain_probability: data.forecast[0].rain || 0,
          wind_speedy: data.wind_speedy,
        });

        setForecast(data.forecast.slice(1, 7));
      } else {
        Alert.alert('Erro', 'Resposta inválida da API');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar as informações.');
    }
  };

  const buscarPorCoordenadas = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.hgbrasil.com/weather?key=de082547&lat=${latitude}&lon=${longitude}`
      );

      if (response.status === 200 || response.status === 201) {
        const data = response.data.results;

        setInformacoes({
          city: data.city,
          atual: data.temp,
          max: data.forecast[0].max,
          min: data.forecast[0].min,
          description: data.description,
          condition_slug: data.condition_slug,
          sunrise: data.sunrise,
          sunset: data.sunset,
          humidity: data.humidity,
          rain_probability: data.forecast[0].rain || 0,
          wind_speedy: data.wind_speedy,
        });

        setForecast(data.forecast.slice(1, 7));
        setCidadeSelecionada(data.city);
      } else {
        Alert.alert('Erro', 'Resposta inválida da API');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar as informações pela localização.');
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão para acessar localização foi negada. Usando cidade padrão.');
        buscarInformacoesAtuais(cidadeSelecionada);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { latitude, longitude } = location.coords;
        buscarPorCoordenadas(latitude, longitude);
      } else {
        buscarInformacoesAtuais(cidadeSelecionada);
      }
    })();
  }, []);

  useEffect(() => {
    if (cidadeSelecionada) {
      buscarInformacoesAtuais(cidadeSelecionada);
    }
  }, [cidadeSelecionada]);

  const selecionarCidade = (cidade) => {
    setCidadeSelecionada(cidade);
    setModalVisivel(false);
    setCidadeBusca('');
  };

  return (
    <LinearGradient colors={getGradientColors(informacoes.condition_slug)} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() => setModalVisivel(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="location-sharp" size={24} color="white" />
            <Text style={styles.city}>{informacoes.city || 'Carregando...'}</Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color="white"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
          <View>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View style={styles.notificationDot} />
          </View>
        </View>
        <Modal
          visible={modalVisivel}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisivel(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Buscar Cidade</Text>

              <TextInput
                style={styles.input}
                placeholder="Digite o nome da cidade..."
                placeholderTextColor="#ccc"
                value={cidadeBusca}
                onChangeText={setCidadeBusca}
              />

              <TouchableOpacity
                style={styles.searchButton}
                onPress={async () => {
                  if (!cidadeBusca.trim()) {
                    Alert.alert('Atenção', 'Digite uma cidade válida.');
                    return;
                  }
                  try {
                    setCarregandoBusca(true);
                    await buscarInformacoesAtuais(cidadeBusca.trim());
                    setCidadeSelecionada(cidadeBusca.trim());
                    setModalVisivel(false);
                    setCidadeBusca('');
                  } catch (error) {
                    Alert.alert('Erro', 'Não foi possível buscar a cidade.');
                  } finally {
                    setCarregandoBusca(false);
                  }
                }}
                disabled={carregandoBusca}
              >
                {carregandoBusca ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="search" size={20} color="white" style={{ marginRight: 8 }} />
                    <Text style={styles.searchButtonText}>Buscar</Text>
                  </>
                )}
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.locationButton}
                onPress={async () => {
                  try {
                    setCarregando(true);
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                      Alert.alert('Permissão negada', 'Não foi possível acessar sua localização.');
                      setCarregando(false);
                      return;
                    }

                    let location = await Location.getCurrentPositionAsync({});
                    if (location) {
                      const { latitude, longitude } = location.coords;
                      await buscarPorCoordenadas(latitude, longitude);
                      setModalVisivel(false);
                      setCidadeBusca('');
                    }
                  } catch (error) {
                    console.error(error);
                    Alert.alert('Erro', 'Falha ao acessar a localização.');
                  } finally {
                    setCarregando(false);
                  }
                }}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="locate" size={20} color="white" style={{ marginRight: 8 }} />
                    <Text style={styles.locationButtonText}>Usar localização atual</Text>
                  </>
                )}
              </TouchableOpacity>

            </View>
          </View>
        </Modal>





        <View style={styles.card}>
          <View style={styles.mainWeather}>
            <SvgUri
              source={{
                uri: `https://assets.hgbrasil.com/weather/icons/conditions/${informacoes.condition_slug}.svg`,
              }}
              style={styles.weatherImage}
              resizeMode="contain"
            />
            <Text style={styles.temperature}>
              {informacoes.atual !== null ? `${informacoes.atual}°` : '--'}
            </Text>
            <Text style={styles.condition}>{informacoes.description}</Text>
            <Text style={styles.range}>
              Max: {informacoes.max}° Min: {informacoes.min}°
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Métricas</Text>
          <View style={styles.metrics}>
            <View style={styles.metricItem}>
              <Ionicons name="water" size={20} color="white" />
              <Text style={styles.metricText}>
                {informacoes.humidity !== null ? `${informacoes.humidity}%` : '--'}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="rainy" size={20} color="white" />
              <Text style={styles.metricText}>
                {informacoes.rain_probability !== null
                  ? `${informacoes.rain_probability}%`
                  : '--'}
              </Text>
            </View>
            <Ionicons name="leaf-outline" size={20} color="white" />
            <Text style={styles.metricText}>
              {informacoes.wind_speedy || '--'}
            </Text>

          </View>
        </View>

        <View style={[styles.card, styles.section]}>
          <Text style={styles.sectionTitle}>Hoje</Text>
          <View style={styles.hourlyForecast}>
            <View style={styles.hourBlock}>
              <Ionicons name="sunny-outline" size={28} color="white" />
              <Text style={styles.hourLabel}>Nascer do Sol</Text>
              <Text style={styles.hourValue}>{informacoes.sunrise}</Text>
            </View>

            <View style={styles.hourBlock}>
              <Ionicons name="partly-sunny-outline" size={28} color="white" />
              <Text style={styles.hourLabel}>Pôr do Sol</Text>
              <Text style={styles.hourValue}>{informacoes.sunset}</Text>
            </View>

          </View>
        </View>

        <View style={[styles.card, styles.section]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.sectionTitle}>Próximos Dias</Text>
            <Ionicons name="calendar-outline" size={24} color="white" />
          </View>
          {forecast.map((day, index) => (
            <View key={index} style={styles.dailyBlock}>
              <Text style={styles.weekday}>{day.weekday}</Text>
              <SvgUri
                width={50}
                height={50}
                source={{
                  uri: `https://assets.hgbrasil.com/weather/icons/conditions/${day.condition}.svg`,
                }}
                style={styles.forecastIconLarge}
                resizeMode="contain"
              />
              <Text style={styles.tempRange}>
                {day.max}° / {day.min}°
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  city: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: -2,
    right: -2,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  mainWeather: {
    alignItems: 'center',
  },
  weatherImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  temperature: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  condition: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
  },
  range: {
    color: 'lightgray',
    fontSize: 14,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 6,
  },
  section: {
    marginTop: 0,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  hourlyForecast: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hourBlock: {
    alignItems: 'center',
  },
  hourLabel: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  hourValue: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  weekday: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dailyBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  forecastIconLarge: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  tempRange: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '90%',
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#3a3a3c',
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },

  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },

  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#636366',
    borderRadius: 10,
    paddingVertical: 12,
  },

  locationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },


  cityOption: {
    paddingVertical: 12,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  cityOptionText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    backgroundColor: '#444',
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
});
