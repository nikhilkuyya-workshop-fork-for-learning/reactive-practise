var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pubsub = {
    events: {},
    publish: function (event, data) {
        if (this.events[event] && Array.isArray(this.events[event])) {
            this.events[event].forEach(function (cb) { return cb(data); });
        }
    },
    subscribe: function (event, cb) {
        if (!this.events[event])
            this.events[event] = [];
        this.events[event].push(cb);
    }
};
function log(message) {
    var style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;';
    console.log("%c".concat(style).concat(message));
}
console.log("simple pub sub");
pubsub.subscribe('test', console.log.bind(undefined, 'sub1'));
pubsub.subscribe('test', console.log.bind(undefined, 'sub2'));
pubsub.publish('test', 'hello world');
// custom Event
var pizzaEvent = new CustomEvent("pizzaDelivery", {
    detail: {
        name: "supreme"
    }
});
window.addEventListener("pizzaDelivery", console.log.bind(undefined, "pizza Delivery"));
window.dispatchEvent(pizzaEvent);
var PizzaStoreEvent = /** @class */ (function (_super) {
    __extends(PizzaStoreEvent, _super);
    function PizzaStoreEvent() {
        return _super.call(this) || this;
    }
    return PizzaStoreEvent;
}(EventTarget));
var pizaas = new PizzaStoreEvent();
console.log({ pizaas: pizaas });
// pizaas.addEventListener(
//   PizzaStore.getPizzaAddEvent(),
//   (event) => console.log('addEventListenter','pizza' + event)
// );
// pizaas.addPizza("supremene");
