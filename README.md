# Pinflag Frontend Challenge - Pokémon App

This React application is designed as part of the frontend developer assessment for Pinflag.

## Table of Contents

- [Overview](#overview)
- [Extra Features](#extra-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Testing](#testing)

## Overview

The Pokémon App consists of three main screens:
1. **Landing Page**: A starting page with a "START" button that navigates to the PokeGrid.
2. **PokeGrid**: Displays a grid of Pokémon with pagination and filtering options. Clicking on a Pokémon card navigates to the Pokedex.
3. **Pokedex**: Shows detailed information about a selected Pokémon with a button to return to the PokeGrid.

## Extra Features

- **Dark Mode:** A toggle to switch between light and dark themes for a better viewing experience.
- **Button Animation:** An animation when pressing the `START` button on the Landing Page.
- **Pokémon Sound Effects:** Plays a sound effect for the selected Pokémon when navigating to the Pokedex.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For handling navigation between pages.
- **PokeAPI**: For fetching Pokémon data.
- **CSS/Tailwind CSS**: For styling the application.
- **Jest & React Testing Library**: For unit testing and ensuring the quality of the application.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/pokemon-app.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd reactpokeapp-main
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Start the application**:
    ```bash
    npm start
    ```

5. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Testing

To run the tests:

1. **Ensure all dependencies are installed** (refer to the Installation section).
2. **Run the test suite**:
    ```bash
    npm test
    ```
