function EventEmitter() {
  this.listeners = {};
}
EventEmitter.prototype.addListener = function addListener(eventName, fn) {
  if (!this.listeners[eventName]) {
    this.listeners[eventName] = [];
  }
  this.listeners[eventName].push(fn);

  return this;
};

EventEmitter.prototype.on = function on(eventName, fn) {
  return this.addListener(eventName, fn);
};

EventEmitter.prototype.removeListener = function removeListener(eventName, fn) {
  const pos = (this.listeners[eventName] || []).indexOf(fn);

  if (pos >= 0) {
    this.listeners[eventName].splice(pos, 1);
  }

  return this;
};

EventEmitter.prototype.off = function off(eventName, fn) {
  return this.removeListener(eventName, fn);
};

EventEmitter.prototype.once = function once(eventName, fn) {
  const wrap = (...args) => {
    fn(...args);
    this.off(eventName, wrap);
  };

  return this.on(eventName, wrap);
};

EventEmitter.prototype.emit = function emit(eventName, ...args) {
  const listenersForEvent = (this.listeners[eventName] || []);

  if (listenersForEvent.length === 0) {
    return false;
  }

  listenersForEvent.forEach((fn) => {
    fn(...args);
  });

  return true;
};

EventEmitter.prototype.listenerCount = function listenerCount(eventName) {
  return (this.listeners[eventName] || []).length;
};

EventEmitter.prototype.rawListeners = function rawListeners(eventName) {
  return this.listeners[eventName];
};

function eventEmiterBuilder() {
  return new EventEmitter();
}

module.exports = { eventEmiterBuilder };
