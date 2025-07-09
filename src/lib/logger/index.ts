/*

- log.debug()
- log.info()
- log.warn()
- log.error() 

*/

export function log(...message: any[]) {
  console.log(...message);
}

export default {
  log,
};
