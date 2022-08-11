import React from 'react';
import Search from './Search/Search.jsx';
import Create from './Create/Create.jsx';
import Logo from './Logo/Logo.jsx';
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <Logo />          
            <Search />
            <Create />
        </div>
    )
}