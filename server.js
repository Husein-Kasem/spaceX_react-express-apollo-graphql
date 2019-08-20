const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const path = require('path');

const app = express();

// Allow CORS
app.use(cors());

// redirecting any request to the "/graphql" path to the graphql server
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

// setting public as the static folder of the server 
app.use(express.static('public'));

// redirecting any request that isn't to "/graphql" to the react application in the public folder
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.warn(`Server started on port ${PORT}`)});