import SQLite from 'react-native-sqlite-storage';

// Open the database
const db = SQLite.openDatabase(
  {
    name: 'UserDB.db',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('Error: ' + error);
  }
);

// Function to create the users table
export const createUsersTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
      );`,
      [],
      (tx, results) => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table: ' + error);
      }
    );
  });
};

// Function to add a user
export const addUser = (username, password) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (username, password) VALUES (?, ?);',
      [username, password],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('User added successfully');
        } else {
          console.log('Failed to add user');
        }
      },
      error => {
        console.log('Error adding user: ' + error);
      }
    );
  });
};

// Function to retrieve all users
export const getUsers = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users;',
      [],
      (tx, results) => {
        let users = [];
        for (let i = 0; i < results.rows.length; i++) {
          users.push(results.rows.item(i));
        }
        callback(users);
      },
      error => {
        console.log('Error retrieving users: ' + error);
      }
    );
  });
};
