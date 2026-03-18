import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';

// Écrans
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import PostifyAddPostScreen from './PostifyAddPostScreen';
import { ListUsers } from './ListUsers';
import PostifyPostsList from './PostifyPostsList';

// Firebase & Utils
import useAuthentication from './useAuthentication';
import { Ionicons } from '@expo/vector-icons'; 
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { user } = useAuthentication();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Composant réutilisable pour le bouton Logout
  const LogoutButton = () => (
    <Pressable style={{ marginRight: 15 }} onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={24} color="grey" />
    </Pressable>
  );

  // Composant réutilisable pour le bouton Home (reçoit navigation en prop)
  const HomeButton = ({ navigation }) => (
    <Pressable style={{ marginLeft: 15 }} onPress={() => navigation.navigate('ListUsers')}>
      <Ionicons name="home" size={24} color="grey" />
    </Pressable>
  );

  if (user) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'PostifyPostsList') iconName = focused ? 'list' : 'list-outline';
              else if (route.name === 'PostifyAddPostScreen') iconName = focused ? 'add' : 'add-outline';
              else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
              else if (route.name === 'ListUsers') iconName = focused ? 'people' : 'people-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="ListUsers" 
            component={ListUsers} 
            options={{ 
              title: 'Posties',
              headerRight: () => <LogoutButton />,
            }} 
          />
          <Tab.Screen 
            name="PostifyPostsList" 
            component={PostifyPostsList} 
            options={({ navigation }) => ({ 
              title: 'Posts',
              headerRight: () => <LogoutButton />,
              headerLeft: () => <HomeButton navigation={navigation} />
            })} 
          />
          <Tab.Screen 
            name="PostifyAddPostScreen" 
            component={PostifyAddPostScreen} 
            options={({ navigation }) => ({ 
              title: 'Add Post',
              headerRight: () => <LogoutButton />,
              headerLeft: () => <HomeButton navigation={navigation} />
            })} 
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={({ navigation }) => ({ 
              title: 'Settings',
              headerRight: () => <LogoutButton />,
              headerLeft: () => <HomeButton navigation={navigation} />
            })} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>  
    );  
  }
}
