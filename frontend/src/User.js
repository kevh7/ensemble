import Features from "./Features";

export default class User {
  constructor(data) {
    this.id = data.username;
    this.name = data.full_name;
    this.trackIDs = data.track_ids;
    this.track_features = new Features(data.track_features);
  }
  get topTrack() {
    return this.trackIDs[0];
  }
}
