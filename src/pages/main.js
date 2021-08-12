import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Main = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('books').then((data) => {
      const book = JSON.parse(data);
      setBooks(book);
    });
  }, []);

  const onNewPress = () => {
    navigation.navigate('Book');
  };
  const onEditPress = (bookId) => {
    const catBook = books.find((item) => item.id === bookId);
    navigation.navigate('Book', { bId: catBook, isEdit: true });
  };
  const onDeletePress = async (bookId) => {
    const filterBook = books.filter((item) => item.id !== bookId);
    await AsyncStorage.setItem('books', JSON.stringify(filterBook));
    setBooks(filterBook);
  };

  const readMark = async (bookId) => {
    const markAsRead = books.map((item) => {
      if (item.id === bookId) {
        item.read = !item.read;
        console.log(markAsRead);
      }
      return item;
    });

    await AsyncStorage.setItem('books', JSON.stringify(markAsRead));
    setBooks(markAsRead);
  };
  return (
    <ImageBackground
      source={require('../assets/fundo.png')}
      style={styles.backIMG}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Lista de Leitura</Text>
        </View>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.viewContainer}>
              <TouchableOpacity
                style={styles.itemBnt}
                onPress={() => readMark(item.id)}>
                <Text
                  style={[
                    styles.itemText,
                    item.read ? styles.itemTextRead : '',
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => onEditPress(item.id)}>
                <Icon name="edit" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => onDeletePress(item.id)}>
                <Icon name="remove-circle" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
        <View>
          <TouchableOpacity style={styles.toolboxButton} onPress={onNewPress}>
            <Icon name="add-circle" size={80} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: Constants.statusBarHeight,
  },
  backIMG: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
  },
  toolboxButton: {
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
  itemText: {
    color: '#fff',
    fontSize: 25,
    padding: 10,
  },
  itemTextRead: {
    textDecorationLine: 'line-through',
    color: '#bdc3c7',
  },
  viewContainer: {
    flexDirection: 'row',
  },
  itemBnt: {
    flex: 1,
  },
  btnEdit: {
    justifyContent: 'center',
  },
  btnDelete: {
    color: '#fff',
    justifyContent: 'center',
    marginLeft: 15,
  },
});

export default Main;
