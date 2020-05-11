const { EventEmitter } = require('events');

const CALCULATE_DATE = 'calculateDate';

class DateEventHandler extends EventEmitter {
  constructor() {
    super();

    this.preffix = String(Date.now);
    this.events = {
      CALCULATE_DATE,
    };
  }

  calculateDate(data) {
    setTimeout(() => {
      if (Math.floor(Math.random() * (2 - 1 + 1)) % 2 === 0) {
        this.emit(data.errorEventName, new Error('Random error'));
      } else {
        this.emit(data.eventName, { id: data.id, date: new Date() });
      }
    }, 1000);
  }

  getEvents(id) {
    const eventName = `${this.preffix}_${id}`;
    return {
      eventName,
      errorEventName: `${eventName}_error`,
    };
  }
}

const dateEventHandler = new DateEventHandler();

dateEventHandler.on(CALCULATE_DATE, (id) => {
  dateEventHandler.calculateDate(id);
});

module.exports = dateEventHandler;
