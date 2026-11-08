const rock = document.getElementById("rock");
const upgradeInfo = document.getElementById("upgradeInfo");
const chargeBar = document.getElementById("chargeBar");
const charDiv = document.getElementById("charDiv");
const tutorial = document.getElementById("tutorial");
const overlay = document.getElementById("overlay");
const rocknum = document.getElementById("rockNum");

const currency1 = document.getElementById("currency1");
const currency2 = document.getElementById("currency2");
const currency3 = document.getElementById("currency3");
const currency4 = document.getElementById("currency4");
const currency5 = document.getElementById("currency5");
const currency6 = document.getElementById("currency6");
const currency7 = document.getElementById("currency7");

const reset2div = document.getElementById("reset2div");
const reset3div = document.getElementById("reset3div");
const reset4div = document.getElementById("reset4div");
const reset5div = document.getElementById("reset5div");

const stat1 = document.getElementById("stat1");
const stat2 = document.getElementById("stat2");
const stat3 = document.getElementById("stat3");
const stat4 = document.getElementById("stat4");
const stat5 = document.getElementById("stat5");
const stat6 = document.getElementById("stat6");


let rocks = 0;
let rocksMade = 0;
let rockValue = 1;

let stones = 0;
let stoneValue = 1;
let stoneChance = 1;

let energyStones = 0;

let autocollectAmount = 0;

let bricks = 0;
let bricksValue = 0;

let charge = 0;
let chargeAmount = 1;
let boost = false;
let boostAmount = 2;
let boostDuration = 5000;

let bricksUnlock = false;
let build = false;

let copper = 0;
let copperValue = 0;

let silver = 0;
let silverValue = 0;

let gold = 0;
let goldValue = 0;

// functions for opening and closing tutorial


function openTutorial() {
    tutorial.style.visibility= 'visible';
    overlay.style.visibility= 'visible';
}

function closeTutorial() {
    tutorial.style.visibility= 'hidden';
    overlay.style.visibility= 'hidden';

}

// function for displaying large numbers better

function abbreviate(num) {
    if(num < 1000) {
        return num.toFixed(0);
    } else if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + "K";
    } else if(num >= 1000000 && num < 1000000000) {
        return (num / 1000000).toFixed(1) +"M"
    } else {
        return num.toPrecision(2);
    }
}


// value updates

function updateRockValue() {
    rockValue = 1 * buildM * rockValueM1 * rockValueM2 * rockValueM3;
    stat1.innerHTML = "rock value: " + abbreviate(rockValue);
}

function updateStoneValue() {
    stoneValue = 1 * stoneValueM1 * stoneValueM2;
    stat3.innerHTML = "stone value: " + abbreviate(stoneValue);
}


// function for clicking the rock

rock.addEventListener("click", getRocks);

function getRocks() {
    if(stoneChance >= Math.floor(Math.random() * 100) + 1) {
         stones = stones + stoneValue;
         currency2.innerHTML = "stones: " + abbreviate(stones);
    }
    if(boost === false) {
        charge = charge + chargeAmount;
        chargeBar.style.width = charge + "%";
        rocks = rocks + rockValue;
        if(charge >= 100) {
            activateBoost();
        }
    } else if(boost === true) {
        rocks = rocks + rockValue * boostAmount;
    }
    
    rocksMade = rocksMade + rockValue;
    currency1.innerHTML = "rocks: " + abbreviate(rocks);
    updateBricks();
    updateCopper();
    updateSilver();
    updateGold();
}


// autocollect

function autoCollect() {
    if(autocollectAmount > 0) {
        rocks = rocks + rockValue * autocollectAmount;
        rocksMade = rocksMade + rockValue * autocollectAmount;
        currency1.innerHTML = "rocks: " + abbreviate(rocks);
        if(stoneChance > 0) {
            for(let i = 0; i < autocollectAmount; i++) {
                if(stoneChance >= Math.floor(Math.random() * 100) + 1) {
                    stones = stones + stoneValue;
                    currency2.innerHTML = "stones: " + abbreviate(stones);
                }
            }
        }
    }
    updateBricks()
}

