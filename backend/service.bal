import ballerina/http;

configurable string openWeatherApiKey = ?;
configurable string geminiApiKey = ?;

final http:Client openWeatherClient = check new ("https://api.weatherapi.com/v1/");
final http:Client geminiClient = check new ("https://generativelanguage.googleapis.com");

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

    resource function get forecastSummary(string city, string days) returns string|error {
        // Get weather forecast data
        json forecastRes = check openWeatherClient->/forecast\.json(
            path = "",
            headers = {},
            q = city,
            key = openWeatherApiKey,
            days = days
        );
        json geminiReq = {
            contents: [
                {
                    parts: [
                        {
                            text: string `You're a weather expert. Based on the below data obtained from openweather. Give a detailed summary: ${forecastRes.toJsonString()}`
                        }
                    ]
                }
            ]
        };
        GeminiResponse geminiRes = check geminiClient->/v1beta/models/gemini\-2\.0\-flash\:generateContent.post(
            geminiReq,
            key = geminiApiKey
        );
        return geminiRes.candidates[0].content.parts[0].text;
    }
}