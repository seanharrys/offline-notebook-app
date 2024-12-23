import React, { useContext } from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Alert,
ScrollView
} from 'react-native';
import { NoteContext } from '../context/NoteContext';

const NoteScreen = ({ route, navigation }) => {
const { noteId } = route.params;
const { notes, deleteNote } = useContext(NoteContext);
const note = notes.find(n => n.id === noteId);

if (!note) {
return (
<View style={styles.container}>
<Text>Note not found</Text>
</View>
);
}

const handleDelete = () => {
Alert.alert(
'Delete Note',
'Are you sure you want to delete this note?',
[
{
text: 'Cancel',
style: 'cancel',
},
{
text: 'Delete',
style: 'destructive',
onPress: async () => {
await deleteNote(noteId);
navigation.goBack();
},
},
]
);
};

React.useLayoutEffect(() => {
navigation.setOptions({
headerRight: () => (
<View style={styles.headerButtons}>
<TouchableOpacity
onPress={() => navigation.navigate('EditNote', { noteId })}
style={styles.headerButton}
>
<Text style={styles.headerButtonText}>Edit</Text>
</TouchableOpacity>
<TouchableOpacity
onPress={handleDelete}
style={[styles.headerButton, styles.deleteButton]}
>
<Text style={styles.deleteButtonText}>Delete</Text>
</TouchableOpacity>
</View>
),
});
}, [navigation, noteId]);

return (
<ScrollView style={styles.container}>
<View style={styles.noteHeader}>
<Text style={styles.noteTitle}>{note.title}</Text>
<Text style={styles.noteDate}>
Last updated: {new Date(note.updatedAt).toLocaleDateString()}
</Text>
</View>
<Text style={styles.noteContent}>{note.content}</Text>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
headerButtons: {
flexDirection: 'row',
},
headerButton: {
marginHorizontal: 8,
},
headerButtonText: {
color: '#007AFF',
fontSize: 16,
},
deleteButton: {
marginLeft: 15,
},
deleteButtonText: {
color: '#FF3B30',
fontSize: 16,
},
noteHeader: {
padding: 20,
borderBottomWidth: 1,
borderBottomColor: '#eee',
},
noteTitle: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 8,
},
noteDate: {
fontSize: 14,
color: '#666',
},
noteContent: {
fontSize: 16,
lineHeight: 24,
padding: 20,
},
});
