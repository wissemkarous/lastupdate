import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

function TimesheetsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const data = [
    { id: '1', name: 'karous wissem', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '2', name: 'karous wajih', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '3', name: 'ayoub chaari', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '4', name: 'jacer chetoui', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '5', name: 'leo messi', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '6', name: 'lotfi weld ama', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '7', name: 'karouswissem', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '8', name: 'karouswajih', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '9', name: 'ayoubchaari', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '10', name: 'jacerchetoui', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '11', name: 'leomessi', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '12', name: 'lotfi weld ama', worktime:'from 8 am to 2 pm', dateString: '2023-07-11' },
    { id: '13', name: 'mohamed ali', worktime:'from 8 am to 2 pm', dateString: '2023-07-14' },
    { id: '14', name: 'mohamed salah', worktime:'from 8 am to 2 pm', dateString: '2023-07-14' },
    { id: '15', name: 'mohamed amine', worktime:'from 8 am to 2 pm', dateString: '2023-07-15' },
    // Ajoutez les autres utilisateurs ici
  ];

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View>
        <Text>Username: {item.name}</Text>
        <Text>ID: {item.id}</Text>
        <Text>Worktime: {item.worktime}</Text>
      </View>
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
      {selectedDate && (
        <View style={styles.selectedUsersContainer}>
          <Text style={styles.selectedUsersTitle}>Users of the selected day:</Text>
          <FlatList
            data={filteredUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
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
  selectedUsersContainer: {
    flex: 1,
    width: '100%',
  },
  selectedUsersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
});

export default TimesheetsScreen;
