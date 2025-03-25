import { useState } from 'react';

const initialCandles = [false, false, false, false, false, false];

export default function PrayerPage() {
  const [candles, setCandles] = useState(initialCandles);
  const [prayers, setPrayers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCandle, setCurrentCandle] = useState(null);
  const [newPrayer, setNewPrayer] = useState('');

  const lightCandle = (index) => {
    setCurrentCandle(index);
    setDialogOpen(true);
  };

  const submitPrayer = () => {
    const updated = [...candles];
    updated[currentCandle] = true;
    setCandles(updated);
    setPrayers([{ text: newPrayer, count: 0 }, ...prayers]);
    setDialogOpen(false);
    setNewPrayer('');
  };

  const addPrayerEmoji = (i) => {
    const updated = [...prayers];
    updated[i].count++;
    setPrayers(updated);
  };

  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Light a Candle. Say a Prayer.</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {candles.map((lit, i) => (
          <div key={i} onClick={() => !lit && lightCandle(i)} style={{ width: 60, height: 120, background: '#fde68a', borderRadius: 16, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', cursor: 'pointer' }}>
            {lit && <div style={{ position: 'absolute', top: 0, color: 'orange', fontSize: '1.5rem' }}>🔥</div>}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>🕊️ Prayers</h2>
        {prayers.length === 0 && <p>No prayers yet. Light a candle to begin.</p>}
        {prayers.map((prayer, i) => (
          <div key={i} style={{ background: '#333', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.5rem' }}>
            <p>{prayer.text}</p>
            <button onClick={() => addPrayerEmoji(i)} style={{ color: '#f472b6', marginTop: '0.5rem' }}>
              🙏 {prayer.count}
            </button>
          </div>
        ))}
      </div>

      {dialogOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', color: '#000', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: 400 }}>
            <h2>Write Your Prayer</h2>
            <textarea
              value={newPrayer}
              onChange={(e) => setNewPrayer(e.target.value)}
              placeholder="Speak from your heart..."
              style={{ width: '100%', height: '100px', marginTop: '1rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={() => setDialogOpen(false)}>Cancel</button>
              <button onClick={submitPrayer} disabled={!newPrayer.trim()}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
