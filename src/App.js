import { FormControl, MenuItem, Select,Card } from "@material-ui/core";
import React,{useState,useEffect} from "react"
import './App.css';
import InfoBox from "./Components/InfoBox";
import Maps from "./Components/Maps";
import Table from "./Components/Table";
import {sortData,prettyPrintStat} from "./Components/utilities"
import "leaflet/dist/leaflet.css"
import numeral from"numeral"
function App() {

const [countries,setCountries] = useState(["India","japan","France"])
const [country,setCountry] = useState("worldwide")
const [countryInfo,setCountryInfo] = useState({})
const [tableData,setTableData] = useState([])
const [mapCenter,setMapCenter] = useState({lat:34.80746 ,lng:-40.4796})
const [casesType, setCasesType] = useState("cases");
const[mapZoom,setMapZoom]= useState(3)
const [mapCountries,setMapCountries] = useState([])

useEffect( ()=>{
  fetch("https://disease.sh/v3/covid-19/all")
 .then(response=>response.json())
 .then(data=>{
   setCountryInfo(data)
 })


},[])

useEffect(()=>{
  const getCountriesData = async ()=>{
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response)=>response.json())
    .then((data)=>{
      const countryData = data.map((country)=>(
        {name:country.country,
          value:country.countryInfo.iso3
      }
      ))

let sortedData = sortData(data)
setTableData(sortedData)
setCountries(countryData)
setMapCountries(data)
    })
    
  }
  getCountriesData()
},[])

const onChangeCountry = async (event)=>{
   const countryCode = event.target.value

   const url = countryCode==="worldwide"?"https://disease.sh/v3/covid-19/all":
  `https://disease.sh/v3/covid-19/countries/${countryCode}`

  await fetch(url)
  .then(response=>response.json())
  .then(data=>{
    setCountryInfo(data)
    console.log(data)
    setCountry(countryCode)
    setMapCenter([data.countryInfo.lat,data.countryInfo.long])
    setMapZoom(4)
  })




  
}
  return (
    <div className="App">
      <div className="App__left">
        <div className="App__header">
           <h1 >Covid Tracker</h1>
           <FormControl className="dropDown" width="90px" height="45px">
             <Select onChange={onChangeCountry} variant="outlined" value={country}>
             <MenuItem value="worldwide">worldwide</MenuItem>
                {countries.map((country,key)=>(
                  
                  <MenuItem key={country.value} value ={country.value}>
                    {country.name}
                  </MenuItem>
          )
          )}
        </Select>
        
      </FormControl>
      </div>
      <div className="App__stats"> 
         <InfoBox 
         isRed="true"
         active={casesType==="cases"}
         onClick={(e)=> setCasesType("cases")}
         title="Cases"
          cases={prettyPrintStat(countryInfo.todayCases)}
          total={numeral(countryInfo.cases).format("0.0a")}/>
         <InfoBox 
         active={casesType==="recovered"}
         onClick={(e)=> setCasesType("recovered")}
         title="Recoverd" 
          cases={prettyPrintStat(countryInfo.todayRecovered)}
          total={numeral(countryInfo.recovered).format("0.0a")}/>
         <InfoBox 
         isRed="true"
         active={casesType==="deaths"}
         onClick={(e)=> setCasesType("deaths")}
         title="Deaths" 
          cases={prettyPrintStat(countryInfo.todayDeaths)}
          total={numeral(countryInfo.deaths).format("0.0a")}/>
      </div>
      
      <Maps 
      casesType={casesType}
      center={mapCenter} zoom={mapZoom}
      countries={mapCountries}/>

      </div>
      <Card className="App__right">
           <h2>Countrywise Cases</h2>
           <Table countries={tableData}/>
      </Card>
     
    </div>
  );
}

export default App;