setInterval(autoCollect, 1000);


// charge mechanic

function activateBoost() {
    charge = 0;
    boost = true;
    chargeBar.style.transition = "width " + boostDuration / 1000 + "s";
    chargeBar.style.width = charge + "%";
    setTimeout(disableBoost, boostDuration);
    energyStones = energyStones + 1 * buildM;
    currency3.innerHTML = "energy stones: " + energyStones;
}

function disableBoost() {
    boost = false;
    chargeBar.style.transition = "width 0.1s";
    chargeBar.style.width = charge + "%";
}

// functions for clicking reset buttons here

// bricks update

const bricksButton = document.getElementById("bricksButton");

bricksButton.addEventListener("click", bricksReset);

function updateBricks() {
    if(rocksMade >= 10000) {
        bricksUnlock = true;
    }
    bricksValue = (Math.floor(rocks / 100) + Math.floor(stones / 10)) * brickValueM1;
    if(bricksUnlock === true) {
        bricksButton.innerHTML = abbreviate(bricksValue) + " bricks";
    }
}

// bricks reset

function bricksReset() {
    if(rocksMade >= 10000) {
        bricks = bricks + bricksValue;
        rockValue = 1;
        updateBuildButton();
        resetRocks();
        resetStones();
        updateBricks();
        currency4.innerHTML = "bricks: " + abbreviate(bricks);

        upgrade9.classList.remove("hide");
        upgrade10.classList.remove("hide");
        upgrade11.classList.remove("hide");
        reset2div.classList.remove("hide");
    }
}

// build reset

const buildButton = document.getElementById("buildButton");

buildButton.addEventListener("click", buildReset)

let buildM = 1;

function updateBuildButton() {
    if(bricks >= 10000) {
        buildButton.innerHTML = "Build";
    }
}

function buildReset() {
    if(bricks >= 10000 & build === false) {
        build = true;
        buildM = 2;
        resetRocks();
        resetStones();
        resetBricks();
        buildButton.innerHTML = "Built"
        reset3div.classList.remove("hide");
        reset4div.classList.remove("hide");
        reset5div.classList.remove("hide");
    }
}

// copper reset

const copperButton = document.getElementById("copperButton");

copperButton.addEventListener("click", copperReset);

function updateCopper() {
    copperValue = Math.floor(rocks / 1000) + Math.floor(stones / 100);
    copperButton.innerHTML = abbreviate(copperValue) + " copper";
}

function copperReset() {
    copper = copper + copperValue;
    currency5.innerHTML = "copper: " + abbreviate(copper);
    resetRocks();
    resetStones();
    resetBricks();
    updateCopper();
}

// silver reset

const silverButton = document.getElementById("silverButton");

silverButton.addEventListener("click", silverReset);

function updateSilver() {
    silverValue = Math.floor(rocks / 10000) + Math.floor(stones / 1000);
    silverButton.innerHTML = abbreviate(silverValue) + " silver";
}

function silverReset() {
    silver = silver + silverValue;
    currency6.innerHTML = "silver: " + abbreviate(silver);
    resetRocks();
    resetStones();
    resetBricks();
    updateSilver();
}

// gold reset

const goldButton = document.getElementById("goldButton");

goldButton.addEventListener("click", goldReset);

function updateGold() {
    goldValue = Math.floor(rocks / 100000) + Math.floor(stones / 10000);
    goldButton.innerHTML = abbreviate(goldValue) + " gold";
}

function goldReset() {
    gold = gold + goldValue;
    currency7.innerHTML = "gold: " + abbreviate(gold);
    resetRocks();
    resetStones();
    resetBricks();
    updateGold();
}

// individual currency resets

