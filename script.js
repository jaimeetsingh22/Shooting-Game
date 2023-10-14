// i am using vanilla javascript which is also called pure javascript to make this game

// importing Sound Effects
const gameOverSound = new Audio("./music/gameOver.mp3");
const heavyWeaponSound = new Audio("./music/awmEdit.mp3");
const hugeWeaponSound = new Audio("./music/lightning.mp3");
const killEnemySound = new Audio("./music/killEnemy.mp3");
const introMusic = new Audio("./music/PubgBGM.mp3");
const shootingSound = new Audio("./music/akmEdit.mp3");

introMusic.play();
introMusic.loop = true;

// basic environment setup
const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
const lightWeaponDamage = 10;
const heavyWeaponDamage = 20;
let playerScore = 0;

let difficulty = 2;

const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
const input = document.querySelector("input[type = 'submit']");
const megaWeaponButton = document.querySelector(".hugeweapon");
const kamehame = document.querySelector("input[type='button']");

megaWeaponButton.style.display = "none";
kamehame.style.display = "none";
// console.log(input);

if (window.innerHeight)
  // starting intro music

  // basic functions
  console.log(innerWidth);

// Event listener for difficulty form
input.addEventListener("click", (e) => {
  e.preventDefault();
  // making for invisible

  // stoping music after starting game
  introMusic.pause();

  form.style.display = "none";

  // making score board visible

  scoreBoard.style.display = "block";

  // making buttons enabled when open in mobile
  if (window.innerWidth < 900) {
    megaWeaponButton.style.display = "block";
    kamehame.style.display = "block";

    // getting difficulty selected by user
    const userValue = document.getElementById("difficulty").value;

    if (userValue === "Easy") {
      setInterval(spawnEnemy, 2000);
      return (difficulty = 2); // ye return actually me hamare different ke value ko update kar de raha h (global variable ko)
    }
    if (userValue === "Medium") {
      setInterval(spawnEnemy, 1500);
      return (difficulty = 4);
    }
    if (userValue === "Hard") {
      setInterval(spawnEnemy, 1000);
      return (difficulty = 7);
    }
    if (userValue === "Insane") {
      setInterval(spawnEnemy, 700);
      return (difficulty = 10);
    }
  } else {
    // getting difficulty selected by user
    const userValue = document.getElementById("difficulty").value;

    if (userValue === "Easy") {
      setInterval(spawnEnemy, 2000);
      return (difficulty = 5); // ye return actually me hamare different ke value ko update kar de raha h (global variable ko)
    }
    if (userValue === "Medium") {
      setInterval(spawnEnemy, 1500);
      return (difficulty = 8);
    }
    if (userValue === "Hard") {
      setInterval(spawnEnemy, 1000);
      return (difficulty = 10);
    }
    if (userValue === "Insane") {
      setInterval(spawnEnemy, 700);
      return (difficulty = 12);
    }
  }
});

//....End Screen...........................

const gameoverLoader = () => {
  // Creating endScreen div and play again button and high score element
  const gameOverBanner = document.createElement("div");
  const gameOverBtn = document.createElement("button");
  const highScore = document.createElement("div");

  highScore.innerHTML = `High Score : ${
    localStorage.getItem("highScore")
      ? localStorage.getItem("highScore")
      : playerScore
  }`;
  const oldHighScore =
    localStorage.getItem("highScore") && localStorage.getItem("highScore");

  if (oldHighScore < playerScore) {
    localStorage.setItem("highScore", playerScore);

    // updating high score html
    highScore.innerHTML = `High Score: ${playerScore}`;
  }
  // adding text to playagain button
  gameOverBtn.innerText = "Play Again";

  gameOverBanner.appendChild(highScore);

  gameOverBanner.appendChild(gameOverBtn);

  // Making reload on clicking playAgain button

  gameOverBtn.onclick = () => {
    window.location.reload();
  };

  gameOverBanner.classList.add("gameover");
  document.body.appendChild(gameOverBanner);
};

//.............  creating player, enemy , weapon ,etc classes ......................///

// setting player position to center
playerPosition = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
//......classess

//..... player class.......

class player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
  }
}

//........ weapon class.............................

