import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer: React.FC = () => {
  return (
    <View style={styles.footerWrapper}>
      {/* SVG Background Shape */}
      <Svg
        width={'100%'}
        height={85}
        viewBox="0 0 400 85"
        style={styles.svgStyle}
      >
        <Path
          d="
          M0 40
          Q100 0 150 80 
          Q300 30 500 10 
          L400 85 
          L0 85
          Z
          "
          fill="#ffffff"
        />
      </Svg>

      {/* FAB */}
      <TouchableOpacity style={styles.fabButton}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab}>
          <Icon name="home" size={24} color="#2E2EB8" />
          <Text style={[styles.text, { color: '#2E2EB8' }]}>Beranda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <Icon name="user" size={24} color="#C0C0C0" />
          <Text style={[styles.text, { color: '#C0C0C0' }]}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },

  svgStyle: {
    position: 'absolute',
    bottom: 0,
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    paddingBottom: 18,
    paddingTop: 10,
  },

  tab: {
    alignItems: 'center',
  },

  text: {
    fontSize: 12,
    marginTop: 4,
  },

  fabButton: {
    position: 'absolute',
    top: -25,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#2E2EB8',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#5A43FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  fabIcon: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
