import { stack } from "./stack/stack";
import { queue } from "./queue/queue";
import { createState, withHistory } from "./createState";

export { stack, queue, createState, withHistory };

const module = {
  stack,
  queue,
  createState,
  withHistory,
};
export default module;
