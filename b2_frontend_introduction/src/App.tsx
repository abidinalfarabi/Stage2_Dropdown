// import { useState } from "React";

// function App() {
//   const [data, setData] = useState(0);
//   console.log(data);

//   const sum = (): void => {
//     setData(data + 1);
//   };

//   let start = 0;
//   const sumbs = (): void => {
//     start++;
//     console.log(start);
//   };

//   return (
//     <>
//       <p>Acounting</p>
//       <p>{data}</p>
//       <button onClick={sum}>Add</button>
//       <p>Acounting variabel</p>
//       <p>{start}</p>
//       <button onClick={sumbs}>Add</button>
//     </>
//   );
// }
// export default App;
// import React, { useState, useEffect } from "react";

// function App() {
//   const [data, setData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`);
//       const responseData = await response.json();
//       setData(responseData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // const handleChange = (event) => {
//   //   setSelectedItem(event.target.value);
//   const handleChange = async (event) => {
//     setSelectedItem(event.target.value);
//     // Mengambil kembali data dari halaman pertama setiap kali dropdown diubah
//     await fetchData();
//   };

//   return (
//     <div className="App">
//       <h1>Data Wilayah Indonesia</h1>
//       <p>Pilih Provinsi</p>
//       <select value={selectedItem} onChange={handleChange}>
//         <option value="">Select a country</option>
//         {data.map((country) => (
//           <option key={country.id} value={country.name}>
//             {country.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default App;
//{selectedItem && <p>You selected: {selectedItem}</p>}

import React, { useState, useEffect } from "react";

function App() {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const fetchProvinces = () => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  };
  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince !== "") {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity !== "") {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCity}.json`)
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error("Error fetching states:", error));
    }
  }, [selectedCity]);

  useEffect(() => {
    setSelectedState("");
  }, [selectedProvince]);

  return (
    <div className="card p-3 mb-2 bg-dark text-white ">
      <div className="container d-flex justify-content-center align-items-center vh-100 mt-2 border-dark">
        <div className="w-50">
          <h1 className="text-center">Data Wilayah Indonesia</h1>
          <label className="font-style fw-bold">Provinsi</label>
          <select className="form-select mb-3" aria-label="Default select example" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
            <option value="">-- Pilih Provinsi --</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>

          <label className="font-style fw-bold">Kabupaten</label>
          <select className="form-select mb-3" aria-label="Default select example" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">-- Pilih Kabupaten --</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <label className="font-style fw-bold">Kota</label>
          <select className="form-select mb-3" aria-label="Default select example" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">-- Pilih Kota --</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>

          <p className="text-center">======*******====== </p>
          <card />
        </div>
      </div>
    </div>
  );
}

export default App;
