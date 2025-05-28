// App.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.city}>📍 Fortaleza</Text>
        <MaterialCommunityIcons name="weather-partly-rainy" size={64} color="#fff" />
        <Text style={styles.temp}>28º</Text>
        <Text style={styles.precip}>Precipitations</Text>
        <Text style={styles.range}>Max.: 31º Min.: 25º</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>6%</Text>
          <Text style={styles.detailText}>90%</Text>
          <Text style={styles.detailText}>19 km/h</Text>
        </View>
      </View>

      <View style={styles.hourly}>
        <Text style={styles.sectionTitle}>Today</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { hour: '15.00', temp: 29, icon: 'weather-partly-cloudy' },
            { hour: '16.00', temp: 26, icon: 'weather-partly-cloudy' },
            { hour: '17.00', temp: 24, icon: 'weather-cloudy' },
            { hour: '18.00', temp: 23, icon: 'weather-partly-cloudy' },
          ].map((item, index) => (
            <View key={index} style={styles.hourItem}>
              <Text style={styles.hourTemp}>{item.temp}°C</Text>
              <MaterialCommunityIcons name={item.icon} size={30} color="#fff" />
              <Text style={styles.hourLabel}>{item.hour}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.forecast}>
        <Text style={styles.sectionTitle}>Next Forecast</Text>
        <View style={styles.forecastItem}>
          <Text style={styles.day}>Monday</Text>
          <MaterialCommunityIcons name="weather-pouring" size={28} color="#fff" />
          <Text style={styles.dayTemp}>13º | 10º</Text>
        </View>
        <View style={styles.forecastItem}>
          <Text style={styles.day}>Tuesday</Text>
          <MaterialCommunityIcons name="weather-sunny" size={28} color="#fff" />
          <Text style={styles.dayTemp}>17º | 12º</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D47A1',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  city: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  temp: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
  precip: {
    fontSize: 18,
    color: '#B3E5FC',
  },
  range: {
    fontSize: 16,
    color: '#B3E5FC',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  detailText: {
    fontSize: 16,
    color: '#fff',
  },
  hourly: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  hourItem: {
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#1976D2',
    borderRadius: 12,
    padding: 10,
    width: 80,
  },
  hourTemp: {
    fontSize: 16,
    color: '#fff',
  },
  hourLabel: {
    fontSize: 14,
    color: '#fff',
  },
  forecast: {},
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1565C0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  day: {
    fontSize: 18,
    color: '#fff',
  },
  dayTemp: {
    fontSize: 18,
    color: '#fff',
  },
});
