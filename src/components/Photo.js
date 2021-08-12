import React from "react";
import {ImageBackground, View, TouchableOpacity, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';


const Photo = ({photo, onDeletePhoto, onClosePicture}) => {
  return (
    <ImageBackground 
      source={{uri:photo}} 
      style={styles.imagePreview}
    > 
      <View style={styles.reactButons}>
        <Icon 
          name={"delete"}
          color= {"#f0932b"}
          size= {50}
          onPress={() => 
            onDeletePhoto(null)
          }
        />
        <Icon 
          name={"check-circle"}
          color= {"#f0932b"}
          size= {50}
          onPress={onClosePicture}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: "100%"
  },
  reactButons: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
  }

});

export default Photo;