import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [informacoes, setInformacoes] = useState({
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

  const buscarInformacoesAtuais = async () => {
    try {
      const response = await axios.get(
        'https://api.hgbrasil.com/weather?key=1f815694&city_name=Barbacena,Mg'
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

        setForecast(data.forecast.slice(1, 7)); // próximos 6 dias
      } else {
        Alert.alert('Erro', 'Resposta inválida da API');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar as informações.');
    }
  };

  useEffect(() => {
    buscarInformacoesAtuais();
  }, []);

  return (
    <LinearGradient colors={['#0077be', '#00f0ff']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={24} color="white" />
            <Text style={styles.city}>{informacoes.city}</Text>
          </View>
          <View>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View style={styles.notificationDot} />
          </View>
        </View>

        {/* Weather Card Principal */}
        <View style={styles.card}>
          <View style={styles.mainWeather}>
            <Image
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
              Max: {informacoes.max}°  Min: {informacoes.min}°
            </Text>
          </View>
        </View>

        {/* Card de Métricas */}
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
                {informacoes.rain_probability !== null ? `${informacoes.rain_probability}%` : '--'}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="speedometer" size={20} color="white" />
              <Text style={styles.metricText}>
                {informacoes.wind_speedy || '--'}
              </Text>
            </View>
          </View>
        </View>

        {/* Today Section Card */}
        <View style={[styles.card, styles.section]}>
          <Text style={styles.sectionTitle}>Today</Text>
          <View style={styles.hourlyForecast}>
            <View style={styles.hourBlock}>
              <Text style={styles.hourLabel}>Nascer do Sol:</Text>
              <Text style={styles.hourValue}>{informacoes.sunrise}</Text>
            </View>
            <View style={styles.hourBlock}>
              <Text style={styles.hourLabel}>Pôr do Sol:</Text>
              <Text style={styles.hourValue}>{informacoes.sunset}</Text>
            </View>
          </View>
        </View>

        {/* Next 6 Days Forecast */}
        <View style={[styles.card, styles.section]}>
  <Text style={styles.sectionTitle}>Próximos Dias</Text>
  {forecast.map((day, index) => (
    <View key={index} style={styles.dailyBlock}>
      <Text style={styles.weekday}>{day.weekday}</Text>
      <Image
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
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 1,
  },
  forecastIcon: {
    width: 40,
    height: 40,
  },
  weekday: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tempRange: {
    color: 'white',
    fontSize: 16,
  },
});
