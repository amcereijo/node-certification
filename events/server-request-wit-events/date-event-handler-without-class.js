const { EventEmitter } = require('events');

const CALCULATE_DATE = 'calculateDate';
const eventEmitter = new EventEmitter();

function calculateDate(data) {
  setTimeout(() => {
    if (Math.floor(Math.random() * (2 - 1 + 1)) % 2 === 0) {
      eventEmitter.emit(data.errorEventName, new Error('Random error'));
    } else {
      eventEmitter.emit(data.eventName, { id: data.id, date: new Date() });
    }
  }, 1000);
}

function getEvents(id) {
  const eventName = `${id}`;
  return {
    eventName,
    errorEventName: `${eventName}_error`,
  };
}

eventEmitter.on(CALCULATE_DATE, calculateDate);

module.exports = {
  eventEmitter,
  getEvents,
  events: {
    CALCULATE_DATE,
  },
};
