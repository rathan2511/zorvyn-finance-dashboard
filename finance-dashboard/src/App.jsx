import './App.css'
import Navbar from './components/Navbar'
import SummaryCards from './components/SummaryCards'
import DashboardCharts from './components/DashboardCharts'
import Insights from './components/Insights' // Import it
import TransactionList from './components/TransactionList' 

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <SummaryCards />
        <DashboardCharts />
        <Insights /> {/* Render it here */}
        <TransactionList />
      </main>
    </div>
  )
}

export default App