function resetRocks() {
    rocks = 0;
    rocksMade = 0;
    currency1.innerHTML = "rocks: " + rocks;

    upgrade1price = 10
    up1count = 0;
    rockValueM1 = 1;
    priceTag1.innerHTML = abbreviate(upgrade1price) + " rocks";
    up1counter.innerHTML = up1count;

    upgrade2price = 100
    up2count = 0;
    stoneChance = 1;
    priceTag2.innerHTML = abbreviate(upgrade2price) + " rocks";
    stat2.innerHTML = "stone chance: " + stoneChance + "%";
    up2counter.innerHTML = up2count;

    upgrade3price = 50;
    up3count = 0;
    stoneValueM1 = 1;
    priceTag3.innerHTML = abbreviate(upgrade3price) + " rocks";
    up3counter.innerHTML = up3count;

    updateRockValue();
    updateStoneValue();
}

function resetStones() {
    stones = 0;
    currency2.innerHTML = "stones: " + stones;

    upgrade4price = 2;
    up4count = 0;
    autocollectAmount = 0;
    priceTag4.innerHTML = abbreviate(upgrade4price) + " stones";
    stat4.innerHTML = "autocollect amount: " + autocollectAmount;
    up4counter.innerHTML = up4count;

    upgrade5price = 5;
    up5count = 0;
    rockValueM2 = 1;
    priceTag5.innerHTML = abbreviate(upgrade5price) + " stones";
    up5counter.innerHTML = up5count;

    upgrade6price = 20;
    up5count = 0;
    brickValueM1 = 1;
    priceTag6.innerHTML = abbreviate(upgrade6price) + " stones";
    up6counter.innerHTML = up6count;

    updateRockValue();
    updateBricks();
}
// remember to add later brick upgrades here
function resetBricks() {
    bricks = 0;
    currency4.innerHTML = "bricks: " + bricks;

    upgrade9price = 50;
    up9count = 0;
    rockValueM3 = 1;
    priceTag9.innerHTML = abbreviate(upgrade9price) + " bricks";
    up9counter.innerHTML = up9count;

    upgrade10price = 100;
    up5count = 0;
    stoneValueM2 = 1;
    priceTag10.innerHTML = abbreviate(upgrade10price) + " bricks";
    up9counter.innerHTML = up9count;

    updateRockValue();
    updateBricks();
}


// upgrade naming: up(stat)(currency for upgrade);
// early upgrades do not follow this rule

// upgrade 1 rock value x1.2

const upgrade1 = document.getElementById("upgrade1");
const priceTag1 = document.getElementById("priceTag1");
const up1counter = document.getElementById("up1counter");

upgrade1.addEventListener("click", upRockValue);

let upgrade1price = 10;
let up1count = 0;
let rockValueM1 = 1;

function upRockValue() {
    if(rocks >= upgrade1price) {
        rockValueM1 = rockValueM1 * 1.2;
        rocks = rocks - upgrade1price;
        upgrade1price = upgrade1price * 1.6;
        up1count++;
        updateRockValue();
        priceTag1.innerHTML = abbreviate(upgrade1price) + " rocks";
        currency1.innerHTML = "rocks: " + abbreviate(rocks);
        up1counter.innerHTML = up1count;
    }
}

// upgrade 2 stone chance + 1%

const upgrade2 = document.getElementById("upgrade2");
const priceTag2 = document.getElementById("priceTag2");
const up2counter = document.getElementById("up2counter");

upgrade2.addEventListener("click", upStoneChance);

let upgrade2price = 100;
let up2count = 0;

function upStoneChance() {
    if(up2count < 19) {
        if(rocks >= upgrade2price) {
            stoneChance++;
            rocks = rocks - upgrade2price;
            upgrade2price = upgrade2price * 3;
            up2count++;
            priceTag2.innerHTML = abbreviate(upgrade2price) + " rocks";
            currency1.innerHTML = "rocks: " + abbreviate(rocks);
            stat2.innerHTML = "stone chance: " + stoneChance + "%";
            up2counter.innerHTML = up2count;
            if(up2count === 19) {
                priceTag2.innerHTML = "MAX";
            }
        }
    }
    
}

