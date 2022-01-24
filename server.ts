import * as http from 'http';
import app from './app';

const PORT = process.env.PORT || 8888;

http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})