import React, { useState, useContext, useEffect } from 'react';
import {
View,
TextInput,
StyleSheet,
TouchableOpacity,
Text,
KeyboardAvoidingView,
Platform,
ScrollView,
Alert,
} from 'react-native';
import { NoteContext } from '../context/NoteContext';

const EditNoteScreen = ({ route, navigation }) => {
const { noteId } = route.params || {};
const { notes, addNote, updateNote } = useContext(NoteContext);

const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [isSaving, setIsSaving] = useState(false);

useEffect(() => {
if (noteId) {
const note = notes.find(n => n.id === noteId);
if (note) {
setTitle(note.title);
setContent(note.content);
}
}
}, [noteId, notes]);

React.useLayoutEffect(() => {
navigation.setOptions({
title: noteId ? 'Edit Note' : 'New Note',
headerRight: () => (
<TouchableOpacity
onPress={handleSave}
disabled={isSaving}
style={styles.headerButton}
>
<Text style={[
styles.headerButtonText,
isSaving && styles.headerButtonDisabled
]}>
{isSaving ? 'Saving...' : 'Save'}
</Text>
</TouchableOpacity>
),
});
}, [navigation, isSaving, title, content]);

const handleSave = async () => {
if (!title.trim()) {
Alert.alert('Error', 'Please enter a title for your note');
return;
}

try {
setIsSaving(true);
if (noteId) {
await updateNote(noteId, title, content);
} else {
await addNote(title, content);
}
navigation.goBack();
} catch (error) {
Alert.alert('Error', 'Failed to save note. Please try again.');
} finally {
setIsSaving(false);
}
};

return (
<KeyboardAvoidingView
style={styles.container}
behavior={Platform.OS === 'ios' ? 'padding' : null}
keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
>
<ScrollView style={styles.scrollContainer}>
<TextInput
style={styles.titleInput}
placeholder="Note Title"
value={title}
onChangeText={setTitle}
maxLength={100}
returnKeyType="next"
/>
<TextInput
style={styles.contentInput}
placeholder="Start writing..."
value={content}
onChangeText={setContent}
multiline
textAlignVertical="top"
/>
</ScrollView>
</KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
scrollContainer: {
flex: 1,
},
headerButton: {
marginHorizontal: 16,
},
headerButtonText: {
color: '#007AFF',
fontSize: 16,
},
headerButtonDisabled: {
opacity: 0.5,
},
titleInput: {
fontSize: 20,
fontWeight: '500',
padding: 15,
borderBottomWidth: 1,
borderBottomColor: '#eee',
},
contentInput: {
flex: 1,
fontSize: 16,
lineHeight: 24,
padding: 15,
minHeight: 300,
},
});

export default EditNoteScreen;
