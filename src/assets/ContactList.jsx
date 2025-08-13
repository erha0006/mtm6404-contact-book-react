import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('lastName'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Contact List</h1>
      <Link to="/new">Add New Contact</Link>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
