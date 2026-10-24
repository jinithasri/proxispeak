
const assert = require("node:assert/strict");

const {
  PROXIMITY_RADIUS,
  calculateDistance,
  isWithinProximity,
} = require("./proximity");

assert.equal(calculateDistance({ x: 5, y: 5 }, { x: 5, y: 5 }), 0);
assert.equal(calculateDistance({ x: 0, y: 0 }, { x: 3, y: 4 }), 5);
assert.equal(calculateDistance({ x: -3, y: -4 }, { x: 0, y: 0 }), 5);

assert.equal(
  isWithinProximity({ x: 0, y: 0 }, { x: 100, y: 0 }),
  true
);

assert.equal(
  isWithinProximity({ x: 0, y: 0 }, { x: 200, y: 0 }),
  false
);

assert.equal(
  isWithinProximity(
    { x: 0, y: 0 },
    { x: PROXIMITY_RADIUS, y: 0 }
  ),
  true
);

assert.equal(
  isWithinProximity(
    { x: 0, y: 0 },
    { x: PROXIMITY_RADIUS + 1, y: 0 }
  ),
  false
);

assert.throws(() => calculateDistance(null, { x: 0, y: 0 }));
assert.throws(() => calculateDistance({}, { x: 0, y: 0 }));
assert.throws(() => calculateDistance({ x: "5", y: 0 }, { x: 0, y: 0 }));
assert.throws(() => calculateDistance({ x: NaN, y: 0 }, { x: 0, y: 0 }));
assert.throws(() => calculateDistance({ x: Infinity, y: 0 }, { x: 0, y: 0 }));

console.log("All proximity tests passed!");
