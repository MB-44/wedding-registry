"use client";

import React, {useState} from "react";
import styles from "./registration.module.css";

const RegistrationPage: React.FC = () => {
    return(
        <div className={styles.container}>
            <form className={styles.form}>
                <h2 className={styles.title}>Register</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input type="text" id="firstName" className={styles.input} required/>

                    <label htmlFor="lName" className={styles.label}>Last Name</label>
                    <input type="text" id="lastName" className={styles.input} required/>

                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" className={styles.input} required/>

                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input type="password" id="password" className={styles.input} required/>
                </div>
                <button type="submit" className={styles.button}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegistrationPage;