"use client";

import React from "react";
import styles from "./address.module.css";
import { useRouter } from "next/navigation";

const Address: React.FC = () => {
    const router = useRouter();

    const handleButton = () => {
        router.push("/mainDashboard/weddingRegistry/createRegistry/date")
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Where would you like your gifts delivered?</p>
            <div className={styles.inputGroup}>
                <input type="text" placeholder="Address Line 1" className={styles.inputBox}/>
                <input type="text" placeholder="Address Line 2" className={styles.inputBox}/>
                <input type="text" placeholder="City" className={styles.inputBox}/>
                <input type="text" placeholder="Postal Code" className={styles.inputBox}/>
            </div>

            <div className={styles.dateGroup}>
                <label className={styles.label}>And When?</label>
                <input type="date" id="date" className={styles.inputDate}/>
            </div>
            <button className={styles.button} type="button" onClick={handleButton}>Proceed</button>
        </div>
    )
}

export default Address;