class weapon {
  constructor(x, y, radius, color, velocity, damage) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.damage = damage;
  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    (this.x += this.velocity.x), (this.y += this.velocity.y);
    //yaha uper valocity ke under object bana rahe hai jisme x and y key hai and value hum send karenge niche weapons array ke dwara
  }
}

// ..... HugeWeapon class ......................................//

class Hugeweapon {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, 200, canvas.height);
  }

  update() {
    this.draw();
    this.x += 20;
    //yaha uper valocity ke under object bana rahe hai jisme x and y key hai and value hum send karenge niche weapons array ke dwara
  }
}

//....... Enemy class.......///

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    (this.x += this.velocity.x), (this.y += this.velocity.y);
  }
}

///..............................creating particle class ...............................................
const friction = 0.98;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    context.save();
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

//.................................... Main logic .............................................////

//...... player object........
const jai = new player(playerPosition.x, playerPosition.y, 15, "white");

// creating array to store weapons
const weapons = [];

// creating array to store enemys
const enemies = [];

// particle array
const particles = [];

// huge weapon array
const hugeWeapons = [];

//........................... function to spawnEnemy at random location........................//////

const spawnEnemy = () => {
  ///.......generating random color for enemy
  const enemyColor = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;

  ///............generating random size for enemy ..............///////////////
  const enemySize = Math.random() * (40 - 5) + 5; //The output of the expression is a random number between 5 and 40.

  //..........random is enemy spawn position..................
  let random;

  //...... making enemy location Random but only from outside of screen
  if (Math.random() < 0.5) {
    // random number jo generate hota hai wo 0 to 1 ke bich me hota hai to isi pe condition laga diye hai // and ye if condition me enemy ya to left full area se kahi se ayega or right full area kahi se ayega
    ///........... making x equal to very left off of screen or very right off of screen and setting Y to any where vertically
    random = {
      x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
      y: Math.random() * canvas.height,
    };
  } else {
    // ye else condition me enemy ya to upper full area se kahi se ayega or lower full area kahi se ayega  // or

    ///........... making y equal to very up off of screen or very down off of screen and setting x to any where horizontally
    random = {
      x: Math.random() * canvas.width,
      y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
    };
  }

  //finding angle between center (means player position) and enemy position
  const myAngle = Math.atan2(
    // isme jo v enemy ayega wo center me ayega uske liye angle hai
    canvas.height / 2 - random.y,
    canvas.width / 2 - random.x
  );

  // Making velocity or speed of enemy by multiplying chosen difficulty to radian
  const velocity = {
    x: Math.cos(myAngle) * difficulty,
    y: Math.sin(myAngle) * difficulty,
  };

  enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
};

// Define the function to render the animation or

