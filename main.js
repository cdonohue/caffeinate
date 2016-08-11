const { app, Tray } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const terminate = require("terminate");

let trayIcon,
    caffeinateProcess;

app.on("ready", () => {
  let isActive = false;

  trayIcon = new Tray(`${__dirname}/images/CupTemplate.png`);

  trayIcon.on("click", () => {
    isActive = !isActive;
    if (isActive) {
      caffeinateProcess = spawn("caffeinate");
      console.log("Started caffeinating...");
    } else {
      terminate(caffeinateProcess.pid, () => {
        console.log("Stopped caffeinating...");
      });
    }
    trayIcon.setImage(isActive ? `${__dirname}/images/CupActiveTemplate.png` : `${__dirname}/images/CupTemplate.png`);
  });

  console.log("App is ready...");
});
