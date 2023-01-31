import React from 'react'
import data from './data'
import Navbar from './components/Navbar'
import Main from './components/Main'

export default function App() {
    const card = data.map(item => {
        return (
            <Main 
            key={item.title}
            item={item}
            />
        )
    })
    return (
        <div>
            <Navbar />
            <main className="card--list"> 
                {card}
            </main>
        </div>
    )
}