//..............................Creating Animation Function.............................................
let animationId;
function animation() {
  //.. making recursion
  animationId = requestAnimationFrame(animation); // its recursion!

  // Rendering player Score in scoreboard html element
  scoreBoard.innerHTML = `Score : ${playerScore}`;

  //.. clearing canvas on each frame
  context.fillStyle = "rgba(49,49,49,0.2)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // context.clearRect(0, 0, canvas.width, canvas.height);// har ek frame render hone par clear v hota jaa rha hai iss method se ya bol sakte hai ki ek new rect bana raha h. to understand this change the value of x and y.

  //... Drawing player
  jai.draw();

  // Generating Particles
  particles.forEach((particle, ParticleIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(ParticleIndex, 1);
    } else {
      particle.update();
    }
  });

  // Generating huge weapon

  hugeWeapons.forEach((hugeWeapon, hugeWeaponIndex) => {
    if (hugeWeapon.x > canvas.width) {
      hugeWeapons.splice(hugeWeaponIndex, 1);
    } else {
      hugeWeapon.update();
    }
  });
  //   console.log(hugeWeapons);

  // // Update and draw each weapon or
  //  Generating bullets
  weapons.forEach((weapon, weaponIndex) => {
    weapon.update();

    // Removing weapons if they are off screen
    if (
      weapon.x + weapon.radius < 1 ||
      weapon.y + weapon.radius < 1 ||
      weapon.x + weapon.radius > canvas.width ||
      weapon.y + weapon.radius > canvas.height
    ) {
      const dlt = weapons.splice(weaponIndex, 1); // this will help in deleting the array elements after every bullet touches the edge of the canvas
      //    console.log(dlt,"that bullet element is deleted");
    }
  });

  // Generating enemies
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();

    /// finding distance between player and enemy
    const distBetweenPlayerAndEnemy = Math.hypot(
      // iss hypot() method se hypoteneus milega between weopon and enemy
      jai.x - enemy.x,
      jai.y - enemy.y
    );

    // Stoping game if enemy hit player
    if (distBetweenPlayerAndEnemy - jai.radius - enemy.radius < 1) {
      cancelAnimationFrame(animationId);
      gameOverSound.play();
      return gameoverLoader();
      // console.log("GameOver");
    }

    hugeWeapons.forEach((hugeWeapon) => {
      const distBetweenHugeWeaponAndEnemy = hugeWeapon.x - enemy.x;
      // finding distance between hugeWeapon and enemy
      if (
        distBetweenHugeWeaponAndEnemy <= 200 &&
        distBetweenHugeWeaponAndEnemy >= -200
      ) {
        // Increasing player score when killing on enemy
        playerScore += 10;

        // Rendering player Score in scoreboard html element
        scoreBoard.innerHTML = `Score : ${playerScore}`;

        setTimeout(() => {
          killEnemySound.play();
          enemies.splice(enemyIndex, 1);
        }, 0);
      }
    });

    /// finding distance weapon player and enemy
    weapons.forEach((weapon, weaponIndex) => {
      const distBetweenWeaponAndEnemy = Math.hypot(
        // iss hypot() method se hypoteneus milega between weopon and enemy
        weapon.x - enemy.x,
        weapon.y - enemy.y
      );
      // hitting the enemy with a bullet
      if (distBetweenWeaponAndEnemy - weapon.radius - enemy.radius < 1) {
        // console.log('killed enemy');

        // Reducing size of enemy on hit
        if (enemy.radius > weapon.damage + 5) {
          // enemy.radius -= 5;
          gsap.to(enemy, {
            // yaha upper wala hi kaam ho rha h par transition ke sath hoga gsap library ke wajah se. ye basically do argument me ye leta h ki pehla jispe kaam karna hai wo target leta hai and dusra ye kya lagana hai to same kaam kar rahe hai upper wala ki trah
            radius: enemy.radius - weapon.damage,
          });
          setTimeout(() => {
            weapons.splice(weaponIndex, 1);
          }, 0);
        }
        // Removing enemy on hit if they are below 18
        else {
          for (let i = 0; i < enemy.radius * 5; i++) {
            particles.push(
              new Particle(weapon.x, weapon.y, Math.random() * 2, enemy.color, {
                x: (Math.random() - 0.5) * (Math.random() * 5),
                y: (Math.random() - 0.5) * (Math.random() * 5),
              })
            );
          }
          // Increasing player score when killing one enemy
          playerScore += 10;
          if (playerScore >= 20) {
            megaWeaponButton.classList.add("avail");
          }
          if (playerScore > 10) {
            kamehame.classList.add("popup");
          }

          // Rendering player Score in scoreboard html element
          scoreBoard.innerHTML = `Score : ${playerScore}`;

          setTimeout(() => {
            killEnemySound.play();
            enemies.splice(enemyIndex, 1);
            weapons.splice(weaponIndex, 1);
          }, 0);
        }
      }
    });
  });
}
// console.log(gsap);
//............................ Adding Event Listeners ....................................................

// ligt weapon function ///
const lightWeaponfunc = (e) => {
  // console.log(e.clientX,e.clientY);// clientX afnd clientY ki madad se hum mouse ke pointer ko access kar rhe h
  shootingSound.play();
  // finding angle between player position(center) and click co-ordinates
  const myAngle = Math.atan2(
    // ye 'atan2' method x and y ka value dene par angles deta hai radians me
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  ); // hum basically angle nikal rahe hai taki jab center se jab bullets project kare to usme hum point kar sake basically ye kaam hum trigonometry ke madad se kar rhe hai see screenshot to understand

  /// Making const or constant speed for light weapon
  const velocity = {
    x: Math.cos(myAngle) * 6, // yaha multiply by 5 isliye kiya hai taki thoda speed se bullet nikle
    y: Math.sin(myAngle) * 6,
  };

  // adding light weapon in weapons array
  weapons.push(
    new weapon(
      canvas.width / 2,
      canvas.height / 2,
      6,
      "white",
      velocity, // it increases the position of x and y infinite time due to recursion in the above animation function
      lightWeaponDamage
    )
  );
  //   console.log(weapons);

  // removing animation on button
  if (playerScore < 20) {
    megaWeaponButton.classList.remove("avail");
  }
};

