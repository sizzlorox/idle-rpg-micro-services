class Event {

  init() {
    console.log('[EVENT] Initialized');
  }

  move() {
    console.log('[EVENT] Move');
  }

  action() {
    console.log('[EVENT] Action');
  }

  luck() {
    console.log('[EVENT] Luck');
  }
}
module.exports = new Event();
