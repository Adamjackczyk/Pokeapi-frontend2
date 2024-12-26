# PokéAPI Frontend

An interactive web application to explore Pokémon data using the PokéAPI. Users can search for Pokémon, view detailed stats, and explore their evolution chains. The application is responsive and optimized for various screen sizes.

---

## Features

- **Pokémon Data Integration:**

  - Fetch and display Pokémon data from the [PokéAPI](https://pokeapi.co/).
  - Show Pokémon stats, types, and abilities in an organized card layout.

- **Interactive Search and Filtering:**

  - Search Pokémon by name with instant results.
  - Filter Pokémon by attributes (planned for future updates).

- **Detailed Pokémon View:**

  - Toggle shiny sprites for Pokémon.
  - Explore evolution chains with navigation buttons.

- **UI/UX Enhancements:**

  - Responsive design for mobile, tablet, and desktop.
  - Smooth transitions, preloader for loading states, and a "Back to Top" button.

- **Performance Features:**
  - LocalStorage caching for fetched Pokémon data.
  - Incremental "Show More" button for loading additional Pokémon.

---

## Tech Stack

- **Frontend Framework:** React.js
- **Routing:** React Router
- **Styling:** CSS with BEM methodology
- **API:** [PokéAPI](https://pokeapi.co/)
- **Build Tools:** Create React App

---

## Setup Instructions

Follow these steps to set up and run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pokeapi-frontend.git

   ```

2. Navigate to the project directory:
   cd pokeapi-frontend

3. Install the dependencies:
   npm install

4. Start the development server:
   npm start

The app will be available at http://localhost:3000.

Usage
Explore Pokémon:

Visit the homepage to browse Pokémon.
Use the "Show More" button to load additional Pokémon.
Search Pokémon:

Enter a Pokémon's name in the search bar to find specific Pokémon.
View Pokémon Details:

Click "Show Details" to see stats, abilities, and evolution information.
Toggle shiny sprites by clicking the shiny button.
Clear Cached Data:

Use the "Clear Cache" button on the Pokémon Data page to reset the cached Pokémon data.
