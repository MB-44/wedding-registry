"use client";

import React, {useState} from "react";
import styles from "./mainDashboard.module.css";
import { useRouter } from "next/navigation";

const MainDashboard: React.FC = () => {

    const router = useRouter();

    const handleButton = () => {
        router.push("mainDashboard/weddingRegistry");
    }
    
    return(
        <div className={styles.container}>
          <div className={styles.background}></div>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <p className={styles.desc}>The all-in-one wedding gift registry curated with Sri Lanka's finest products and experiences.</p>
                    <button className={styles.cardButton} onClick={handleButton}>Wedding Registry</button>
                </div>
            </div>
        </div>
    )
}

export default MainDashboard;