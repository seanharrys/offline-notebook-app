import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
const [notes, setNotes] = useState([]);

useEffect(() => {
loadNotes();
}, []);

const loadNotes = async () => {
try {
const storedNotes = await AsyncStorage.getItem('notes');
if (storedNotes !== null) {
setNotes(JSON.parse(storedNotes));
}
} catch (error) {
console.error('Error loading notes:', error);
}
};

const saveNotes = async (updatedNotes) => {
try {
await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
setNotes(updatedNotes);
} catch (error) {
console.error('Error saving notes:', error);
}
};

const addNote = async (title, content) => {
const newNote = {
id: Date.now().toString(),
title,
content,
createdAt: new Date().toISOString(),
updatedAt: new Date().toISOString(),
};
const updatedNotes = [...notes, newNote];
await saveNotes(updatedNotes);
};

const updateNote = async (id, title, content) => {
const updatedNotes = notes.map(note =>
note.id === id
? {
...note,
title,
content,
updatedAt: new Date().toISOString()
}
: note
);
await saveNotes(updatedNotes);
};

const deleteNote = async (id) => {
const updatedNotes = notes.filter(note => note.id !== id);
await saveNotes(updatedNotes);
};

return (
<NoteContext.Provider value={{
notes,
addNote,
updateNote,
deleteNote
}}>
{children}
</NoteContext.Provider>
);
};