// upgrade 3 stone value x1.5

const upgrade3 = document.getElementById("upgrade3");
const priceTag3 = document.getElementById("priceTag3");
const up3counter = document.getElementById("up3counter");

upgrade3.addEventListener("click", upStoneValue);

let upgrade3price = 50;
let up3count = 0;
let stoneValueM1 = 1;

function upStoneValue() {
    if(rocks >= upgrade3price) {
        stoneValueM1 = stoneValueM1 * 1.5;
        rocks = rocks - upgrade3price;
        upgrade3price = upgrade3price * 1.85;
        up3count++;
        updateStoneValue();
        priceTag3.innerHTML = abbreviate(upgrade3price) + " rocks";
        currency1.innerHTML = "rocks: " + abbreviate(rocks);
        up3counter.innerHTML = up3count;
    }
}

// upgrade 4 autocollect amount +1

const upgrade4 = document.getElementById("upgrade4");
const priceTag4 = document.getElementById("priceTag4");
const up4counter = document.getElementById("up4counter");

upgrade4.addEventListener("click", upAutocollectAmount);

let upgrade4price = 2;
let up4count = 0;

function upAutocollectAmount() {
    if(up4count < 10) {
            if(stones >= upgrade4price) {
            autocollectAmount++;
            stones = stones - upgrade4price;
            if(up4count < 1) {
                upgrade4price = 10;
            } else {
                upgrade4price = upgrade4price * 10;
            }
            up4count++;
            priceTag4.innerHTML = abbreviate(upgrade4price) + " stones";
            currency2.innerHTML = "stones: " + abbreviate(stones);
            stat4.innerHTML = "autocollect amount: " + autocollectAmount;
            up4counter.innerHTML = up4count;
            if(up4count === 10) {
                priceTag4.innerHTML = "MAX";
            }
        }
    }
}

// upgrade 5 rock value x1.5

const upgrade5 = document.getElementById("upgrade5");
const priceTag5 = document.getElementById("priceTag5");
const up5counter = document.getElementById("up5counter");

upgrade5.addEventListener("click", upRockValueStone);

let upgrade5price = 5;
let up5count = 0;
let rockValueM2 = 1;

function upRockValueStone() {
    if(stones >= upgrade5price) {
        rockValueM2 = rockValueM2 * 1.5;
        stones = stones - upgrade5price;
        upgrade5price = upgrade5price * 2.2;
        up5count++;
        updateRockValue();
        priceTag5.innerHTML = abbreviate(upgrade5price) + " stones";
        currency2.innerHTML = "stones: " + abbreviate(stones);
        up5counter.innerHTML = up5count;
    }
}

// upgrade 6 bricks x1.5

const upgrade6 = document.getElementById("upgrade6");
const priceTag6 = document.getElementById("priceTag6");
const up6counter = document.getElementById("up6counter");

upgrade6.addEventListener("click", upBricks);

let upgrade6price = 20;
let up6count = 0;
let brickValueM1 = 1;

function upBricks() {
    if(stones >= upgrade6price) {
        brickValueM1 = brickValueM1 * 1.5;
        stones = stones - upgrade6price;
        upgrade6price = upgrade6price * 2.5;
        up6count++;
        updateBricks();
        priceTag6.innerHTML = abbreviate(upgrade6price) + " stones";
        currency2.innerHTML = "stones: " + abbreviate(stones);
        up6counter.innerHTML = up6count;
    }
}

// upgrade 7 boost duration +0.1s 

const upgrade7 = document.getElementById("upgrade7");
const up7counter = document.getElementById("up7counter");

upgrade7.addEventListener("click", upBoostDuration);

let up7count = 0;

function upBoostDuration() {
    if(energyStones >= 1) {
        boostDuration = boostDuration + 100;
        energyStones = energyStones - 1;
        up7count++;
        currency3.innerHTML = "energy stones: " + energyStones;
        up7counter.innerHTML = up7count;
        stat5.innerHTML = "boost duration: " + boostDuration / 1000 + "s";
    }
}

