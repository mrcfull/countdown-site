// components/HopiumData.tsx
'use client'
import { useEffect, useState } from 'react';
import { getHopium } from '../lib/rugplay';

export default function HopiumData() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getHopium(237).then(setData).catch(console.error);
    }, []);

    if (!data) return <p>Loading hopium...</p>;

    const q = data.question;
    return (
        <div style={{ fontSize: '1rem', marginTop: '1rem' }}>
            <h3>📊 {q.question}</h3>
            <p>Status: {q.status}</p>
            <p>Yes: {q.yesPercentage}% | No: {q.noPercentage}%</p>
            <p>Total: {q.totalAmount} RUG</p>
        </div>
    );
}
