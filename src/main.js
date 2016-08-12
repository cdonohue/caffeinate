const { app, Menu, Tray } = require("electron");
const { exec, spawn } = require("child_process");

let trayIcon,
    caffeinateProcess;

const spawnCaffeinateProcess = () => {
  caffeinateProcess = spawn("caffeinate", ["-dims"]);
};

const killExistingCaffeinateProcess = () => {
  if (caffeinateProcess) {
    caffeinateProcess.kill();
  }
}

const getCurrentIcon = (isCaffeinating) => {
  return `${__dirname}/images/Cup${isCaffeinating ? "Active" : ""}Template.png`;
}

const appReady = () => {
  app.dock.hide();
  let isCaffeinating = false;

  trayIcon = new Tray(`${__dirname}/images/CupTemplate.png`);

  const contextMenu = Menu.buildFromTemplate([{
    label: "Quit",
    click: () => {
      killExistingCaffeinateProcess();
      trayIcon.destroy();
      app.quit();
    },
  }]);

  trayIcon.on("click", () => {
    isCaffeinating = !isCaffeinating;

    isCaffeinating ? spawnCaffeinateProcess()
                   : killExistingCaffeinateProcess();

    trayIcon.setImage(getCurrentIcon(isCaffeinating));
  });

  trayIcon.on("right-click", () => {
    trayIcon.popUpContextMenu(contextMenu);
  });
}

app.on("ready", appReady);
