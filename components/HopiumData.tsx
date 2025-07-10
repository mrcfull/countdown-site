'use client'
import { useEffect, useState } from 'react';
import { getHopium } from '../lib/rugplay';

interface HopiumQuestion {
  question: string;
  status: string;
  yesPercentage: number;
  noPercentage: number;
  totalAmount: number;
}

interface HopiumData {
  question: HopiumQuestion;
}

export default function HopiumData() {
    const [data, setData] = useState<HopiumData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getHopium(237)
            .then(setData)
            .catch((err) => {
                console.error(err);
                setError('Failed to load Hopium data');
            });
    }, []);

    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!data || !data.question) return <p>Loading hopium...</p>;

    const q = data.question;

    return (
        <div className="text-base mt-4">
            <h3>📊 {q.question}</h3>
            <p>Status: {q.status}</p>
            <p>Yes: {q.yesPercentage}% | No: {q.noPercentage}%</p>
            <p>Total: {q.totalAmount} RUG</p>
        </div>
    );
}