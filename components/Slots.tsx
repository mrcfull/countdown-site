// components/Slots.tsx
import { useState } from 'react';

const emojis = ['🍒', '🍋', '🔔', '💎', '7️⃣'];

export default function Slots() {
    const [slots, setSlots] = useState(['🍒', '🍒', '🍒']);
    const [rolling, setRolling] = useState(false);

    const spin = () => {
        setRolling(true);
        let counter = 0;
        const interval = setInterval(() => {
            setSlots([
                emojis[Math.floor(Math.random() * emojis.length)],
                emojis[Math.floor(Math.random() * emojis.length)],
                emojis[Math.floor(Math.random() * emojis.length)],
            ]);
            counter++;
            if (counter >= 15) {
                clearInterval(interval);
                setRolling(false);
            }
        }, 100);
    };

    const isWin = slots.every((s) => s === slots[0]);

    return (
        <div style={{ textAlign: 'center', marginLeft: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{slots.join(' ')}</div>
            <button onClick={spin} disabled={rolling}>
                {rolling ? 'Spinning...' : 'Spin'}
            </button>
            {!rolling && isWin && <div style={{ marginTop: '1rem', color: 'lime' }}>🎉 You win!</div>}
        </div>
    );
}
