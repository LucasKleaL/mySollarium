import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SunlightMonitoring from "./pages/SunlightMonitoring";
import HistoricData from "./pages/HistoricData";

const Routes = () => {

    return (
        <BrowserRouter>
        
            <Route path="/" exact={true} component={LandingPage}/>
            <Route path="/SunlightMonitoring" exact={true} component={SunlightMonitoring} />
            <Route path="/HistoricData" exact={true} component={HistoricData} />

            <Route path="/nasaPower" component={() => {
                window.location.href = "https://power.larc.nasa.gov/data-access-viewer/"
            }}/>
            
        </BrowserRouter>
    )

}

export default Routes;