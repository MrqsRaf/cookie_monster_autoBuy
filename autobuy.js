javascript:(function() {
  Game.LoadMod("https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js");

  let scriptRunning = false;
  let stopScript = false;

  let button = document.createElement("button");
  button.innerHTML = "Start Script";
  button.style.position = "absolute";
  button.style.top = "10px";
  button.style.left = "10px";
  button.style.zIndex = 9999;
  button.style.padding = "10px";
  button.style.backgroundColor = "#4CAF50";
  button.style.color = "white";
  button.style.border = "none";
  button.style.cursor = "pointer";

  document.body.appendChild(button);

  function updateButton() {
    if (scriptRunning) {
      button.innerHTML = "Stop Script";
      button.style.backgroundColor = "#f44336";
    } else {
      button.innerHTML = "Start Script";
      button.style.backgroundColor = "#4CAF50";
    }
  }

  function stopBuying() {
    stopScript = true;
    scriptRunning = false;
    updateButton();
    console.log("The script has been stopped.");
  }

  function startBuying() {
    stopScript = false;
    scriptRunning = true;
    updateButton();
    buyBestObjects();
  }

  function buyBestObjects() {
    if (stopScript) {
      return;
    }

    Object.entries(CookieMonsterData).forEach(([key, objects]) => {
      if (objects) {
        Object.entries(objects).forEach(([name, details]) => {
          if (details.colour === "Green") {
            console.log(`Object ${name}, Color: ${details.colour}`);

            if (Game.cookies >= details.price) {
              try {
                Game.Objects[name].buy();
                console.log(`Object ${name} successfully purchased!`);
                setTimeout(buyBestObjects, 500);
                return;
              } catch (error) {
                console.error(`Error purchasing ${name}: ${error}`);
              }
            } else {
              console.log(`Not enough cookies to buy ${name}.`);
              stopBuying();
              return;
            }
          }
        });
      }
    });
  }

  button.addEventListener("click", function() {
    if (scriptRunning) {
      stopBuying();
    } else {
      startBuying();
    }
  });

  updateButton();
})();
