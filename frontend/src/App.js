import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './styling/App.css';
import Sidebar from './components/Sidebar'
import Header from './components/Header';

import HomePage from './pages/HomePage'
import TodosListPage from './pages/TodosListPage'
import TodoPage from './pages/TodoPage'
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <div className="AppComplete ">
      <Header/>
      <div className='SidebarContentSplit'>
        <div>
          <Sidebar/>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/home/" element={<HomePage/>}/>
            <Route path="/todos/" element={<TodosListPage/>}/>
            <Route path="/todos/todo/:id" element={<TodoPage/>}/>
            <Route path="/calendar/" element={<CalendarPage/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
