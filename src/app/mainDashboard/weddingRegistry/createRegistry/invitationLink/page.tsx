"use client";

import React, { useState } from "react";
import styles from "./invitationLink.module.css";
import { useRouter } from "next/navigation";

const InvitationLinkPage: React.FC = () => {
    const [uniqueCode, setUniqueCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const generateCode = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/registry/generateCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupleId: "sampleCoupleId" }),
      });
      const data = await response.json();
      if (data.success) setUniqueCode(data.uniqueCode);
    } catch (error) {
      console.error("Failed to generate unique code:", error);
    } finally {
      setLoading(false);
    }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const handleViewRegistry = () => {
      if (uniqueCode) {
        router.push(`/mainDashboard/weddingRegistry/viewRegistry?code=${uniqueCode}`);
      } else {
        alert("Generated a unique code first.");
      }
    }


  return (
    <div className={styles.container}>
      <h1>Invitation Link</h1>
      {uniqueCode ? (
        <div>
          <p>Unique Code: {uniqueCode}</p>
          <button onClick={() => copyToClipboard(uniqueCode)}>Copy Code</button>
          <p>Shareable Link:</p>
          <button
            onClick={() =>
              copyToClipboard(`${window.location.origin}/mainDashboard/weddingRegistry/viewRegistry?code=${uniqueCode}`)
            }
          >
            Copy Link
          </button>
          <button onClick={handleViewRegistry} className={styles.viewButton}>
            View Registry
          </button>
        </div>
      ) : (
        <button onClick={generateCode} disabled={loading}>
          {loading ? "Generating..." : "Generate Code"}
        </button>
      )}
    </div>
  );
};

export default InvitationLinkPage;
