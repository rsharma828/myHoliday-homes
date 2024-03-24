
import Register from './pages/Register';
import SignIn from './pages/SignIn'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layouts/Layout';


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element ={<Layout>Home Page</Layout>} />
        <Route path="/search" element={<Layout>Search Page</Layout>}/>
        <Route path="/register" element={<Layout><Register/></Layout> }/>
        <Route path="/signin" element={<Layout><SignIn/></Layout>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App
