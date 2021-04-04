export default class Singles {
  constructor(data) {
    this.ids = data.ids;
  }
  recommend() {
    return this.ids.pop();
  }
}
