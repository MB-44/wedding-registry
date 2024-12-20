import React, { Suspense } from "react";
import ViewRegistryPage from "./viewRegistry";

export default function RegistryPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ViewRegistryPage />
        </Suspense>
    );
}
