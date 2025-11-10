import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from './pages/Home'
import { 
    BookOpenIcon,
    MapPinIcon,
    UserCircleIcon,
    ShoppingCartIcon,
    PhoneIcon,
    ClockIcon 
} from '@heroicons/react/24/outline';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
