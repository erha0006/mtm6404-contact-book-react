// src/assets/ContactList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../db';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchContacts() {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      const contactsArray = [];
      querySnapshot.forEach((doc) => {
        contactsArray.push({ id: doc.id, ...doc.data() });
      });
      contactsArray.sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );
      setContacts(contactsArray);
    }

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(({ firstName, lastName }) => {
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h2>Contact List</h2>
      <input
        type="text"
        placeholder="Search contacts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredContacts.map(({ id, firstName, lastName }) => (
          <li key={id}>
            <Link to={`/contact/${id}`}>
              {lastName}, {firstName}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button>Add New Contact</button>
      </Link>
    </div>
  );
}
