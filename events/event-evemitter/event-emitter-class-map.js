class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  addListener(eventName, fn) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(fn);

    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    const pos = (this.listeners.get(eventName) || []).indexOf(fn);

    if (pos >= 0) {
      this.listeners.get(eventName).splice(pos, 1);
    }

    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const wrap = (...args) => {
      fn(...args);
      this.off(eventName, wrap);
    };

    return this.on(eventName, wrap);
  }

  emit(eventName, ...args) {
    const listeners = (this.listeners.get(eventName) || []);

    if (listeners.length === 0) {
      return false;
    }

    listeners.forEach((fn) => {
      fn(...args);
    });

    return true;
  }

  listenerCount(eventName) {
    return (this.listeners.get(eventName) || []).length;
  }

  rawListeners(eventName) {
    return this.listeners.get(eventName);
  }
}

module.exports = EventEmitter;
