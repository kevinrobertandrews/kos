/**
 * A tiny test runner that accepts a label and a test function. If it throws, it logs the failure.
 */
export function runTest(label: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${label}`);
  } catch (err) {
    console.error(`❌ ${label}`);
    console.error(err);
  }
}
