'use client'
import { useEffect, useState } from 'react';
import { getCoin } from '../lib/rugplay';

interface CoinData {
    coin: {
        name: string;
        symbol: string;
        currentPrice: number;
        volume24h: number;
        marketCap: number;
    }
}

interface Props {
    symbol?: string;
    refreshInterval?: number;
}

export default function CoinData({ 
    symbol = 'LKC2',
    refreshInterval = 30000 
}: Props) {
    const [data, setData] = useState<CoinData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                setIsLoading(true);
                const result = await getCoin(symbol);
                setData(result);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch coin data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoinData();
        const interval = setInterval(fetchCoinData, refreshInterval);

        return () => clearInterval(interval);
    }, [symbol, refreshInterval]);

    if (error) {
        return (
            <div 
                role="alert" 
                className="p-4 text-red-500 bg-red-50 rounded-md"
            >
                {error}
            </div>
        );
    }

    if (isLoading || !data?.coin) {
        return (
            <div 
                role="status" 
                className="animate-pulse p-4 space-y-2"
            >
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
        );
    }

    const { name, symbol: coinSymbol, currentPrice, volume24h, marketCap } = data.coin;

    return (
        <div className="p-4 space-y-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <span role="img" aria-label="coin">💰</span>
                <span>{name} ({coinSymbol})</span>
            </h3>
            <p className="flex justify-between">
                <span>Price:</span>
                <span aria-label={`Price: ${currentPrice}`}>
                    ${currentPrice.toFixed(2)}
                </span>
            </p>
            <p className="flex justify-between">
                <span>24h Volume:</span>
                <span aria-label={`24 hour volume: ${volume24h}`}>
                    ${volume24h.toLocaleString()}
                </span>
            </p>
            <p className="flex justify-between">
                <span>Market Cap:</span>
                <span aria-label={`Market cap: ${marketCap}`}>
                    ${marketCap.toLocaleString()}
                </span>
            </p>
        </div>
    );
}