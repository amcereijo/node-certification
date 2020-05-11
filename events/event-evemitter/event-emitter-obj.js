
function eventEmiterBuilder() {
  const listeners = {};

  return (function build(obj) {
    return {
      ...obj,
      addListener(eventName, fn) {
        if (!listeners[eventName]) {
          listeners[eventName] = [];
        }
        listeners[eventName].push(fn);

        return this;
      },

      on(eventName, fn) {
        return this.addListener(eventName, fn);
      },

      removeListener(eventName, fn) {
        const pos = (listeners[eventName] || []).indexOf(fn);

        if (pos >= 0) {
          listeners[eventName].splice(pos, 1);
        }

        return this;
      },

      off(eventName, fn) {
        return this.removeListener(eventName, fn);
      },

      once(eventName, fn) {
        const wrap = (...args) => {
          fn(...args);
          this.off(eventName, wrap);
        };

        return this.on(eventName, wrap);
      },

      emit(eventName, ...args) {
        const listenersForEvent = (listeners[eventName] || []);

        if (listenersForEvent.length === 0) {
          return false;
        }

        listenersForEvent.forEach((fn) => {
          fn(...args);
        });

        return true;
      },

      listenerCount(eventName) {
        return (listeners[eventName] || []).length;
      },

      rawListeners(eventName) {
        return listeners[eventName];
      },
    };
  }({ listeners }));
}

module.exports = { eventEmiterBuilder };
