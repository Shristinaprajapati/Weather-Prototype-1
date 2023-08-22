<!-- HTML form -->
<form method="POST" action="weather.php">
    <label for="city">Enter city:</label>
    <input type="text" name="city" id="city" required>
    <label for="country">Enter country:</label>
    <input type="text" name="country" id="country">
    <button type="submit">Get weather</button>
</form>
<?php
// weather.php file

// Function that fetches weather data from the OpenWeatherMap API
function WeatherFetch($city, $country) {
    $API_KEY = "a1e456013e417b1576aa5725cd9de8bf";
    $url = "https://api.openweathermap.org/data/2.5/weather?q={$city},{$country}&units=metric&appid={$API_KEY}";
    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Function that updates the weather display with data from the API
function updateWeather($data) {
    $name = $data['name'];
    $weather = $data['weather'][0];
    $main = $data['main'];
    $wind = $data['wind'];
    $clouds = $data['clouds'];
    $dt = $data['dt'];
    $timezone = $data['timezone'];
    $country = $data['sys']['country'];
    $icon = $weather['icon'];
    $description = $weather['description'];
    $temp = $main['temp'];
    $humidity = $main['humidity'];
    $pressure = $main['pressure'];
    $temp_min = $main['temp_min'];
    $temp_max = $main['temp_max'];
    $speed = $wind['speed'];
    $all = $clouds['all'];

    $date = new DateTime();
    $date->setTimestamp($dt);
    $options = ['weekday' => 'long', 'year' => 'numeric', 'month' => 'long', 'day' => 'numeric'];
    $dateString = $date->format('Y-m-d H:i:s');

    // Update the weather display
    echo "<div class='name'>$name</div>";
    echo "<div class='temp'>" . round($temp) . "°c</div>";
    echo "<img class='icon' src='https://openweathermap.org/img/w/$icon.png'>";
    echo "<div class='condition'>$description</div>";
    echo "<div class='humidity'>$humidity%</div>";
    echo "<div class='wind'>$speed km/hr</div>";
    echo "<div class='cloud'>$all%</div>";
    echo "<div class='pressure'>$pressure mb</div>";
    echo "<div class='max_temp'>$temp_max°C</div>";
    echo "<div class='min_temp'>$temp_min°C</div>";
    echo "<div class='date'>$dateString</div>";
    echo "<div class='time'>$timeString</div>";
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $city = $_POST['city'];
    $country = $_POST['country'];
    $data = WeatherFetch($city, $country);
    if ($data) {
        updateWeather($data);
    } else {
        echo "Error fetching weather data.";
    }
}
?> 


<!---CREATE TABLE weather_data (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    temp FLOAT(4, 2) NOT NULL,
    humidity INT(11) NOT NULL,
    pressure INT(11) NOT NULL,
    wind_speed FLOAT(4, 2) NOT NULL,
    cloudiness INT(11) NOT NULL,
    date_time DATETIME NOT NULL
);

<?php

// Get the weather data from the API
$city = $_POST['city'];
$country = $_POST['country'];
$weatherData = getWeatherData($city, $country);

// Insert the weather data into the database
$dbHost = 'localhost';
$dbName = 'weather_app';
$dbUser = 'root';
$dbPass = '';

try {
    // Connect to the database using PDO
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
    
    // Prepare the SQL statement for inserting the data
    $stmt = $pdo->prepare("INSERT INTO weather_data (city, country, temp, humidity, pressure, wind_speed, cloudiness, date_time) VALUES (:city, :country, :temp, :humidity, :pressure, :wind_speed, :cloudiness, :date_time)");
    
    // Bind the values to the parameters
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':country', $country);
    $stmt->bindParam(':temp', $weatherData['temp']);
    $stmt->bindParam(':humidity', $weatherData['humidity']);
    $stmt->bindParam(':pressure', $weatherData['pressure']);
    $stmt->bindParam(':wind_speed', $weatherData['wind_speed']);
    $stmt->bindParam(':cloudiness', $weatherData['cloudiness']);
    $stmt->bindParam(':date_time', $weatherData['date_time']);

    // Execute the SQL statement
    $stmt->execute();
    
    echo "Weather data inserted into the database successfully!";
} catch (PDOException $e) {
    echo "Error inserting weather data into the database: " . $e->getMessage();
}

--->
