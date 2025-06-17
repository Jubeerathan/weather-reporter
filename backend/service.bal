import ballerina/http;

configurable string openWeatherApiKey = ?;

final http:Client openWeatherClient = check new ("https://api.weatherapi.com/v1/");

service / on new http:Listener(9090) {
    resource function get currentWeather(string city) returns WeatherResponse|error {
        WeatherResponse response = check openWeatherClient->/current\.json(
            path = "",
            headers = {},
            q = city,
            key = openWeatherApiKey
        );
        return response;
    }

    resource function get forecast(string city, int days = 7) returns ForecastResponse|error {
        ForecastResponse response = check openWeatherClient->/forecast\.json(
            path = "",
            headers = {},
            q = city,
            key = openWeatherApiKey,
            days = days.toString()
        );
        return response;
    }

    resource function get futureWeather(string city, string date) returns FutureResponse|error {
        FutureResponse response = check openWeatherClient->/future\.json(
            path = "",
            headers = {},
            q = city,
            dt = date,
            key = openWeatherApiKey
        );
        return response;
    }

    resource function get marineWeather(string city, int days = 7) returns MarineResponse|error {
        MarineResponse response = check openWeatherClient->/marine\.json(
            path = "",
            headers = {},
            q = city,
            days = days.toString(),
            key = openWeatherApiKey
        );
        return response;
    }

    resource function get astronomy(string city, string date) returns AstronomyResponse|error {
        AstronomyResponse response = check openWeatherClient->/astronomy\.json(
            path = "",
            headers = {},
            q = city,
            dt = date,
            key = openWeatherApiKey
        );
        return response;
    }
}