import styles from '@/utils/styles'
import React from 'react'

function Header() {
  return (
    <header className='w-full h-[80px] bg-[#0F1524] flex items-center justify-between'>
      <h1  className={`${styles.logo} anchor-blue`}>
        Logo
      </h1>
    </header>
  )
}

export default Header