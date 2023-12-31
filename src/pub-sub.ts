type PubSubType = {
  events: { [key: string]: Array<(...args: any) => void> };
  publish: (event: string, data: any) => void;
  subscribe: (event: string, cb: (...args: any) => any) => void;
};

export const pubsub: PubSubType = {
  events: {},
  publish: function (event, data) {
    if (this.events[event] && Array.isArray(this.events[event])) {
      this.events[event].forEach((cb) => cb(data));
    }
  },
  subscribe: function (event, cb) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(cb);
  },
};

console.log("simple pub sub");

pubsub.subscribe("test", console.log.bind(undefined, "sub1"));
pubsub.subscribe("test", console.log.bind(undefined, "sub2"));
pubsub.publish("test", "hello world");
