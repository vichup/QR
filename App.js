import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [tienePermiso, setTienePermiso] = useState(null);
  const [escaneado, setEscaneado] = useState(false);
  const [datosEscaneados, setDatosEscaneados] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setTienePermiso(status === 'Permitido');
    })();
  }, []);

  const manejarCodigoDeBarrasEscaneado = ({ type, data }) => {
    setEscaneado(true);
    setDatosEscaneados(data);
  };

  return (
    <View style={styles.contenedor}>
      <BarCodeScanner
        onBarCodeScanned={escaneado ? undefined : manejarCodigoDeBarrasEscaneado}
        style={StyleSheet.absoluteFillObject}
      />
      {escaneado && (
        <View style={styles.contenedorDatos}>
          <Text style={styles.textoDatos}>{datosEscaneados}</Text>
        </View>
      )}
      {tienePermiso === null && (
        <Text>Esperando permiso para acceder a la cámara.</Text>
      )}
      {tienePermiso === false && (
        <Text>No tienes permiso para acceder a la cámara.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorDatos: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  textoDatos: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
