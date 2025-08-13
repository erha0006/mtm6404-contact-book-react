import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore'
import { db } from '../db'

export default function ContactForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()

  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  useEffect(() => {
    if (isEdit) {
      const docRef = doc(db, 'contacts', id)
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          setContact(docSnap.data())
        } else {
          navigate('/contacts')
        }
      })
    }
  }, [id, isEdit, navigate])

  const handleChange = e => {
    setContact(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isEdit) {
      await setDoc(doc(db, 'contacts', id), contact)
      navigate(`/contacts/${id}`)
    } else {
      const docRef = await addDoc(collection(db, 'contacts'), contact)
      navigate(`/contacts/${docRef.id}`)
    }
  }

  return (
    <div>
      <h2>{isEdit ? 'Edit Contact' : 'Add New Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={contact.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={{ marginBottom: '0.5em', padding: '0.5em', width: '100%', maxWidth: '300px' }}
        />
        <br />
        <input
          name="lastName"
          value={contact.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={{ marginBottom: '0.5em', padding: '0.5em', width: '100%', maxWidth: '300px' }}
        />
        <br />
        <input
          name="email"
          type="email"
          value={contact.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ marginBottom: '0.5em', padding: '0.5em', width: '100%', maxWidth: '300px' }}
        />
        <br />
        <button type="submit" style={{ padding: '0.5em 1em' }}>
          {isEdit ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  )
}
