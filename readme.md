# Blackcoffer Analytics Dashboard

This project is an interactive analytics dashboard built for the Blackcoffer Data Visualization Assignment.

The dashboard takes the provided dataset, stores it in MongoDB, and uses a Node.js/Express backend to provide the data to a React frontend. The data can then be explored through filters, charts, and a paginated insights table.

## What the dashboard does

The dashboard lets you explore the dataset based on different parameters such as:

- End Year
- Topic
- Sector
- Region
- Country
- PESTLE
- Source

It also provides different ways to analyze the data using:

- Number of Insights
- Average Intensity
- Average Likelihood
- Average Relevance

The dashboard includes charts for year, country, topic, region, sector, PESTLE, and source-wise analysis.

There is also an Insight Explorer table where individual records can be viewed with pagination.

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB Atlas

## Project Structure

```text
blackcoffer-dashboard/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json