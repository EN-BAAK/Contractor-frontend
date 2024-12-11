import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { useAppContext } from "./context/AppContext"
import Login from "./screens/Login"
import AdminScreen from "./layouts/AdminScreen"
import Users from "./screens/Users"
import Renews from "./screens/Renews"
import Contractors from "./screens/Contractors"
import FinishedContracts from "./screens/FinishedContractors"
import Testers from "./screens/Testers"
import Error from "./screens/Error"

function App() {

  const { isLoggedIn, user } = useAppContext()

  return (
    <div>
      <Router>
        <Routes>
          {!isLoggedIn ?
            <>
              <Route path="/" element={<Login />} />
            </> :
            <>
              {user
                ?
                user.role === "admin"
                  ?
                  <>
                    <Route path="/" element={
                      <AdminScreen>
                        <Renews />
                      </AdminScreen>
                    } />
                    <Route path="/users" element={
                      <AdminScreen>
                        <Users />
                      </AdminScreen>
                    } />
                    <Route path="/contractors" element={
                      <AdminScreen>
                        <Contractors />
                      </AdminScreen>
                    } />
                    <Route path="/finished-contracts" element={
                      <AdminScreen>
                        <FinishedContracts />
                      </AdminScreen>
                    } />
                  </>
                  : user.role === "secretary"
                    ?
                    <Route path="/" element={
                      <Renews />
                    } />
                    :
                    <Route path="/" element={
                      <Testers />
                    } />
                :
                <Route path="/" element={
                  <h1>Internal server error 500 :- {"("}</h1>
                } />
              }
            </>
          }
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
