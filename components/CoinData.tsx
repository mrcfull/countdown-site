// components/CoinData.tsx
'use client'
import { useEffect, useState } from 'react';
import { getCoin } from '../lib/rugplay';

export default function CoinData() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getCoin('LKC2').then(setData).catch(console.error);
    }, []);

    if (!data) return <p>Loading coin...</p>;

    return (
        <div style={{ fontSize: '1rem', marginTop: '1rem' }}>
            <h3>💰 {data.coin.name} ({data.coin.symbol})</h3>
            <p>Price: {data.coin.currentPrice.toFixed(2)}</p>
            <p>24h Vol: {data.coin.volume24h.toLocaleString()}</p>
            <p>Market Cap: {data.coin.marketCap.toLocaleString()}</p>
        </div>
    );
}
