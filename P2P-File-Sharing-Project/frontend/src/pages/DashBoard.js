import React from 'react'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import { useState } from 'react'

const DashBoard = ({setIsLoggedIn}) => {

    const [isDarkTheme, setTheme] = useState(false);
  return (
    <div>

        <Navbar setIsLoggedIn={setIsLoggedIn} setTheme={setTheme} isDarkTheme={isDarkTheme}/>
        <Main setTheme={setTheme} isDarkTheme={isDarkTheme}/>
        
    </div>
  )
}

export default DashBoard