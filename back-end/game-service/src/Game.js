const Database = require('./sequelizer/Database');
const Event = require('./Event');

class Game {

  init(hydra) {
    this.hydra = hydra
    this.instanceID = this.hydra.getInstanceID();
    this.Database = Database;
    this.Database.init();

    this.Event = Event;
    this.Event.init();

    setInterval(() => {
      const health = this.hydra.getHealth();
      const currentRSS = Number(health.memory.rss / 1048576).toFixed(2);
      const currentTotal = Number(health.memory.heapTotal / 1048576).toFixed(2);
      const currentUsed = Number(health.memory.heapUsed / 1048576).toFixed(2);
      console.log('------------------------------');
      console.log(`MEM:\n    RSS: ${currentRSS}MB\n    HEAPTOTAL: ${currentTotal}MB\n    HEAPUSED: ${currentUsed}MB\nUPTIME: ${health.uptimeSeconds}`);
      console.log('------------------------------');
    }, 30000);

    console.log('[GAME] Initialized');
  }

  randomBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Number(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  messageHandler(message) {
    if (message.typ !== 'tick') {
      return;
    }

    const eventID = this.randomBetween(1, 4);
    switch (eventID) {
      case 1:
        this.Event.move();
        break;
      case 2:
        this.Event.action();
        break;
      case 3:
        this.Event.luck();
        break;
      default:
        this.Event.move();
        break;
    }
  }

}
module.exports = new Game();
