import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/common/header/header'
import Footer from './components/common/footer/footer'
import Home from './components/pages/home/home'
import Club from './components/pages/club/club'
import Team from './components/pages/team/team'
import Contact from './components/pages/contact/contact'
import './index.scss'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className='app'>
          <Header />
          <main className='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/klub' element={<Club />} />
              <Route path='/druzyna' element={<Team />} />
              <Route path='/kontakt' element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
