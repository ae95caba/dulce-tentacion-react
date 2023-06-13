# Project shopping cart

Store page for the "Dulce Tentacion" franchise.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This project started as a simple react js project to learn state and props and grew to a full online store page with back end (firebase), responsive design and its currently being used for a real store 24/7.

## Features

- Landing page
- Shopping cart
- User accounts
- Catalog
- Order Management
- Security and Privacy

## Technologies

- ReactJS
- Firebase
- SASS
- React Select
- Fuse
- date-fns
- other libraries

## Installation

This was created using create-react-app. The instructions to run this app are in the file create-react-app.md

## Configuration

Im using appcheck (from firebase), that means that access from unneverified sources will not be allowed to use the db.
If you want to access, please contact me (go to the contact section).

## Usage

The react js app connects to the db to get the catalog data, this happens when first loaded and never again. Then it
uses that data to render components. The user can make more data and send it to the db(only if the user is logged in and makes a purchase) in the form of "purchases". The app works by showing the catalog and allowing the user to make
purchases using the shopping cart, when the user is ready to pay the app creates a whatsapp link with all the info
necesary for the purchase to complete.

## Contributing

--

## License

--

## Contact

andre.espinoza@estudiantes.unahur.edu.ar
