import { Route,Routes,BrowserRouter as Router } from "react-router-dom";

// layouts
// import Layout from '../Layout';
import Home from "../components/Home";
import Game from "../components//Game";
import Start from "../components/Start";
// import ErrorPage from '../sharedComponents/ErrorBoundary/Error/Error';
// import { history } from "../store/store";

const AllRoutes = () => {
  
    return (
        <Router>
        <Routes>
                    <Route path="/" element={<Home />}>
                        
                    </Route>
                    <Route path="/new-game" element={<Start />}>
                        
                    </Route>
                    <Route path="/game/:gameId"  element={<Game />}>
                       
                    </Route>
                    <Route>
                    {/* <Layout
                        component={
                        <ErrorPage
                            error="404"
                            description="The page you are looking for does not exist"
                        />
                        }
                    /> */}
                    </Route>
            </Routes>
            </Router>
      );
};

export { AllRoutes };
