import './App.css'
import FridgeDetails from "./components/features/FridgeDetails/FridgeDetails.tsx";
import CompartmentDetails from "./components/features/CompartmentDetails/CompartmentDetails.tsx";
import FridgeList from "./components/features/FridgeList/FridgeList.tsx";
import ErrorPage from "./components/features/test/ErrorMessage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/common/LandingPage/LandingPage.tsx";
function App() {

  return (
    <>
{/*        <LandingPage />*/}

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<FridgeList />} />
              <Route path="/fridge/:id" element={<FridgeDetails />} />
{/*              <CompartmentDetails />*/}
{/*                      <FridgeDetails />
              <FridgeList />*/}
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
