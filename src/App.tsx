import axios from "axios";
import { useState } from "react";

import { IWeather } from "./types/weather";

const Spinner = () => (
  <div
    className="border-8 border-solid 
  border-[#f3f3f3] border-t-8 border-t-solid rounded-[50%] 
    w-16 h-16 animate-spin border-t-[#888888]"
  ></div>
);

function App() {
  const [data, setData] = useState<IWeather>();
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  let url: string = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a9de05ec811e92ddf69065de761ae529`;

  const searchLocation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);
      try {
        axios.get(url).then((response) => setData(response.data));
      } catch (e) {
        console.log(e);
      }
      setTimeout(() => setLoading(false), 300)
      setLocation("");
    }
  };

  return (
    <div
      className="w-screen h-screen relative bg-[#00000066] text-white 
    before:content-[''] before:bg-[url('/src/assets/sunset.jpeg')] 
    before:absolute before:w-full before:h-screen before:top-0 before:left-0 before:z-[-1] 
    before:object-cover before:bg-no-repeat before:bg-center before:bg-cover"
    >
      <div className="p-4 text-center">
        <input
          type="text"
          className="py-3 px-6 font text-xl rounded-3xl 
          border-solid border-[#ffffffcc] bg-[#ffffff33] outline-none placeholder:text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : null}

      <div
        className="max-w-[700px] max-h-[450px] sm:max-h-[700px] h-full m-auto px-1 
      py-0 relative top-[10%] flex flex-col justify-between"
      >
        <div className="w-full my-1 mx-auto">
          <div>
            <p>{data?.name}</p>
          </div>

          <div>
            {data ? (
              <h2 className="text-9xl font-bold">
                {Math.round(data?.main.temp)}°C
              </h2>
            ) : null}
          </div>

          <div className="relative right-[-90%] origin-[0_0] -rotate-90">
            <p>{data?.weather[0].main}</p>
          </div>
        </div>

        {data && (
          <div className="flex justify-evenly text-center w-full my-4 mx-auto p-4 rounded-xl bg-[#ffffff33]">
            <div>
              <p className="font-bold">{data?.main.feels_like.toFixed()}°C</p>
              <p>Feels like</p>
            </div>
            <div>
              <p className="font-bold">{data?.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div>
              <p className="font-bold">{data?.wind.speed.toFixed()}km/h</p>
              <p>Winds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
