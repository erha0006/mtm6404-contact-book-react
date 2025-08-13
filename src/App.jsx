import { HashRouter, Routes, Route } from 'react-router-dom'
import ContactList from './assets/ContactList'
import ContactDetails from './assets/ContactDetails'
import ContactForm from './assets/ContactForm'

function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="/" element={<ContactList />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/contacts/new" element={<ContactForm />} />
        <Route path="/contacts/:id" element={<ContactDetails />} />
        <Route path="/contacts/:id/edit" element={<ContactForm />} />
      </Routes>
    </HashRouter>
  )
}

export default App
