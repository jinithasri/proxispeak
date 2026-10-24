# ProxiSpeak: MongoDB Geospatial Research

## Objective
Research how avatar coordinates can be stored and indexed for proximity-based features.

## 1. Coordinate storage
For the current 2D avatar movement system, coordinates can be stored as X and Y values.

Example:
- Avatar ID: avatar1
- X coordinate: 100
- Y coordinate: 150

## 2. Geospatial indexes
- **2d index:** Used for planar coordinate data.
- **2dsphere index:** Used for geographic data on a spherical surface, such as longitude and latitude.

## 3. Relevance to ProxiSpeak
The current avatar distance calculation uses the X/Y distance formula. A MongoDB geospatial index may become useful if the application needs to search for nearby avatars in stored coordinate data.

## 4. Next step
Confirm with the backend developer whether avatar coordinates will be stored in MongoDB and which coordinate format the team will use.