const pizzaEvent = new CustomEvent("pizzaDelivery", {
  detail: {
    name: "supreme",
  },
});
window.addEventListener("pizzaDelivery", (evt: CustomEvent) =>
  console.log("pizza Delivery", evt.detail.name)
);
window.dispatchEvent(pizzaEvent);
