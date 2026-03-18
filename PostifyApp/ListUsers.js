// 1. Correction des imports (ScrollView vient de react-native)
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, Image, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import Toast from 'react-native-toast-message'; // Assure-toi que l'import est correct

export const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        try {
          const q = query(collection(db, "user_data"));
          const querySnapshot = await getDocs(q);
          const fetchedUsers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          const currentUser = fetchedUsers.find((u) => u.email === auth.currentUser?.email);
          const otherUsers = fetchedUsers.filter((u) => u.email !== auth.currentUser?.email);
          
          // Filtrer pour éviter les crashs si currentUser n'est pas encore en DB
          const finalArray = currentUser ? [currentUser, ...otherUsers] : otherUsers;
          setUsers(finalArray);        
        } catch (error) {
          console.error('Error fetching users:', error);
        }     
      };
      fetchUsers();
    }, [auth.currentUser]) // Ajout de la dépendance
  );

  return (
    // 2. Utilisation d'une View parente unique (ou un Fragment <></>)
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      
      <Text style={styles.title}>Utilisateurs</Text>

      {/* 3. Utiliser FlatList SEULE (elle gère déjà le scroll) */}
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.userContainer}
            onPress={() => navigation.navigate('PostifyPostsList', { poster: item.email })}
          >
            <Image
              source={{
                uri: item.avatar ? item.avatar : 'https://randomuser.me/api/portraits/lego/1.jpg',
              }}
              style={[
                styles.avatar,
                item.email === auth.currentUser?.email && styles.currentUserAvatarBorder
              ]}
            />
            <Text style={styles.username}>
              {item.displayName ? item.displayName : item.email}
              {item.email === auth.currentUser?.email && " (Moi)"}
            </Text>
          </Pressable>
        )}
      />
      
      {/* Le Toast est bien à l'intérieur du parent unique */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15, // Un peu plus d'espace
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  title: {
    fontSize: 24,
    margin: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
  },
  username: {
    fontSize: 18,
    color: '#333',
  },
  currentUserAvatarBorder: {
    borderColor: 'purple',
    borderWidth: 3
  }
});
