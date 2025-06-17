import ballerina/test;
import ballerina/http;

// @test:Mock {
//     moduleName: "ballerina/http",
//     functionName: "createClient"
// }
// function mockCreateClient(string url, *http:ClientConfiguration config) returns http:Client|error {
//     return new MockWeatherClient();
// }

isolated client class MockWeatherClient {
    remote isolated function get(string path, map<string|string[]>? headers = (), string? targetType = (), http:TargetType target = http:Response) returns http:Response|anydata|http:ClientError {
        if path.includes("/current.json") {
            json payload = {
                "location": {
                    "name": "London",
                    "region": "City of London, Greater London",
                    "country": "United Kingdom",
                    "lat": 51.52,
                    "lon": -0.11,
                    "tz_id": "Europe/London",
                    "localtime_epoch": 1687123456,
                    "localtime": "2023-06-19 12:30"
                },
                "current": {
                    "last_updated_epoch": 1687123400,
                    "last_updated": "2023-06-19 12:30",
                    "temp_c": 22.0,
                    "temp_f": 71.6,
                    "is_day": 1,
                    "condition": {
                        "text": "Partly cloudy",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                        "code": 116
                    },
                    "wind_mph": 8.1,
                    "wind_kph": 13.0,
                    "wind_degree": 220,
                    "wind_dir": "SW",
                    "pressure_mb": 1015.0,
                    "pressure_in": 29.97,
                    "precip_mm": 0.0,
                    "precip_in": 0.0,
                    "humidity": 65,
                    "cloud": 25,
                    "feelslike_c": 24.4,
                    "feelslike_f": 75.9,
                    "vis_km": 10.0,
                    "vis_miles": 6.0,
                    "uv": 5.0,
                    "gust_mph": 10.5,
                    "gust_kph": 16.9
                }
            };
            return payload;
        } else if path.includes("/forecast.json") {
            json payload = {
                "location": {
                    "name": "London",
                    "region": "City of London, Greater London",
                    "country": "United Kingdom",
                    "lat": 51.52,
                    "lon": -0.11,
                    "tz_id": "Europe/London",
                    "localtime_epoch": 1687123456,
                    "localtime": "2023-06-19 12:30"
                },
                "current": {
                    "last_updated_epoch": 1687123400,
                    "last_updated": "2023-06-19 12:30",
                    "temp_c": 22.0,
                    "temp_f": 71.6,
                    "is_day": 1,
                    "condition": {
                        "text": "Partly cloudy",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                        "code": 116
                    },
                    "wind_mph": 8.1,
                    "wind_kph": 13.0,
                    "wind_degree": 220,
                    "wind_dir": "SW",
                    "pressure_mb": 1015.0,
                    "pressure_in": 29.97,
                    "precip_mm": 0.0,
                    "precip_in": 0.0,
                    "humidity": 65,
                    "cloud": 25,
                    "feelslike_c": 24.4,
                    "feelslike_f": 75.9,
                    "vis_km": 10.0,
                    "vis_miles": 6.0,
                    "uv": 5.0,
                    "gust_mph": 10.5,
                    "gust_kph": 16.9
                },
                "forecast": {
                    "forecastday": [
                        {
                            "date": "2023-06-19",
                            "date_epoch": 1687123456,
                            "day": {
                                "maxtemp_c": 25.0,
                                "maxtemp_f": 77.0,
                                "mintemp_c": 15.0,
                                "mintemp_f": 59.0,
                                "avgtemp_c": 20.0,
                                "avgtemp_f": 68.0,
                                "maxwind_mph": 12.0,
                                "maxwind_kph": 19.3,
                                "totalprecip_mm": 0.0,
                                "totalprecip_in": 0.0,
                                "totalsnow_cm": 0.0,
                                "avgvis_km": 10.0,
                                "avgvis_miles": 6.0,
                                "avghumidity": 65,
                                "daily_will_it_rain": 0,
                                "daily_chance_of_rain": 0,
                                "daily_will_it_snow": 0,
                                "daily_chance_of_snow": 0,
                                "condition": {
                                    "text": "Sunny",
                                    "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                                    "code": 1000
                                },
                                "uv": 5.0
                            },
                            "astro": {
                                "sunrise": "04:43 AM",
                                "sunset": "09:21 PM",
                                "moonrise": "05:12 AM",
                                "moonset": "10:45 PM",
                                "moon_phase": "Waxing Crescent",
                                "moon_illumination": "35",
                                "is_moon_up": 0,
                                "is_sun_up": 1
                            },
                            "hour": []
                        }
                    ]
                }
            };
            return payload;
        } else if path.includes("/future.json") {
            json payload = {
                "location": {
                    "name": "London",
                    "region": "City of London, Greater London",
                    "country": "United Kingdom",
                    "lat": 51.52,
                    "lon": -0.11,
                    "tz_id": "Europe/London",
                    "localtime_epoch": 1687123456,
                    "localtime": "2023-06-19 12:30"
                },
                "forecast": {
                    "forecastday": []
                }
            };
            return payload;
        } else if path.includes("/marine.json") {
            json payload = {
                "location": {
                    "name": "London",
                    "region": "City of London, Greater London",
                    "country": "United Kingdom",
                    "lat": 51.52,
                    "lon": -0.11,
                    "tz_id": "Europe/London",
                    "localtime_epoch": 1687123456,
                    "localtime": "2023-06-19 12:30"
                },
                "forecast": {
                    "forecastday": []
                }
            };
            return payload;
        } else if path.includes("/astronomy.json") {
            json payload = {
                "location": {
                    "name": "London",
                    "region": "City of London, Greater London",
                    "country": "United Kingdom",
                    "lat": 51.52,
                    "lon": -0.11,
                    "tz_id": "Europe/London",
                    "localtime_epoch": 1687123456,
                    "localtime": "2023-06-19 12:30"
                },
                "astronomy": {
                    "astro": {
                        "sunrise": "04:43 AM",
                        "sunset": "09:21 PM",
                        "moonrise": "05:12 AM",
                        "moonset": "10:45 PM",
                        "moon_phase": "Waxing Crescent",
                        "moon_illumination": "35",
                        "is_moon_up": 0,
                        "is_sun_up": 1
                    }
                }
            };
            return payload;
        }
        return error http:ClientError("Unsupported path");
    }
}

