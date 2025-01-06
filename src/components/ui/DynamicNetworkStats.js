


import { useState, useEffect } from 'react';

export default function DynamicNetworkStats({ initialStats }) {
    const [stats, setStats] = useState(initialStats);

    // Fetch updated stats from your API periodically
    const fetchStats = async () => {
        try {
            const response = await fetch('/api/stats');
            const updatedStats = await response.json();
            setStats(updatedStats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        // Fetch data on mount and every 10 seconds
        fetchStats();
        const interval = setInterval(fetchStats, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="stats-grid">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ background: `linear-gradient(${stat.gradientDirection}, #e0e0e0, #f9f9f9)` }}>
                    <h3>{stat.title}</h3>
                    <p>{stat.value} {stat.metric && <span>{stat.metric}</span>}</p>
                    {stat.ctaTitle && <a href={stat.ctaHref}>{stat.ctaTitle}</a>}
                </div>
            ))}
        </div>
    );
}