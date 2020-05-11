const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { eventEmiterBuilder } = require('./event-emitter-proto');

const { expect } = chai;
chai.use(sinonChai);
describe('event-emiter', () => {
  describe('addListener', () => {
    const eventEmiter = eventEmiterBuilder();
    const fn = () => {};
    const event = 'testEvent';

    beforeAll(() => {
      eventEmiter.addListener(event, fn);
    });

    it('should have one element added for event', () => {
      expect(eventEmiter.listeners[event]).to.have.lengthOf(1);
    });
  });

  describe('on', () => {
    const eventEmiter = eventEmiterBuilder();
    const fn = () => {};
    const fn2 = () => {};
    const event = 'testEvent';
    const event2 = 'testEvent2';

    beforeAll(() => {
      eventEmiter.on(event, fn)
        .on(event, fn2)
        .on(event2, fn2);
    });

    it('should have two element added for event', () => {
      expect(eventEmiter.listeners[event]).to.have.lengthOf(2);
    });

    it('should have one element added for an event', () => {
      expect(eventEmiter.listeners[event2]).to.have.lengthOf(1);
    });
  });

  describe('removeListener', () => {
    const eventEmiter = eventEmiterBuilder();
    const fn = () => {};
    const event = 'testEvent';

    beforeAll(() => {
      eventEmiter.addListener(event, fn);
    });

    it('should have one element added for event and when remove should have 0', () => {
      expect(eventEmiter.listeners[event]).to.have.lengthOf(1);
      eventEmiter.removeListener(event, fn);
      expect(eventEmiter.listeners[event]).to.have.lengthOf(0);
    });
  });

  describe('off', () => {
    const eventEmiter = eventEmiterBuilder();
    const fn = () => {};
    const fn2 = () => {};
    const event = 'testEvent';
    const event2 = 'testEvent2';

    beforeAll(() => {
      eventEmiter.addListener(event, fn);
      eventEmiter.addListener(event, fn2);
      eventEmiter.addListener(event2, fn2);
    });

    it('should have two element added for event and when remove should have one and keep other events', () => {
      expect(eventEmiter.listeners[event]).to.have.lengthOf(2);
      eventEmiter.off(event, fn);
      expect(eventEmiter.listeners[event]).to.have.lengthOf(1);
      expect(eventEmiter.listeners[event2]).to.have.lengthOf(1);
    });
  });

  describe('once', () => {
    const eventEmiter = eventEmiterBuilder();
    const fn = () => {};
    const event = 'testEvent';

    beforeAll(() => {
      eventEmiter.once(event, fn);
    });

    it('should have added the function and be removed after the event is emited', () => {
      expect(eventEmiter.listeners[event]).to.have.lengthOf(1);
      eventEmiter.emit(event, 'data');
      expect(eventEmiter.listeners[event]).to.have.lengthOf(0);
    });
  });

  describe('emit', () => {
    describe('for a event with listeners', () => {
      const eventEmiter = eventEmiterBuilder();
      const fn = sinon.spy();
      const event = 'testEvent';
      let result;

      beforeAll(() => {
        eventEmiter.on(event, fn);
        result = eventEmiter.emit(event, 'data');
      });

      it('should call functions', () => {
        expect(fn).to.have.been.calledWith('data');
      });

      it('should return true', () => {
        expect(result).to.eql(true);
      });
    });

    describe('for a event without listeners', () => {
      const eventEmiter = eventEmiterBuilder();
      const event = 'testEvent';
      let result;

      beforeAll(() => {
        result = eventEmiter.emit(event, 'data');
      });

      it('should return false', () => {
        expect(result).to.eql(false);
      });
    });
  });

  describe('listenerCount', () => {
    const eventEmiter = eventEmiterBuilder();
    const fn = () => {};
    const fn2 = () => {};
    const event = 'testEvent';

    beforeAll(() => {
      eventEmiter.addListener(event, fn);
      eventEmiter.on(event, fn2);
    });

    it('should return the correct number of listeners', () => {
      expect(eventEmiter.listenerCount(event)).to.eql(2);
      expect(eventEmiter.listenerCount('other')).to.eql(0);
    });
  });

  describe('rawListeners', () => {
    const eventEmiter = eventEmiterBuilder();
    const fn = () => {};
    const fn2 = () => {};
    const event = 'testEvent';
    const event2 = 'testEvent';

    beforeAll(() => {
      eventEmiter.addListener(event, fn);
      eventEmiter.on(event2, fn2);
    });

    it('should return all the listeners', () => {
      expect(eventEmiter.rawListeners(event)).to.eql(eventEmiter.listeners[event]);
      expect(eventEmiter.rawListeners(event2)).to.eql(eventEmiter.listeners[event2]);
    });
  });
});