@test:Config {}
function testCurrentWeather() returns error? {
    http:Client testClient = check new ("http://localhost:9090");
    WeatherResponse response = check testClient->/currentWeather(city = "London");
    test:assertEquals(response.location.name, "London");
    test:assertEquals(response.current.temp_c, 22.0d);
}

@test:Config {}
function testForecast() returns error? {
    http:Client testClient = check new ("http://localhost:9090");
    ForecastResponse response = check testClient->/forecast(city = "London", days = 1);
    test:assertEquals(response.location.name, "London");
    test:assertEquals(response.forecast.forecastday[0].day.maxtemp_c, 25.0d);
}

@test:Config {}
function testFutureWeather() returns error? {
    http:Client testClient = check new ("http://localhost:9090");
    FutureResponse response = check testClient->/futureWeather(city = "London", date = "2023-06-25");
    test:assertEquals(response.location.name, "London");
}

@test:Config {}
function testMarineWeather() returns error? {
    http:Client testClient = check new ("http://localhost:9090");
    MarineResponse response = check testClient->/marineWeather(city = "London", days = 1);
    test:assertEquals(response.location.name, "London");
}

@test:Config {}
function testAstronomy() returns error? {
    http:Client testClient = check new ("http://localhost:9090");
    AstronomyResponse response = check testClient->/astronomy(city = "London", date = "2023-06-19");
    test:assertEquals(response.location.name, "London");
    test:assertEquals(response.astronomy.astro.sunrise, "04:43 AM");
}