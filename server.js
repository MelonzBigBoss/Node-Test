const express = require('express');
const app = express();
const port = 3000;

const checkAccess = (req, res, next) => {
    const hasAccess = true;
    if (hasAccess) {
        next();
    } else {
        res.status(403).sendFile('static/403.html', {root: __dirname});
    }
};

app.use((req, res, next) => {
    checkAccess(req, res, next);
}, express.static('public', {index: 'main.html'}));


app.get('*', function(req, res){
    res.status(404).sendFile('static/404.html', {root: __dirname});
})

process.on('uncaughtException', (err)=>{
	console.error("error", err);
});

app.listen(port, () => {
    console.log(`Server is listening at on port ${port}`);
});

