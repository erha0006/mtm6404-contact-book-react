import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../db'

export default function ContactDetails() {
  const { id } = useParams()
  const [contact, setContact] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const docRef = doc(db, 'contacts', id)
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() })
      } else {
        navigate('/') // Redirect if no doc found
      }
    })
  }, [id, navigate])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      await deleteDoc(doc(db, 'contacts', id))
      navigate('/')
    }
  }

  if (!contact) return <p>Loading...</p>

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Email: {contact.email}</p>
      <Link to={`/contacts/${contact.id}/edit`}>Edit</Link> |{' '}
      <button onClick={handleDelete}>Delete</button>
      <br />
      <Link to="/contacts">Back to Contact List</Link>
    </div>
  )
}

