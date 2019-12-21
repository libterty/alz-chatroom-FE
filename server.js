let express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const history = require('connect-history-api-fallback');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({ credentials: true }));
app.use(history());

if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/dist/'))

    // Handle MPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/dist/index.html')
    })
}

app.listen(port);
console.log('server started '+ port);