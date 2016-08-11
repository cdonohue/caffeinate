const { app, Tray } = require("electron");
const { exec, spawn } = require("child_process");

let trayIcon,
    caffeinateProcess;

app.on("ready", () => {
  let isActive = false;

  trayIcon = new Tray(`${__dirname}/images/CupTemplate.png`);

  trayIcon.on("click", () => {
    isActive = !isActive;
    if (isActive) {
      caffeinateProcess = spawn("caffeinate");
    } else {
      caffeinateProcess.kill();
    }
    trayIcon.setImage(isActive ? `${__dirname}/images/CupActiveTemplate.png` : `${__dirname}/images/CupTemplate.png`);
  });
});
