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
            dataTypeTitle: "",
            daysCount: "",
            mean: "",
            highest: "",
            smallest: "",
        }

        this.submitData = this.submitData.bind(this);
        this.attState = this.attState.bind(this);
        this.proccessData = this.proccessData.bind(this);

    }

    attState(event) {

        let state = this.state;

        if (event.target.name === "latitude") {
            state.latitude = event.target.value;
        }      
        else if (event.target.name === "longitude") {
            state.longitude = event.target.value;
        }  
        else if (event.target.name === "initialDate") {
            let date = event.target.value;
            let split = date.split('-');
            date = split[0];
            state.initialDate = date;
        }
        else if (event.target.name === "endDate") {
            let date = event.target.value;
            let split = date.split('-');
            date = split[0];
            state.endDate = date;
        }
        else if (event.target.name === "solarDataType") {

            if (event.target.value === "Surface UV Irradiance") {
                state.solarDataType = "ALLSKY_SFC_UV_INDEX";
                state.dataTypeTitle = "Surface UV Irradiance";
            }
            else if (event.target.value === "Surface UVA Irradiance") {
                state.solarDataType = "ALLSKY_SFC_UVA";
                state.dataTypeTitle = "Surface UVA Irradiance";
            }
            else if (event.target.value === "Surface UVB Irradiance") {
                state.solarDataType = "ALLSKY_SFC_UVB";
                state.dataTypeTitle = "Surface UVB Irradiance";
            }
            else if (event.target.value === "Clear Sky Surface") {
                state.solarDataType = "CLRSKY_SFC_SW_DWN";
                state.dataTypeTitle = "Clear Sky Surface";
            }

        }

        this.setState(state);
        event.preventDefault();

    }

    async submitData(e) {

        let state = this.state;
        const url = "https://power.larc.nasa.gov/api/temporal/daily/point?parameters="+`${state.solarDataType}`+"&community=RE&longitude="+`${state.longitude}`+"&latitude="+`${state.latitude}`+"&start="+`${state.initialDate}`+"&end="+`${state.endDate}`+"&format=JSON";
        
        e.preventDefault();

        console.log(url);

        try {
            const response = await fetch (url);
            const data = await response.json();
            this.proccessData(data);
            e.preventDefault() 
        }
        catch (error) {
            console.log(error)
            e.preventDefault()
        }

    }

    proccessData(data) {

        let state = this.state
        let dataContent;

        if (state.solarDataType === "ALLSKY_SFC_UV_INDEX") {
            dataContent = data.properties.parameter.ALLSKY_SFC_UV_INDEX;
        }
        else if (state.solarDataType === "ALLSKY_SFC_UVA") {
            dataContent = data.properties.parameter.ALLSKY_SFC_UVA;
        }
        else if (state.solarDataType === "ALLSKY_SFC_UVB") {
            dataContent = data.properties.parameter.ALLSKY_SFC_UVB;
        }
        else if (state.solarDataType === "CLRSKY_SFC_SW_DWN") {
            dataContent = data.properties.parameter.CLRSKY_SFC_SW_DWN;
        }

        let valuesArray = [];
        let sum = 0;
        let counter = 0;
        let highest = 0;
        let smallest = 100000;

        //let dataContentLength = Object.keys(dataContent).length

        for (var i in dataContent) {
            sum += dataContent[i];
            counter++;
            valuesArray.push(dataContent[i]);
        }

        for (var y = 0; y < valuesArray.length; y++) {

            if (valuesArray[y] > highest) {
                highest = valuesArray[y];
            }
            if (valuesArray[y] < smallest) {
                smallest = valuesArray[y];
            }

        }

        state.highest = highest;
        state.smallest = smallest;

        let mean = (sum / counter) / 2;

        console.log("sum: " + sum);
        console.log("counter: " + counter);
        console.log("mean: " + mean)
        state.mean = mean;
        state.daysCount = Math.round(counter / 2 - 0.1);
        this.setState(state);

    }

    todayDate(id) {

        let today = new Date();
        //let dd = String(today.getDate()).padStart(2, '0');
        //let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        if (id === "i") {
            today = (yyyy - 2) + '-' + 12;
        }
        else if (id === "e") {
            today = (yyyy - 1) + '-' + 12;
        }

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

                    <div id="sectionContainer" style={{marginLeft: "1rem"}}>

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
                                        <input type="month" name="initialDate" min="1981-01" max={this.todayDate("i")} style={{ borderRadius: "5px", border: "0", paddingLeft: "0.5rem" }} onChange={(e) => this.attState(e)}></input>
                                    </div>

                                    <div style={{ marginLeft: "2rem" }}>
                                        <h2 className="h2-input-title">End Date</h2>
                                        <input type="month" name="endDate" min="1981-01" max={this.todayDate("e")} style={{ borderRadius: "5px", border: "0", paddingLeft: "0.5rem" }} onChange={(e) => this.attState(e)}></input>
                                    </div>

                                </div>

                                <div style={{ width: "100%", height: "4.3rem" }}>

                                    <h2 className="h2-input-title">Solar Data Type</h2>

                                    <select className="select-input" name="solarDataType" onChange={(e) => this.attState(e)}>
                                        <option></option>
                                        <option>Clear Sky Surface</option>
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

                        <div style={{marginTop: "5rem", display: "block"}}>

                            <div style={{float: "left"}}>

                                <h2 className="h2-result-title">{this.state.dataTypeTitle}</h2>
                                <div style={{display: "flex", width: "100%"}}>
                                    <p className="p-result-attribute">Initial Date:</p>
                                    <p className="p-result-value">{this.state.initialDate}</p>
                                </div>

                                <div style={{display: "flex", width: "100%"}}>
                                    <p className="p-result-attribute">End Date:</p>
                                    <p className="p-result-value">{this.state.endDate}</p>
                                </div>

                                <div style={{display: "flex", width: "100%"}}>
                                    <p className="p-result-attribute">Average of {this.state.daysCount} days:</p>
                                    <p className="p-result-value">{this.state.mean}</p>
                                </div>

                                <div style={{display: "flex", width: "100%"}}>
                                    <p className="p-result-attribute">Highest of {this.state.daysCount} days:</p>
                                    <p className="p-result-value">{this.state.highest}</p>
                                </div>

                                <div style={{display: "flex", width: "100%"}}>
                                    <p className="p-result-attribute">Smallest of {this.state.daysCount} days:</p>
                                    <p className="p-result-value">{this.state.smallest}</p>
                                </div>

                            </div>
                            
                        </div>

                    </div>

                </div>
                        
            </div>

        )

    }
}

export default SunlightMonitoring;