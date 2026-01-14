import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { COLORS } from '../../themes';
import { StartMap, Destination } from '../../assets';
import { START_COORDS, END_COORDS, routeCoordinates } from './constants';

export const TrackingMap: React.FC = () => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 6.5252,
        longitude: 3.3801,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}
      mapType="standard" // Options: "standard" | "satellite" | "hybrid" | "terrain" | "mutedStandard"
    >
      <Polyline
        coordinates={routeCoordinates}
        strokeColor={COLORS.primary}
        strokeWidth={4}
      />
      <Marker
        coordinate={START_COORDS}
        title="Origin: Alexander Apartment"
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
      >
        <View style={styles.startMarkerContainer}>
          <Image source={StartMap} style={styles.startMarker} resizeMode="contain" />
        </View>
      </Marker>
      <Marker
        coordinate={END_COORDS}
        title="Destination: Legacy Boulevard"
        anchor={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
      >
        <View style={styles.endMarkerContainer}>
          <Image source={Destination} style={styles.endMarker} resizeMode="contain" />
        </View>
      </Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  startMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
  },
  startMarker: {
    width: 16,
    height: 16,
  },
  endMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  endMarker: {
    width: 48,
    height: 48,
  },
});
