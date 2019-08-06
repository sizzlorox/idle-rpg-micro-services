class Tick {

  init(hydra) {
    this.hydra = hydra;
    this.minTimer = 3000;
    this.maxTimer = 7500;
    this.tickAmount = 0;
  }

  getRandomWait(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Number(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  startTick() {
    let randomWait = this.getRandomWait(this.minTimer, this.maxTimer);
    console.log(`Tick timer set to: ${randomWait}`);
    let timerID = setTimeout(() => {
      let message = this.hydra.createUMFMessage({
        to: `game-service:/`,
        frm: `${this.hydra.getInstanceID()}@tick-service:/`,
        typ: 'tick',
        bdy: {
          datetime: Date.now()
        }
      });
      this.tickAmount++;
      console.log(`Sent a total of ${this.tickAmount} ticks!`);
      this.hydra.sendMessage(message);
      clearInterval(timerID);
      this.startTick();
    }, randomWait);
  }

};
module.exports = new Tick();
