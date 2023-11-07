const pubsub: {
  events: {[key: string]: Array<(...args: any) => void> },
    publish: (event: string, data: any) => void,
    subscribe: (event: string, cb: (...args: any) => any) => void,
} = {
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
function log(message: string) {
  const style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'
  console.log(`%c${style}${message}`);
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


window.addEventListener("pizzaDelivery",console.log.bind(undefined,"pizza Delivery"));
window.dispatchEvent(pizzaEvent);

// class custom object event target
type PizzaAddEventPayloadType = {
  pizza : {
    flavor: string
  }
};

class PizzaStoreEvent extends EventTarget {

  constructor() {
    super();
  }

  // static getPizzaAddEvent() {
  //   return 'pizzaAdded';
  // }

  // addPizza(flavor: string) {
  //   const data: PizzaAddEventPayloadType = { pizza: { flavor } };
  //   this.dispatchEvent(
  //     new CustomEvent<PizzaAddEventPayloadType>(
  //       PizzaStore.getPizzaAddEvent(),{ detail: data }
  //     )
  //   );
  // }

}

const pizaas = new PizzaStoreEvent();
console.log({ pizaas});
// pizaas.addEventListener(
//   PizzaStore.getPizzaAddEvent(),
//   (event) => console.log('addEventListenter','pizza' + event)
// );

// pizaas.addPizza("supremene");