///......... event listener for light weapon aka left click

canvas.addEventListener("click", lightWeaponfunc);

// heavy Weapon function.......
const heavyWeaponfunc = (e) => {
  // Decreasing player score for using heavy weapon
  if (playerScore <= 0) {
    return; // ye function ko break or stop kar deta hai
  }
  playerScore -= 2;
  scoreBoard.innerHTML = `Score : ${playerScore}`;

  heavyWeaponSound.play();
  e.preventDefault();
  // console.log(e.clientX,e.clientY);// clientX afnd clientY ki madad se hum mouse ke pointer ko access kar rhe h

  // finding angle between player position(center) and click co-ordinates
  const myAngle = Math.atan2(
    // ye 'atan2' method x and y ka value dene par angles deta hai radians me
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  ); // hum basically angle nikal rahe hai taki jab center se jab bullets project kare to usme hum point kar sake basically ye kaam hum trigonometry ke madad se kar rhe hai see screenshot to understand

  /// Making const or constant speed for light weapon
  const velocity = {
    x: Math.cos(myAngle) * 3, // yaha multiply by 5 isliye kiya hai taki thoda speed se bullet nikle
    y: Math.sin(myAngle) * 3,
  };

  // adding light weapon in weapons array
  weapons.push(
    new weapon(
      canvas.width / 2,
      canvas.height / 2,
      30,
      "cyan",
      velocity, // it increases the position of x and y infinite time due to recursion in the above animation function
      heavyWeaponDamage
    )
  );
  //   console.log(weapons);
  // removing animation
  if (playerScore < 20) {
    megaWeaponButton.classList.remove("avail");
  }
};

///......... event listener for Heavy weapon aka righ click
canvas.addEventListener("contextmenu", heavyWeaponfunc);

// it is for whole window
addEventListener("keypress", (e) => {
  if (e.key === " ") {
    // console.log("spaceBar pressed");

    // Decreasing player score for using huge weapon

    if (playerScore < 20) {
      return; // ye function ko break or stop kar deta hai
    }
    playerScore -= 20;

    hugeWeaponSound.play();
    // Rendering the score
    scoreBoard.innerHTML = `Score : ${playerScore}`;

    hugeWeapons.push(new Hugeweapon(0, 0, "rgba(47,255,0,1"));
  }
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

//reloding the window is resized
addEventListener("resize", () => {
  window.location.reload();
});

// starts the animation loop
animation();

// making mega weapon button event

megaWeaponButton.addEventListener("click", (e) => {
  // console.log("spaceBar pressed");
  e.preventDefault();
  if (playerScore < 30) {
    megaWeaponButton.classList.remove("avail");
  }
  if (playerScore < 20) {
    return; // ye function ko break or stop kar deta hai
  }
  // Decreasing player score for using huge weapon
  playerScore -= 20;
  hugeWeaponSound.play();

  // e.preventDefault();
  // Rendering the score
  scoreBoard.innerHTML = `Score : ${playerScore}`;

  hugeWeapons.push(new Hugeweapon(0, 0, "rgba(47,255,0,1"));
});

// console.log(kamehame);

// kamehame button event

kamehame.addEventListener("click", () => {
  if (playerScore < 2) {
    return;
  }

  if (playerScore < 3) {
    kamehame.classList.remove("popup");
  }

  console.log(kamehame.classList);
  if (kamehame.value === "Kamehame Mode Off") {
    kamehame.value = "Kamehame Mode On";
    kamehame.classList.add("on");

    canvas.removeEventListener("click", lightWeaponfunc);
    canvas.addEventListener("click", heavyWeaponfunc);
  } else {
    kamehame.value = "Kamehame Mode Off";
    kamehame.classList.remove("on");
    kamehame.classList.remove("popup");
    canvas.addEventListener("click", lightWeaponfunc);
    canvas.removeEventListener("click", heavyWeaponfunc);
  }
});

canvas.addEventListener("click", (e) => {
  e.preventDefault();
});

document.body.addEventListener("click", (e) => {
  e.preventDefault();
});
