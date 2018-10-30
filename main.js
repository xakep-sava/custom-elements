"use strict";

document.addEventListener("DOMContentLoaded", e => {
  for (let i = 0; i < 10; i++) {
    let savaTimerTag = document.createElement("sava-timer");
    savaTimerTag.title = "Click to pause/continue | Double click to restart";
    savaTimerTag.innerHTML = "0 сек";

    document.body.appendChild(savaTimerTag);

    savaTimerTag.addEventListener("click", function() {
      this.pauseOrContinue();
    });

    savaTimerTag.addEventListener("dblclick", function() {
      this.restart();
    });
  }

  const SavaTimerProto = Object.create(HTMLElement.prototype);

  SavaTimerProto.init = function() {
    this.currentTick = 0;
    this.innerHTML = "0 сек";
    this.isPause = true;
  };

  SavaTimerProto.tick = function() {
    this.currentTick += this.step;
    this.innerHTML = `${this.currentTick} сек`;
  };

  SavaTimerProto.start = function(step = 1) {
    this.step = step;
    this.init();
    this.isPause = false;
    this.continue();
  };

  SavaTimerProto.continue = function() {
    this.style.setProperty("--color-text-timer", "black");
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  };

  SavaTimerProto.pauseOrContinue = function() {
    this.isPause = !this.isPause;
    clearInterval(this.timer);

    if (!this.isPause) {
      this.continue();
    } else {
      this.style.setProperty("--color-text-timer", "red");
    }
  };

  SavaTimerProto.restart = function() {
    this.init();
  };

  SavaTimerProto.attachedCallback = function() {
    this.start();
  };

  setTimeout(() => {
    document.registerElement("sava-timer", {
      prototype: SavaTimerProto
    });
  }, 1000);
});
