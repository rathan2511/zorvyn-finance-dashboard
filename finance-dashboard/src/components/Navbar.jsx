import { useContext } from 'react';
import { FinanceContext } from '../FinanceContext';

const Navbar = () => {
  // Grab role and setRole from our global state
  const { role, setRole } = useContext(FinanceContext);

  return (
    <nav className="navbar">
      <h2>Zorvyn Finance</h2>
      <div className="role-switcher">
        <label>View as: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;