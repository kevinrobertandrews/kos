import * as stateflow from "src/cool-modules/stateflow";

stateflow.watch("score", (val) => {
  console.log("Score updated:", val);
});

stateflow.set("score", 42);
stateflow.set("message", "hello", 2000); // expires in 2 seconds

console.log(stateflow.get("score")); // 42
console.log(stateflow.snapshot()); // { score: 42, message: 'hello' }

setTimeout(() => {
  console.log("After TTL:", stateflow.get("message")); // undefined
}, 2100);
