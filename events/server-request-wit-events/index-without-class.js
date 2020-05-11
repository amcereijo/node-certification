const http = require('http');
const { events, eventEmitter, getEvents } = require('./date-event-handler-without-class');

// declare server variables
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const id = String(Date.now());
  const { eventName, errorEventName } = getEvents(id);

  eventEmitter.emit(events.CALCULATE_DATE, { eventName, errorEventName, id });

  eventEmitter.once(eventName, (data) => {
    res.end(JSON.stringify(data));
  });

  eventEmitter.once(errorEventName, (err) => {
    res.end(`Error! ${err}`);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
