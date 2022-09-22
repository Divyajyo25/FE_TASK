import React from 'react'
import search from '../images/search.png'
import settings from '../images/settings.png'

function Header() {
  return (
    <div>
      <div className='header'>
        <div className='btngroup'>
          <button className='headerbtn'>Coins</button>
          <button className='headerbtn'>Exchanges</button>
          <button className='headerbtn'>Swap</button>
        </div>
        <div>
          <img className='searchimg' src={search}></img>
        </div>
        <div>
          <img className='settingsimg' src={settings}></img>
        </div>
        <div>
          <button className='connectbtn'>Connect Wallet</button>
        </div>
      </div>
    </div>
  )
}

export default Header