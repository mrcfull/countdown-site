// lib/rugplay.ts
const API_URL = 'https://rugplay.com/api/v1';
const headers = {
    Authorization: `Bearer ${process.env.RUGPLAY_API_KEY}`,
};

export async function getCoin(symbol: string, timeframe = '1h') {
    const res = await fetch(`${API_URL}/coin/${symbol}?timeframe=${timeframe}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch coin data');
    return res.json();
}

export async function getHopium(questionId: number) {
    const res = await fetch(`${API_URL}/hopium/${questionId}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch Hopium data');
    return res.json();
}
