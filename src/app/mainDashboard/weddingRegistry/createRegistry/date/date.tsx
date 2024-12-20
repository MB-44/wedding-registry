"use client";

import React from "react";
import styles from "./date.module.css";
import { useRouter } from "next/navigation";

const Date: React.FC = () => {
    const router = useRouter();

    const handleButton = () => {
        router.push("/mainDashboard/weddingRegistry/createRegistry/invitationLink")
    }

    return(
        <div className={styles.container}>
            <p className={styles.desc}>Congratulations _____ & ______ it is pleasure to meet you!</p>
            <p className={styles.desc}>When's your special day?</p>
            
            <div className={styles.datePicker}>
                <input type="date" id="date" className={styles.inputDate}/>
            </div>

            <p className={styles.desc}>And how many guests to you hope to invite</p>
            <input type="number" placeholder="#" className={styles.inputBox}/>
            <button type="button" className={styles.button} onClick={handleButton}>Proceed</button>
        </div>
    )
}

export default Date;