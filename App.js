import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoteProvider } from './src/context/NoteContext';
import HomeScreen from './src/screens/HomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import EditNoteScreen from './src/screens/EditNoteScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NoteProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f8f8f8',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="home" 
            component={HomeScreen} 
            options={{ title: 'My Notes' }}
          />
          <Stack.Screen name="Note" component={NoteScreen} />
          <Stack.Screen 
            name="EditNote" 
            component={EditNoteScreen}
            options={({ route }) => ({
              title: route.params?.noteId ? 'Edit Note' : 'New Note',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NoteProvider>
  );
}
