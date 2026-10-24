# ProxiSpeak — Room-to-Audio-Zone Mapping

## 1. Purpose

This document defines the mapping between ProxiSpeak virtual rooms and proposed audio zones. It describes the coordinate system, proximity rules, expected room behavior, and testing plan for proximity-based audio communication.

The mapping is based on the existing frontend room definitions in `src/lib/world.js`. Audio-zone identifiers remain proposed until they are confirmed with the team lead and audio/backend developers.

## 2. Coordinate System

The frontend uses a virtual 2D coordinate system.

- **World width:** 1200 units
- **World height:** 720 units
- **Position format:** `{ x, y }`
- **X-axis:** Increases to the right.
- **Y-axis:** Increases downward.
- **Proximity radius:** 168 units, as confirmed by the team lead.

These are virtual world units, not geographic metres or latitude/longitude coordinates.

## 3. Room-to-Audio-Zone Mapping

The following room names and IDs match the existing frontend definitions in `src/lib/world.js`.

| Frontend Room | Frontend Room ID | Proposed Audio Zone ID |
|---|---|---|
| Studio (Collaboration Hub) | `studio` | `studio` |
| Ideation Lab | `ideation` | `ideation-lab` |
| Focus Lounge | `lounge` | `focus-lounge` |

**Note:** The audio-zone IDs are proposed identifiers. They must be confirmed with the audio and backend developers before integration. The frontend room IDs should remain unchanged unless the team agrees otherwise.

## 4. Proximity Calculation

The distance between two avatars is calculated using Euclidean distance.

`distance = Math.hypot(x2 - x1, y2 - y1)`

Where:
- `x1`, `y1` represent the first avatar's position.
- `x2`, `y2` represent the second avatar's position.

### Proximity rules

- Distance less than 168 units: Within proximity.
- Distance exactly 168 units: Within proximity.
- Distance greater than 168 units: Outside proximity.

The current implementation uses an inclusive boundary, meaning avatars at exactly 168 units are considered within proximity.

## 5. Expected Room and Audio Behavior

1. Identify each avatar's current room using the application's room-management logic.
2. Obtain the corresponding room or audio-zone identifier.
3. Calculate the distance between avatars using their current positions.
4. Apply the agreed proximity-based audio rules to eligible avatars in the same room.
5. When an avatar moves to another room, update its room association so the audio system can respond correctly.
6. Prevent audio communication between different rooms unless the team explicitly implements a cross-room audio feature.

**Important:** This section describes the expected behavior. The existing room definitions and standalone proximity tests do not, by themselves, prove that room-aware audio switching is already implemented.

## 6. Testing Plan

The following tests should be completed during integration.

### Proximity tests

- Verify distance calculation for avatars at the same position.
- Verify distance calculation with positive and negative coordinates.
- Verify that avatars 167 units apart are within proximity.
- Verify that avatars exactly 168 units apart are within proximity.
- Verify that avatars 169 units apart are outside proximity.
- Verify that moving avatars into and out of the proximity radius updates the result correctly.

### Room and audio tests

- Verify that the frontend room IDs are `studio`, `ideation`, and `lounge`.
- Confirm the agreed audio-zone IDs with the audio/backend developers.
- Verify that avatars in the same room can follow the agreed proximity-based audio rules.
- Verify that moving between rooms updates the avatar's room association.
- Verify that avatars in different rooms do not automatically share room audio unless cross-room communication is explicitly supported.
- Test the behavior with two browser clients and synchronized avatar movement.

## 7. MongoDB Geospatial Status

MongoDB geospatial support is currently a research and coordination item.

- The current proximity calculation uses 2D virtual X/Y coordinates.
- MongoDB's `2d` index may be relevant if the backend needs indexed planar-coordinate queries.
- MongoDB's `2dsphere` index is intended for spherical geographic coordinates, such as longitude and latitude.
- The backend developer must confirm whether avatar positions are stored in MongoDB or currently handled through Socket.IO.
- If MongoDB storage is planned, the coordinate schema and query approach must be confirmed before implementation.

**Current status:** Research documented; actual MongoDB geospatial query implementation and testing remain unverified.

## 8. Implementation Status

| Component | Status |
|---|---|
| Proximity distance calculation | Implemented in standalone JavaScript |
| Standalone proximity tests | Passed |
| Proximity radius | Confirmed at 168 units |
| Frontend room definitions | Identified in `src/lib/world.js` |
| Room-to-audio-zone mapping | Documented; audio-zone IDs require confirmation |
| Live room-transition behavior | Pending integration verification |
| Room-aware audio behavior | Pending integration verification |
| MongoDB geospatial queries | Pending backend confirmation and verification |

## 9. Team Coordination

- **Frontend developer:** Confirm how current room IDs are assigned and updated during room transitions.
- **Backend developer:** Confirm how avatar positions and room membership are synchronized, and whether MongoDB geospatial queries are planned or implemented.
- **Audio developer/team lead:** Confirm the audio-zone identifiers and expected proximity-based audio behavior.

The existing frontend and backend integration code should not be modified without coordinating with the responsible developer.

## 10. Conclusion

ProxiSpeak's proximity logic uses a 2D virtual coordinate system of 1200 × 720 units and a confirmed proximity radius of 168 units. The frontend defines three rooms with the IDs `studio`, `ideation`, and `lounge`.

This document records the proposed mapping of those rooms to audio zones. Final integration requires confirmation of the audio-zone identifiers, verification of room transitions, testing with multiple clients, and clarification of the MongoDB implementation status.