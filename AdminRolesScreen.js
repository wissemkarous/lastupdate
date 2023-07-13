import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

function AdminRolesScreen() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const addUser = () => {
    const newUser = {
      name: name,
      id: id,
      profilePic: profilePic,
    };

    setUsers([...users, newUser]);
    setName('');
    setId('');
    setProfilePic(null);
    setIsAddingUser(false);
  };

  const removeUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleProfilePicSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to select a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Roles</Text>
        <TouchableOpacity onPress={() => setIsAddingUser(!isAddingUser)}>
          <Ionicons name={isAddingUser ? 'md-remove' : 'md-add'} size={30} color="black"   />
        </TouchableOpacity>
      </View>
      {isAddingUser && (
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleProfilePicSelect} style={styles.addProfilePicButton}>
            <Text style={styles.addProfilePicButtonText}>Add Profile Picture</Text>
          </TouchableOpacity>
          <View style={styles.profilePicContainer}>
          </View>
          <TextInput
            style={styles.input}
            placeholder="UserName"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={id}
            onChangeText={setId}
          />
        
          <Button title="Add User" onPress={addUser} color="#0066FF" />

        </View>
      )}
      <View style={styles.userList}>
        <Text style={styles.userListTitle}>User List :</Text>
        <Text style={styles.userList}>{users.length}   Member(s)  </Text>
        {users.map((user) => (
          <View key={user.id} style={styles.userItem}>
            {user.profilePic ? (
              <Image source={{ uri: user.profilePic }} style={styles.userProfilePic} />
            ) : (
              <View style={styles.userProfilePicPlaceholder} />
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userId}>{user.id}</Text>
            </View>
            <Button title="Remove" onPress={() => removeUser( user.id)} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor mauve clair
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,


  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontVariant: 'small-caps',
    fontStyle: 'italic',

    //changer style du titre color mauve clair  
    color: '#008b8b',

    

  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 25,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  addProfilePicButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  addProfilePicButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicText: {
    fontSize: 16,
    color: '#616161',
  },
  userList: {
    width: '100%',
    fontStyle: 'italic',
    fontVariant: 'small-caps',
  },
  userListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    //changer style italique du titre de la liste des utilisateurs
    fontStyle: 'italic',
    fontVariant: 'small-caps',
    marginBottom: 8,
    //changer couleur du titre de la liste des utilisateurs orange 
    color: '#008b8b',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  userProfilePicPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,  // ajouter un margin bottom au nom de l'utilisateur 
    color: '#0066FF',
    // ajouter une couleur au text du nom de l'utilisateur
     backgroundColor: 'F5F5F5',

  },
  userId: {
    fontSize: 16,
    color: '#616161',
  },
});

export default AdminRolesScreen;
