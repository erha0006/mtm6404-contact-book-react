import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../db'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

export default function ContactList() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('lastName'))
    const unsubscribe = onSnapshot(q, snapshot => {
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [])

  const filteredContacts = contacts.filter(c => {
    const fullName = (c.firstName + ' ' + c.lastName).toLowerCase()
    return fullName.includes(searchTerm.toLowerCase())
  })

  return (
    <div>
      <h1>Contact List</h1>
      <Link to="/contacts/new" style={{ marginBottom: '1em', display: 'inline-block' }}>
        Add New Contact
      </Link>
      <br />
      <input
        type="text"
        placeholder="Search contacts"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1em', padding: '0.5em', width: '100%', maxWidth: '300px' }}
      />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contacts/${contact.id}`}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
      {filteredContacts.length === 0 && <p>No contacts found.</p>}
    </div>
  )
}
