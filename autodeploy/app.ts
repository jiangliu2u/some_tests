import * as  express from "express";
import * as bodyParser from "body-parser"
import * as path from "path";
import {getMessage,update} from "./routers/update";

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(9790, (err?: Error) => {
    if (err) {
        console.error(err)
    } else {
        console.log('App listening port 9790')
    }
});

app.get('/', (req, res) => {
    res.render("index",{title:getMessage()});
});
app.get('/update', async (req, res) => {
    await update();
    res.redirect('/');
});

// app.get('/force_end', (req, res) => {
//     res.send('ok')
//     process.exit(1)
// })