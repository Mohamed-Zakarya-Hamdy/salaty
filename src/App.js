import { useEffect, useState } from "react";
import Prayer from "./prayer/prayer";
import axios from "axios";

function App() {
  const citys = [
    { key: "Cairo", value: "Cairo" },
    { key: "Alexandria", value: "Alexandria" },
    { key: "Giza", value: "Giza" },
    { key: "Luxor", value: "Luxor" },
    { key: "Aswan", value: "Aswan" },
  ];

  const [prayApi, setPrayapi] = useState({});
  const [value, setValue] = useState("Cairo");
  const [currentDate, setCurrentDate] = useState("");

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const fetchapi = async (city) => {
    const date = getCurrentDate();
    try {
      const response = await axios(
        `https://api.aladhan.com/v1/timingsByAddress/${date}?address=${city}&method=8`
      );
      console.log("The data is", response.data.data.timings);
      setPrayapi(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  useEffect(() => {
    const date = getCurrentDate();
    setCurrentDate(date);
    fetchapi(value);
  }, [value]);

  return (
    <div className="App">
      <section>
        <div className="Container">
          <div className="topContainer">
            <div className="City">
              <h3>City</h3>
              <select onChange={(e) => setValue(e.target.value)} value={value}>
                {citys.map((city) => (
                  <option key={city.key} value={city.value}>
                    {city.key}
                  </option>
                ))}
              </select>
            </div>
            <div className="date">
              <h6>Date</h6>
              <h1>{currentDate}</h1>
            </div>
          </div>
          <Prayer time={prayApi.Fajr} pray={"Fajr"} />
          <Prayer time={prayApi.Sunrise} pray={"Sunrise"} />
          <Prayer time={prayApi.Dhuhr} pray={"Dhuhr"} />
          <Prayer time={prayApi.Asr} pray={"Asr"} />
          <Prayer time={prayApi.Maghrib} pray={"Maghrib"} />
          <Prayer time={prayApi.Isha} pray={"Isha"} />
        </div>
      </section>
    </div>
  );
}

export default App;
