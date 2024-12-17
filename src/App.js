import FrmLogin from './components/FrmLogin'
import Admin from './components/Admin'
import ListEquipment from './components/ListEquipment'
import Navbuttons from './components/Navbuttons'
import Tasks from './components/Tasks'
import About from './components/About'
import Filters from './components/Filters'
import FilterTypes from './components/FilterTypes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router future={{
          v7_startTransition: true,
        }}>
          <Routes>
          <Route path="/" element={<FrmLogin />} />
            <Route path="/fmnodereact/" element={<FrmLogin />} />
            <Route path="/fmnodereact/admin" element={<><Navbuttons /><Admin /></>} />
            <Route path="/fmnodereact/equipment" element={<><Navbuttons /><ListEquipment /></>} />
            <Route path="/fmnodereact/tasks" element={<><Navbuttons /><Tasks /></>} />
            <Route path="/fmnodereact/filter-types" element={<><Navbuttons /><FilterTypes /></>} />
            <Route path="/fmnodereact/about" element={<><Navbuttons /><About /></>} />
            <Route path="/fmnodereact/filters" element={<><Navbuttons /><Filters /></>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
