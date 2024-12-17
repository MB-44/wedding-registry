"use client";

import React from "react";
import styles from "./createRegistry.module.css";
import { useRouter } from "next/navigation";

const CreateRegistry: React.FC = () => {
    const router = useRouter();

    const handleButton = () => {
        router.push("/mainDashboard/weddingRegistry/createRegistry/address")
    }


    return (
        <div className={styles.container}>
            <p className={styles.title}>Welcome to Wedding Registry by Spa Ceylon</p>
            <p className={styles.desc}>We're excited to help you create your dream registry! This will take just a moment</p>
            <hr />
            <p className={styles.startDesc}>To start off, what's your name?</p>
            <div className={styles.nameGroup}>
                <input type="text" placeholder="First" className={styles.inputBox} required/>
                <input type="text" placeholder="Last" className={styles.inputBox}/>
            </div>
            <p className={styles.endDesc}>And who might your better half be?</p>
            <div className={styles.nameGroup}>
                <input type="text" placeholder="First" className={styles.inputBox} required/>
                <input type="text" placeholder="Last" className={styles.inputBox}/>
            </div>
            <button className={styles.button} onClick={handleButton}>Proceed</button>
        </div>
    )
}

export default CreateRegistry;