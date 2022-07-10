const express = require('express');
const app = express();
const folder = `${__dirname}/src`;

const connectExpress = function(port) {
    app.listen(port, () => {
        console.log(`Express listening on port ${port}`);
    });
}
connectExpress(3000);

app.use(express.static(folder));

app.get('/', (req, res) => {
    res.sendFile(`${folder}/index.html`);
});