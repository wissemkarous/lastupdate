import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

function TimesheetsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const data = [
    { id: '1', name: 'karous wissem', dateString: '2023-07-11' },
    { id: '2', name: 'karous wajih', dateString: '2023-07-11' },
    { id: '3', name: 'ayoub chaari', dateString: '2023-07-12' },
    { id: '4', name: 'jacer chetoui', dateString: '2023-07-12' },
    { id: '5', name: 'leo messi', dateString: '2023-07-13' },
    { id: '6', name: 'lotfi weld ama', dateString: '2023-07-13' },
    { id: '7', name: 'mohamed ali', dateString: '2023-07-14' },
    { id: '8', name: 'mohamed salah', dateString: '2023-07-14' },
    { id: '9', name: 'mohamed amine', dateString: '2023-07-15' },
    // Ajoutez les autres utilisateurs ici
  ];

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>Username: {item.name}</Text>
      <Text>id: {item.id}</Text>
    
      {/* Ajoutez les éléments d'affichage de l'assiduité ici */}
    </View>
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()) &&
      item.dateString === selectedDate
    );
    setFilteredUsers(filteredItems);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    const filteredItems = data.filter((item) =>
      item.dateString === date.dateString
    );
    setFilteredUsers(filteredItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          theme={{
            selectedDayBackgroundColor: 'blue',
            todayTextColor: 'blue',
            arrowColor: 'blue',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
          }}
        />
      </View>
      <View style={styles.userListContainer}>
        <FlatList
          data={searchQuery && selectedDate ? filteredUsers : []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.selectedUsersContainer}>
        <Text style={styles.selectedUsersTitle}>Utilisateurs du jour sélectionné:</Text>
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 16,
  },
  calendarContainer: {
    width: '100%',
    marginBottom: 16,
  },
  userListContainer: {
    flex: 1,
    width: '100%',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedUsersContainer: {
    marginTop: 16,
  },
  selectedUsersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default TimesheetsScreen;
