import './App.css'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import { ToastContainer } from 'react-toastify'


function App() {


  return (
    <div>
      <Navbar />
      <Searchbar />
      <ToastContainer />
    </div>
  )
}

export default App
