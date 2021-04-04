export default class Features {
  constructor(features) {
    this.danceability = features.danceability;
    this.energy = features.energy;
    this.acousticness = features.acousticness;
    this.tempo = `${Math.round(features.tempo)}BPM`;
  }
}
