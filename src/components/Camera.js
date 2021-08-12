import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera as ExpoCamera } from 'expo-camera';
import Constants from 'expo-constants';

const Camera = ({ onCloseCamera, onTakePicture }) => {
  const [temPermissao, setTemPermissao] = useState(null);
  const [tipo, setTipo] = useState(ExpoCamera.Constants.Type.back);
  const [camera, setCamera] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setTemPermissao(status === 'grated');
    })();
  }, []);

  const camRotate = () => {
    setTipo(
      tipo === ExpoCamera.Constants.Type.back
        ? ExpoCamera.Constants.Type.front
        : ExpoCamera.Constants.Type.back
    );
  };

  const onTakePicturePress = async () => {
    try {
      const { uri } = await camera.takePictureAsync({
        quality: 1.0,
      });
      console.log('Sucesso');
      onTakePicture(uri);
    } catch (error) {
      console.log(error);
      Alert.alert('erro');
    }
  };

  return (
    <ExpoCamera style={{ flex: 1 }} type={tipo} ref={(ref) => setCamera(ref)}>
      <View style={Styles.btns}>
        <TouchableOpacity onPress={onCloseCamera}>
          <Icon name="keyboard-arrow-left" size={50} color="#f0932b" />
        </TouchableOpacity>

        <TouchableOpacity onPress={camRotate}>
          <Icon name="loop" size={50} color="#f0932b" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
       style={Styles.takePicBtn}
       onPress={onTakePicturePress}
      >
        <Icon name="photo-camera" size={50} color="#f0932b" />
      </TouchableOpacity>
    </ExpoCamera>
  );
};

const Styles = StyleSheet.create({
  btns: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  takePicBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Constants.statusBarHeight,
  },
});

export default Camera;
