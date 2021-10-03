import { React, Component } from "react";
import { Link } from "react-router-dom";
import "./../../styles/global.css";
import "./../../styles/sunlightMonitoring.css"

import { Button } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

class SunlightMonitoring extends Component {

    constructor(props) {

        super(props);
        this.state = {
            latitude: '',
            longitude: "",
            initialDate: "",
            endDate: "",
            solarDataType: "",
        }

        this.submitData = this.submitData.bind(this);

    }

    attState(event) {

        let state = this.state;
        console.log(event.target.name)

        if (event.target.name === "latitude") {
            state.latitude = event.target.value;
        }      
        else if (event.target.name === "longitude") {
            state.longitude = event.target.value;
        }  
        else if (event.target.name === "initialDate") {
            let date = event.target.value;
            date = date.replace('-', '');
            date = date.replace('-', '');
            state.initialDate = date;
        }
        else if (event.target.name === "endDate") {
            let date = event.target.value;
            date = date.replace('-', '');
            date = date.replace('-', '');
            state.endDate = date;
        }
        else if (event.target.name === "solarDataType") {
            state.solarDataType = event.target.value;
        }

        this.setState(state);
        event.preventDefault();

    }

    async submitData(e) {

        let state = this.state;

        const url = "https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_UV_INDEX&community=RE&longitude="+`${state.longitude}`+"&latitude="+`${state.latitude}`+"&start="+`${state.initialDate}`+"&end="+`${state.endDate}`+"&format=JSON";
        
        e.preventDefault()

        console.log(url)

        try {
            const response = await fetch (url);
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.log(error)
        }

    }

    todayDate() {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = + + yyyy + '-' + mm + '-' + dd;
        return today;

    }

    render() {

        return (

            <div style={{height: "100%"}}>

                <header>

                    <div style={{margin: "0.5rem", width: "1rem"}}>
                        <Link to="/">
                            <Button className="rounded-header-button" style={{borderRadius: "100%", width: "1rem"}}>
                                <ArrowBackIos fontSize="medium" style={{float: "left", color:"white"}}/>
                            </Button>  
                        </Link>
                    </div>
                    
                </header>

                <div className="div-container">

                    <div>

                        <form onSubmit={this.submitData}>

                            <h1 className="h1-title">Here you can access the solar incidence on your location.</h1>

                            <div style={{ width: "100%", height: "4.3rem" }}>
                                <h2 className="h2-input-title">Latitude</h2>
                                <input type="text" name="latitude" size="10" className="text-input" style={{ float: "left" }} placeholder="38.502" onChange={(e) => this.attState(e)}></input>
                            </div>

                            <div style={{ width: "100%", height: "4.3rem" }}>
                                <h2 className="h2-input-title">Longitude</h2>
                                <input type="text" name="longitude" className="text-input" style={{ float: "left" }} placeholder="-04.200" onChange={(e) => this.attState(e)}></input>
                            </div>

                            <p className="p-link">How I get my location latitude/longitude?</p>

                            <div style={{ display: "flex" }}>

                                <div>
                                    <h2 className="h2-input-title">Initial Date</h2>
                                    <input type="date" name="initialDate" max={this.todayDate()} style={{ borderRadius: "5px", border: "0", paddingLeft: "0.5rem" }} onChange={(e) => this.attState(e)}></input>
                                </div>

                                <div style={{ marginLeft: "2rem" }}>
                                    <h2 className="h2-input-title">End Date</h2>
                                    <input type="date" name="endDate" max={this.todayDate()} style={{ borderRadius: "5px", border: "0", paddingLeft: "0.5rem" }} onChange={(e) => this.attState(e)}></input>
                                </div>

                            </div>

                            <div style={{ width: "100%", height: "4.3rem" }}>

                                <h2 className="h2-input-title">Solar Data Type</h2>

                                <select className="select-input" name="solarDataType" onChange={(e) => this.attState(e)}>
                                    <option>Surface UV Irradiance</option>
                                    <option>Surface UVA Irradiance</option>
                                    <option>Surface UVB Irradiance</option>
                                </select>

                            </div>

                            <div style={{ paddingTop: "1rem" }}>
                                <Button variant="contained" style={{ float: "left", color: "var(--dark-blue)" }} type="submit">Submit</Button>
                            </div>

                        </form>

                    </div>

                </div>
                        
            </div>

        )

    }
}

export default SunlightMonitoring;