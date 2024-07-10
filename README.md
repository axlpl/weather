### README.md

# Weather Dashboard

This is a weather dashboard application built with Vue 3, Pinia, and TypeScript. It fetches and displays the current weather for a given location.

## Features

- Search for a city to get current weather information
- Display temperature, humidity, wind speed, and a brief description of the weather conditions
- Show a weather icon corresponding to the current weather
- Responsive design for both desktop and mobile devices
- Multi-language support (English and Polish)
- Docker configuration for easy setup and deployment

## Requirements

- Node.js (v18.18.0 or later)
- npm or yarn
- Docker (optional, for containerized setup)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/axlpl/weather.git
   cd weather
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configuration:**

   - Copy the `.env.example` file to `.env` and fill in the required configuration values:

     ```sh
     cp .env.example .env
     ```

   - Edit the `.env` file to include your OpenWeatherMap API URL and key:

     ```env
     VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
     VITE_WEATHER_API_KEY=your_api_key_here
     ```

4. **Start the development server:**

   ```sh
   npm run dev
   ```

5. **Open your browser and navigate to `http://localhost:5173`.**

## Running Tests

To run unit tests, use the following command:

```sh
npm run test:unit
```

## Docker Setup

If you prefer to run the application in a Docker container, follow these steps:

1. **Build the Docker image:**

   ```sh
   docker build -t weather .
   ```

2. **Run the Docker container:**

   ```sh
   docker run -d -p 4173:4173 --env-file .env weather
   ```

   This will start the application and make it accessible at `http://localhost:4173`.

## License

This project is licensed under the MIT License.
