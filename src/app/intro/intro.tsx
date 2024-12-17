"use client";

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import styles from "./intro.module.css";

const IntroPage: React.FC = () => {
    return(
    <div className={styles.container}>
        <div className={styles.left}>
            <h1 className={styles.title}>Welcome to Your Journey</h1>
            <p className={styles.description}>
            Join us as we embark on a new adventure together. 
            Here, we'll share our stories, celebrate milestones, 
            and connect with you in meaningful ways. Dive into our world and 
            discover what makes us tick—whether it's our latest projects, 
            personal insights, or just snippets of daily life. Let's make 
            this journey memorable together!
            </p>
        <button className={styles.loginButton}>
          Login →
        </button>
      </div>
      <div className={styles.right}>
        <img
          src="/images/intro-vector.jpg"
          alt="Holiday Illustration"
          className={styles.vector}
        />
      </div>
    </div>
    )
}

export default IntroPage;