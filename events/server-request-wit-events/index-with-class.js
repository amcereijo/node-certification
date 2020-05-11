const http = require('http');
const dateEventHandler = require('./date-event-handler-with-class');

// declare server variables
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const id = String(Date.now());

  const { eventName, errorEventName } = dateEventHandler.getEvents(id);

  dateEventHandler.emit(dateEventHandler.events.CALCULATE_DATE, { id, eventName, errorEventName });

  dateEventHandler.once(eventName, (data) => {
    res.end(JSON.stringify(data));
  });

  dateEventHandler.once(errorEventName, (err) => {
    res.end(`Error! ${err}`);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
