import React from 'react';
import styles from './Principal.module.css';
import Header from './Header/Header.jsx';
import Presentation from './Presentation/Presentation.jsx';
import Footer from './Footer/Footer.jsx';


export default function Principal() {

    return (
        <div className={styles.principal}>
            <Header />
            <Presentation />
            <Footer />
        </div>
    )
}