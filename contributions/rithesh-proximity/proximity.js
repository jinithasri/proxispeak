
const PROXIMITY_RADIUS = 168;

function validateAvatar(avatar, name = "avatar") {
  if (!avatar || typeof avatar !== "object") {
    throw new TypeError(`${name} must be an object with x and y coordinates`);
  }

  for (const axis of ["x", "y"]) {
    if (
      typeof avatar[axis] !== "number" ||
      !Number.isFinite(avatar[axis])
    ) {
      throw new TypeError(`${name}.${axis} must be a finite number`);
    }
  }
}

function calculateDistance(avatarA, avatarB) {
  validateAvatar(avatarA, "avatarA");
  validateAvatar(avatarB, "avatarB");

  const dx = avatarB.x - avatarA.x;
  const dy = avatarB.y - avatarA.y;

  return Math.hypot(dx, dy);
}

function isWithinProximity(avatarA, avatarB) {
  return calculateDistance(avatarA, avatarB) <= PROXIMITY_RADIUS;
}

module.exports = {
  PROXIMITY_RADIUS,
  calculateDistance,
  isWithinProximity,
  validateAvatar,
};
