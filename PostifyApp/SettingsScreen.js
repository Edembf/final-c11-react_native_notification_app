import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, Pressable, ScrollView } from 'react-native';
import { query, where, setDoc, collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import Toast from "react-native-toast-message";

const SettingsScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [docRef, setDocRef] = useState(null);

  // 1. Initialisation de l'utilisateur
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
      fetchAvatar(currentUser.email);
    } else {
      Alert.alert('Erreur', 'Veuillez vous connecter.');
    }
  }, []);

  // 2. Récupération des données existantes
  const fetchAvatar = async (email) => {
    try {
      const q = query(collection(db, "user_data"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docItem = querySnapshot.docs[0]; // On prend le premier résultat
        const ref = doc(db, "user_data", docItem.id);
        
        setDocRef(ref);
        setAvatar(docItem.data().avatar || "");
        setDisplayName(docItem.data().displayName || "");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  // 3. Sauvegarde des modifications
  const saveChanges = async () => {
    try {
      if (!docRef) {
        // Création si le profil n'existe pas encore
        await addDoc(collection(db, "user_data"), {
          email: userEmail,
          avatar: avatar,
          displayName: displayName
        });
      } else {
        // Mise à jour du document existant
        await updateDoc(docRef, {
          avatar: avatar,
          displayName: displayName 
        });
      }

      Toast.show({
        type: "success",
        text1: "Succès !",
        text2: "Modifications enregistrées 👋",
        position: "top"
      });

      // Délai pour laisser le temps au toast de s'afficher
      setTimeout(() => navigation.navigate('ListUsers'), 1500);

    } catch (error) {
      Alert.alert("Erreur", "Impossible de sauvegarder.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Paramètres du profil</Text>

        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarPlaceholder}>Aucun Avatar</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nom d'affichage</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre nom"
            value={displayName}
            onChangeText={setDisplayName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>URL de l'avatar</Text>
          <TextInput
            style={styles.input}
            placeholder="Lien http://..."
            value={avatar}
            onChangeText={setAvatar}
          />
        </View>

        <Pressable style={styles.button} onPress={saveChanges}>
          <Text style={styles.buttonText}>Enregistrer</Text>
        </Pressable>
      </ScrollView>

      {/* Toujours placer le Toast à la racine du return */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffe6ff'
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333'
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    elevation: 5, // Ombre sur Android
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    overflow: 'hidden'
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    color: '#999',
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    marginLeft: 5
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    width: '100%'
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
