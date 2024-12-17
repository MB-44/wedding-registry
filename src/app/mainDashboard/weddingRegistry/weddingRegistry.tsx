"use client";

import React, {useState} from "react";
import styles from "./weddingRegistry.module.css";
import { useRouter } from "next/navigation";

const WeddingRegistryMain: React.FC = () => {
    const router = useRouter();

    const handleRegButton = () => {
        router.push("/mainDashboard/weddingRegistry/createRegistry")
    }

    const handleFindButton = () => {
        router.push("/mainDashboard/weddingRegistry/findCouple")
    }

    return(
        <div className={styles.container}>
            <div className={styles.section}>
                <p className={styles.title}>Welcome to Wedding Registry by Spa Ceylon</p>
                <p className={styles.desc}>The all-in-one wedding gift registry curated with Sri Lanka's finest products and experiences.</p>
                
                <div className={styles.buttonContainer}>
                    <button className={styles.regButton} onClick={handleRegButton}>Start a Registry</button>
                    <button className={styles.findButton} onClick={handleFindButton}>Find a couple</button>
                </div>
            </div>
        </div>
    )
}

export default WeddingRegistryMain;