import { PizzaStoreEvent, PizzaAddEventType } from "./event-target";

const publishForm = document.getElementById("publishform-1");

const publishPizzaStoreEvent = new PizzaStoreEvent();

function formListenerParagaphHandler(payload: PizzaAddEventType) {
  const eventData = payload.detail;
  console.log(eventData, "paragraph listener");
}

function formListenerPreHandler(payload: PizzaAddEventType) {
  const eventData = payload.detail;
  console.log(eventData, "pre listener");
}

publishPizzaStoreEvent.subscribe(formListenerParagaphHandler);
publishPizzaStoreEvent.subscribe(formListenerPreHandler);

function formSubmitHandler(event: SubmitEvent) {
  console.log("submit handler");
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");
  if (
    name &&
    content &&
    typeof name === "string" &&
    typeof content === "string"
  ) {
    publishPizzaStoreEvent.addPizza(name, content);
  }
}

if (publishForm) {
  publishForm.addEventListener("submit", formSubmitHandler);
}
