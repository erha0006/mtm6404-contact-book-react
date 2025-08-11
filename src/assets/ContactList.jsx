// src/assets/ContactList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('lastName'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const contactsArray = [];
      querySnapshot.forEach((doc) => {
        contactsArray.push({ id: doc.id, ...doc.data() });
      });
      setContacts(contactsArray);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Filter contacts by first or last name based on searchTerm
  const filteredContacts = contacts.filter(({ firstName, lastName }) => {
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h2>Contact List</h2>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredContacts.map(({ id, firstName, lastName, email }) => (
          <li key={id}>
            <Link to={`/contacts/${id}`}>
              {lastName}, {firstName}
            </Link>{' '}
            - {email}
          </li>
        ))}
      </ul>
      <Link to="/contacts/new">Add New Contact</Link>
    </div>
  );
}

export default ContactList;
