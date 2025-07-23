import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import './EarningsDashboard.css';

const EarningsDashboard = () => {
  const [earnings, setEarnings] = useState({
    total: 0,
    monthly: 0,
    weekly: 0,
    transactions: []
  });
  const [timeframe, setTimeframe] = useState('month');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchEarnings();
  }, [timeframe]);

  const fetchEarnings = async () => {
    try {
      const response = await fetch(`/api/lawyer/earnings?timeframe=${timeframe}`);
      const data = await response.json();
      setEarnings(data);
      processChartData(data.transactions);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    }
  };

  const processChartData = (transactions) => {
    // Process transactions for chart display
    const grouped = transactions.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + curr.amount;
      return acc;
    }, {});

    const chartData = Object.entries(grouped).map(([date, amount]) => ({
      date,
      amount
    }));

    setChartData(chartData);
  };

  return (
    <div className="earnings-dashboard">
      <div className="earnings-header">
        <h2>Earnings Overview</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="earnings-stats">
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p>₹{earnings.total}</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Earnings</h3>
          <p>₹{earnings.monthly}</p>
        </div>
        <div className="stat-card">
          <h3>Weekly Earnings</h3>
          <p>₹{earnings.weekly}</p>
        </div>
      </div>

      <div className="earnings-chart">
        <LineChart width={800} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>

      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {earnings.transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.clientName}</td>
                <td>{transaction.service}</td>
                <td>₹{transaction.amount}</td>
                <td>
                  <span className={`status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsDashboard; 