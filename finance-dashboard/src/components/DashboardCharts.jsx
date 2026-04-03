import { useContext } from 'react';
import { FinanceContext } from '../FinanceContext';
import { 
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, ResponsiveContainer 
} from 'recharts';

const DashboardCharts = () => {
  const { transactions } = useContext(FinanceContext);

  // --- DATA PREPARATION FOR PIE CHART (Spending Breakdown) ---
  // 1. Get only expenses
  const expenses = transactions.filter(t => t.type === 'expense');
  
  // 2. Group by category and sum the amounts
  const expensesByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // 3. Format it for Recharts: [{ name: 'Rent', value: 1500 }, ...]
  const pieData = Object.keys(expensesByCategory).map(key => ({
    name: key,
    value: expensesByCategory[key]
  }));

  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8b5cf6'];

  // --- DATA PREPARATION FOR LINE CHART (Spending Trend over time) ---
  // 1. Sort expenses by date
  const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // 2. Group by date (in case there are 2 expenses on the same day)
  const expensesByDate = sortedExpenses.reduce((acc, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
    return acc;
  }, {});

  // 3. Format it for Recharts: [{ date: '2023-10-01', amount: 50 }, ...]
  const lineData = Object.keys(expensesByDate).map(date => ({
    date,
    amount: expensesByDate[date]
  }));

  return (
    <div className="charts-container">
      {/* Categorical Chart: Pie Chart */}
      <div className="chart-card">
        <h3>Spending Breakdown</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip formatter={(value) => `$${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time-Based Chart: Line Chart */}
      <div className="chart-card">
        <h3>Spending Trend</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} tickFormatter={(value) => `$${value}`} />
              <LineTooltip formatter={(value) => `$${value}`} />
              <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;