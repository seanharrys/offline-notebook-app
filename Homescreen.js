import React, { useContext } from 'react';
import {
View,
FlatList,
TouchableOpacity,
StyleSheet,
Text
} from 'react-native';
import { NoteContext } from '../context/NoteContext';

const HomeScreen = ({ navigation }) => {
const { notes } = useContext(NoteContext);

const renderItem = ({ item }) => (
<TouchableOpacity
style={styles.noteItem}
onPress={() => navigation.navigate('Note', { noteId: item.id })}
>
<Text style={styles.noteTitle}>{item.title}</Text>
<Text style={styles.noteDate}>
{new Date(item.updatedAt).toLocaleDateString()}
</Text>
</TouchableOpacity>
);

return (
<View style={styles.container}>
<FlatList
data={notes}
renderItem={renderItem}
keyExtractor={item => item.id}
/>
<TouchableOpacity
style={styles.fab}
onPress={() => navigation.navigate('EditNote')}
>
<Text style={styles.fabText}>+</Text>
</TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
noteItem: {
padding: 15,
borderBottomWidth: 1,
borderBottomColor: '#ccc',
},
noteTitle: {
fontSize: 16,
fontWeight: 'bold',
},
noteDate: {
fontSize: 12,
color: '#666',
marginTop: 4,
},
fab: {
position: 'absolute',
right: 30,
bottom: 30,
width: 56,
height: 56,
borderRadius: 28,
backgroundColor: '#007AFF',
justifyContent: 'center',
alignItems: 'center',
elevation: 4,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.25,
shadowRadius: 4,
},
fabText: {
fontSize: 24,
color: '#fff',
},
});

export default HomeScreen;
