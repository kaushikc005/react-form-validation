import axios from "axios";
var data = '{\n    "country": "Nigeria"\n}';

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://countriesnow.space/api/v0.1/countries/states',
  headers: { },
  data : data
};

export const fetchStatedata=()=>{
    axios(config)
.then(function (response) {
  const data =response.data;

  return data
})
.catch(function (error) {
  console.log(error);
});

}



// import axios from "axios";
// const data = '{\n    "country": "Nigeria"\n}';
// const config = {
//     method: 'post',
//   maxBodyLength: Infinity,
//     headers: { },
//     data : data
//   };

// export const fetchStatedata=async()=>{
    
//     const response = await axios('https://countriesnow.space/api/v0.1/countries/states',
//     config)
//     const dataRetreived=await response.data
//     return dataRetreived.data
// }


// fetchStatedata()