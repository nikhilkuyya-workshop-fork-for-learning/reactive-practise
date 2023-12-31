// class custom object event target

export type PizzaAddEventPayloadType = {
  name: string;
  content: string;
};

export type PizzaAddEventType = CustomEvent<PizzaAddEventPayloadType>;

export class PizzaStoreEvent extends EventTarget {
  #eventName = "pizzaAdded";
  constructor() {
    super();
  }

  static getPizzaAddEvent() {
    return "pizzaAdded";
  }

  subscribe(cb: (event: PizzaAddEventType) => void) {
    this.addEventListener(this.#eventName, cb);
  }

  addPizza(flavor: string, content = "veg") {
    const data: PizzaAddEventPayloadType = { name: flavor, content: content };
    this.dispatchEvent(
      new CustomEvent<PizzaAddEventPayloadType>(
        PizzaStoreEvent.getPizzaAddEvent(),
        { detail: data }
      )
    );
  }
}
const pizaas = new PizzaStoreEvent();
pizaas.subscribe((event: PizzaAddEventType) =>
  console.log("addEventListenter", "pizza", JSON.stringify(event.detail))
);
const mypizza = new PizzaStoreEvent();
mypizza.subscribe((event: PizzaAddEventType) =>
  console.log("mypizza", JSON.stringify(event.detail))
);
mypizza.addPizza("test");
pizaas.addPizza("supremene");
