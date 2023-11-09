type PubSubType = {
  events: {[key: string]: Array<(...args: any) => void> },
  publish: (event: string, data: any) => void,
  subscribe: (event: string, cb: (...args: any) => any) => void,
}

export const pubsub: PubSubType
  = {
    events: {},
    publish: function(event, data){
      if(this.events[event] && Array.isArray(this.events[event]) ){
        this.events[event].forEach(cb => cb(data));
      }
    },
    subscribe: function(event,cb){
      if(!this.events[event]) this.events[event] = []
      this.events[event].push(cb);
    }
  }


console.log("simple pub sub");

pubsub.subscribe('test', console.log.bind(undefined,'sub1'));
pubsub.subscribe('test',console.log.bind(undefined,'sub2'));
pubsub.publish('test','hello world');

// custom Event
const pizzaEvent = new CustomEvent("pizzaDelivery", {
  detail: {
    name: "supreme"
  }
});


window.addEventListener("pizzaDelivery",(evt: CustomEvent) => console.log("pizza Delivery",evt.detail.name));
window.dispatchEvent(pizzaEvent);

// class custom object event target
export type PizzaAddEventPayloadType = {
  name: string;
  content: string;
};

export type PizzaAddEventType = CustomEvent<PizzaAddEventPayloadType>;

export class PizzaStoreEvent extends EventTarget {
  #eventName = 'pizzaAdded';
  constructor() {
    super();
  }

  static getPizzaAddEvent() {
    return 'pizzaAdded';
  }
  subscribe(cb: (event: PizzaAddEventType) => void) {
    this.addEventListener(this.#eventName,cb); 
  }

  addPizza(flavor: string,content = 'veg') {
    const data: PizzaAddEventPayloadType = { name: flavor, content: content};
    this.dispatchEvent(
      new CustomEvent<PizzaAddEventPayloadType>(
        PizzaStoreEvent.getPizzaAddEvent(),{ detail: data }
      )
    );
  }

}

const pizaas = new PizzaStoreEvent();

pizaas.subscribe(
  (event: PizzaAddEventType) => console.log('addEventListenter','pizza', JSON.stringify(event.detail))
);
const mypizza = new PizzaStoreEvent();
mypizza.subscribe((event: PizzaAddEventType ) => console.log('mypizza',JSON.stringify(event.detail)));

mypizza.addPizza("test");
pizaas.addPizza("supremene");