// upgrade 8 boost buff + x0.1

const upgrade8 = document.getElementById("upgrade8");
const up8counter = document.getElementById("up8counter");

upgrade8.addEventListener("click", upBoostBuff);

let up8count = 0;

function upBoostBuff() {
    if(energyStones >= 2) {
        boostAmount = boostAmount + 0.1;
        energyStones = energyStones - 2;
        up8count++;
        currency3.innerHTML = "energy stones: " + energyStones;
        up8counter.innerHTML = up8count;
        stat6.innerHTML = "boost buff: " + boostAmount.toFixed(1) + "x";
    }
}

// upgrade 9 rocks 1.5x

const upgrade9 = document.getElementById("upgrade9");
const priceTag9 = document.getElementById("priceTag9");
const up9counter = document.getElementById("up9counter");

upgrade9.addEventListener("click", upRockValueBrick);

let upgrade9price = 50;
let up9count = 0;
let rockValueM3 = 1;

function upRockValueBrick() {
    if(bricks >= upgrade9price) {
        rockValueM3 = rockValueM3 + 0.5;
        bricks = bricks - upgrade9price;
        upgrade9price = upgrade9price * 2.5;
        up9count++;
        updateRockValue();
        currency4.innerHTML = "bricks: " + abbreviate(bricks);
        up9counter.innerHTML = up9count;
    }
}

// upgrade 10 stones 1.5x

const upgrade10 = document.getElementById("upgrade10");
const priceTag10 = document.getElementById("priceTag10");
const up10counter = document.getElementById("up10counter");

upgrade10.addEventListener("click", upStoneValueBrick);

let upgrade10price = 100;
let up10count = 0;
let stoneValueM2 = 1;

function upStoneValueBrick() {
    if(bricks >= upgrade10price) {
        stoneValueM2 = stoneValueM2 + 0.5;
        bricks = bricks - upgrade10price;
        upgrade10price = upgrade10price * 2.5;
        up10count++;
        updateStoneValue();
        currency4.innerHTML = "bricks: " + abbreviate(bricks);
        up10counter.innerHTML = up10count;
    }
}

// upgrade 11 copper 1.2x

const upgrade11 = document.getElementById("upgrade11");
const priceTag11 = document.getElementById("priceTag11");
const up11counter = document.getElementById("up11counter");

upgrade11.addEventListener("click", upCopperValueBrick);

let upgrade11price = 500;
let up11count = 0;
let copperValueM1 = 1;

function upCopperValueBrick() {
    if(bricks >= upgrade11price) {
        copperValueM1 = copperValueM1 + 0.2;
        bricks = bricks - upgrade11price;
        upgrade11price = upgrade11price * 1.5;
        up11count++
        updateCopper();
        currency4.innerHTML = "bricks: " + abbreviate(bricks);
        up11counter.innerHTML = up10count;
    }
}

// copper upgrades:

// upgrade 12 silver 1.2x

// upgrade 13 gold 1.2x

// upgrade 14 rocks 1.2x

// upgrade 15 stones 1.2x

// upgrade 16 bricks 1.2x

// silver upgrades:

// upgrade 17 rocks x2

// upgrade 18 stones x2

// upgrade 19 boost progress x2 max 1

// gold upgrades:

// upgrade 20 keep autocollect

// upgrade 21 rock autobuy

// upgrade 22 stone autobuy

// upgrade 23 brick autobuy

// upgrade 24 brick generation

// upgrade 25 all metals generation (super expensive)


// hide locked upgrades and resets
function hideUpgrades() {
    upgrade9.classList.add("hide");
    upgrade10.classList.add("hide");
    upgrade11.classList.add("hide");
    reset2div.classList.add("hide");
    reset3div.classList.add("hide");
    reset4div.classList.add("hide");
    reset5div.classList.add("hide");
}

hideUpgrades();