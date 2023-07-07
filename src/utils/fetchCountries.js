import axios from "axios";

var config = {
    method: 'get',
  };

export const fetchCountrydata=async()=>{
    const response = await axios("https://countriesnow.space/api/v0.1/countries/states",
    config)
    const dataRetreived=await response.data
    return dataRetreived.data
}
