import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Sidebar from './components/Sidebar'
import Header from './components/Header';

import TodosListPage from './pages/TodosListPage'
import TodoPage from './pages/TodoPage'

function App() {
  return (
    <div className="AppComplete ">
      <Header/>
      <div className='SidebarContentSplit'>
        <div>
          <Sidebar/>
        </div>
        <div className = "container dark">
          <div className='app'>
            <Router>
              <Routes>
                <Route path="/todos/" element={<TodosListPage/>}/>
                <Route path="/todos/todo/:id" element={<TodoPage/>}/>
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
