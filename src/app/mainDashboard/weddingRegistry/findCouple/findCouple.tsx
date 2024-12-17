"use client";

import React, {useState} from "react";
import styles from "./findCouple.module.css";
import { useRouter } from "next/navigation";

const FindCouple: React.FC = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={handleGoBack}>
                &larr; Back
            </button>
            <p className={styles.title}>Find a registry!</p>
            <p>First, enter the access code from your invitation to discover the happy couple’s gift registry.</p>
            <p>Thereafter, select the gift(s) you love, and leave the rest to us! Our team will ensure that the thoughtfully selected are beautifully wrapped and delivered on the date chosen by the couple</p>
            <p>If you would like to make a purchase over the phone or have any queries clarified, please call us on +94712225222. Our team is always here to support you.</p>
            
            <input type="text" className={styles.inputBox}/>
            <button className={styles.findButton}>Find</button>
        </div>
    )
}

export  default FindCouple;