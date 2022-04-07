import { IWeather } from "../types/weather";

const Weather = (data: IWeather | undefined) => {
  return (
    <>
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
    </>
  );
};

export default Weather;
