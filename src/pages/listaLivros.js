//-------------------------Imports------------------------------------------------------------//
import React, { useState, useEffect } from 'react';
import Constants from "expo-constants";
import {View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage, Modal} 
from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Camera from "../components/Camera";
import Photo from '../components/Photo';


//------------------------Variável Mãe----------------------------------------------------//
const Book = ({ navigation }) => {
  const editBook = navigation.getParam('bId', {
    title: '',
    description: '',
    read: false,
    photo: '',
  });

  const isEdit = navigation.getParam('isEdit', false);

//------------------------Constantes useState---------------------------------------------//
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState(editBook.title);
  const [description, setDescription] = useState(editBook.description);
  const [read, setRead] = useState(editBook.read);
  const [photo, setPhoto] = useState(editBook.photo);
  const [isModalVisible, setIsModalVisible] = useState(false);

//-----------------Função Effect para captura de dados e envio ao BD----------------------//
  useEffect(() => {
    AsyncStorage.getItem('books').then((data) => {
      if (data) {
        const book = JSON.parse(data);
        setBooks(book);
      }
    });
  }, []);

  const isValid = () => {
    if (title !== undefined && title !== '') {
      return true;
    }

    return false;
  };

//--------------------Funçôes Onclick dos Botões------------------------------------------//
  const onSave = async () => {
    if (isValid()) {
      if (isEdit) {
        let editedBooks = books;
        editedBooks.map((item) => {
          if (item.id === editBook.id) {
            item.title = title;
            item.description = description;
            item.read = read;
            item.photo = photo;
          }
          return item;
        });
        navigation.goBack();
        await AsyncStorage.setItem('books', JSON.stringify(editedBooks));
      } else {
        const id = Math.random(5000).toString();
        const data = {
          id,
          title,
          description,
          photo,
        };

        books.push(data);
        navigation.goBack();

        await AsyncStorage.setItem('books', JSON.stringify(books));
      }
    }
  };
  
const clickToClose = () => setIsModalVisible(false);
const onChangePhoto = (newPhoto) => setPhoto(newPhoto);
//--------------------Render----------------------------------------------------------------//
  return (
    <View style={Styles.container}>
      <View style={Styles.back}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="keyboard-arrow-left"
            size={30}
            color="#e67e22"
            style={Styles.backButton}
          />
        </TouchableOpacity>
        <Text style={Styles.pageTitle}>Qual é nosso próximo livro?</Text>
      </View>
      <TextInput
        placeholder="Título"
        style={Styles.input}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        placeholder="Descrição"
        style={Styles.input}
        multiline={true}
        numberOfLines={5}
        height={200}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <TouchableOpacity style={Styles.cameraButton}>
        <Icon name="photo-camera" onPress={() => setIsModalVisible(true)}size={32} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave}>
        <Text
          style={[Styles.saveButton, !isValid() ? Styles.saveButtonFalse : '']}>
          {isEdit ? 'Atualizar' : 'Incluir'}
        </Text>
      </TouchableOpacity>
      <Modal
      animationType= "slide"
      visible={isModalVisible}
      >
      {
        photo ? (
          <Photo photo={photo}
          onDeletePhoto={onChangePhoto}
          onClosePicture={clickToClose}/>
        ) : (
          <Camera
            onCloseCamera={clickToClose}
            onTakePicture={onChangePhoto}
          />
        )
      }
      
      </Modal>
    </View>
  );
};

//--------------------Estilos---------------------------------------------------------------//
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  back: {
    flexDirection: 'row',
    marginBottom: 15,
    
  },
  backButton: {
    flex: 1,
    height: 30,
    width: 30,
  },
  pageTitle: {
    color: '#e67e22',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    flex: 1,
  },
  input: {
    fontSize: 20,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 12,
    borderBottomWidth: 2,
    borderColor: '#e67e22',
    marginBottom: 15,
  },
  cameraButton: {
    backgroundColor: '#e67e22',
    borderRadius: 50,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: '#e67e22',
    borderColor: '#e67e22',
    color:"#fff",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 50,
  },
  saveButtonFalse: {
    opacity: 0.5,
  },
});

//--------------------Export para routes.js---------------------------------------------------------------------------------//
export default Book;
