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

const c1li = document.getElementById("c1li");
const c2li = document.getElementById("c2li");
const c3li = document.getElementById("c3li");
const c4li = document.getElementById("c4li");

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
    } else if(num >= 1000000000 && num < 1000000000000) {
        return (num / 1000000000).toFixed(1) +"B"
    } else {
        return num.toPrecision(2);
    }
}


// value updates

function updateRockValue() {
    rockValue = 1 * buildM * rockValueM1 * rockValueM2 * rockValueM3 * rockValueM4;
    stat1.innerHTML = "rock value: " + abbreviate(rockValue);
}

function updateStoneValue() {
    stoneValue = 1 * stoneValueM1 * stoneValueM2 * stoneValueM3;
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
    bricksValue = (Math.floor(rocks / 100) + Math.floor(stones / 10)) * brickValueM1 * brickValueM2;
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
        c1li.style.display = 'flex';
    }
}

// build reset

const buildButton = document.getElementById("buildButton");

buildButton.addEventListener("click", buildReset)

let buildM = 1;

function updateBuildButton() {
    if(bricks >= 100000) {
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
        c2li.style.display = 'flex';
        c3li.style.display = 'flex';
        c4li.style.display = 'flex';
        upgrade12.classList.remove("hide");
        upgrade13.classList.remove("hide");
        upgrade14.classList.remove("hide");
        upgrade15.classList.remove("hide");
        upgrade16.classList.remove("hide");
        upgrade17.classList.remove("hide");
        upgrade18.classList.remove("hide");
        upgrade19.classList.remove("hide");
        upgrade20.classList.remove("hide");
        upgrade21.classList.remove("hide");
        upgrade22.classList.remove("hide");
        upgrade23.classList.remove("hide");
        upgrade24.classList.remove("hide");
        upgrade25.classList.remove("hide");
    }
}

// copper reset

const copperButton = document.getElementById("copperButton");

copperButton.addEventListener("click", copperReset);

function updateCopper() {
    copperValue = Math.floor(rocks / 1000) + Math.floor(stones / 100) * copperValueM1;
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
    silverValue = Math.floor(rocks / 10000) + Math.floor(stones / 1000) * silverValueM1;
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
    goldValue = Math.floor(rocks / 100000) + Math.floor(stones / 10000) * goldValueM1;
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

    if(keepAutoCollect === false) {
        upgrade4price = 2;
        up4count = 0;
        autocollectAmount = 0;
        priceTag4.innerHTML = abbreviate(upgrade4price) + " stones";
        stat4.innerHTML = "autocollect amount: " + autocollectAmount;
        up4counter.innerHTML = up4count;
    }
    
    upgrade5price = 5;
    up5count = 0;
    rockValueM2 = 1;
    priceTag5.innerHTML = abbreviate(upgrade5price) + " stones";
    up5counter.innerHTML = up5count;

    upgrade6price = 20;
    up6count = 0;
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
    up10count = 0;
    stoneValueM2 = 1;
    priceTag10.innerHTML = abbreviate(upgrade10price) + " bricks";
    up10counter.innerHTML = up10count;

    upgrade11price = 500;
    up11count = 0;
    copperValueM1 = 1;
    priceTag11.innerHTML = abbreviate(upgrade11price) + " bricks";
    up11counter.innerHTML = up11count;

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
        priceTag9.innerHTML = abbreviate(upgrade9price) + " bricks";
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
        priceTag10.innerHTML = abbreviate(upgrade10price) + " bricks";
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
        priceTag11.innerHTML = abbreviate(upgrade11price) + " bricks";
        currency4.innerHTML = "bricks: " + abbreviate(bricks);
        up11counter.innerHTML = up11count;
    }
}

// copper upgrades:

// upgrade 12 rocks 1.2x

const upgrade12 = document.getElementById("upgrade12");
const priceTag12 = document.getElementById("priceTag12");
const up12counter = document.getElementById("up12counter");

upgrade12.addEventListener("click", upRockValueCopper);

let upgrade12price = 10;
let up12count = 0;
let rockValueM4 = 1;

function upRockValueCopper() {
    if(copper >= upgrade12price) {
        rockValueM4 = rockValueM4 + 0.2;
        copper = copper - upgrade12price;
        upgrade12price = upgrade12price * 1.5;
        up12count++;
        updateRockValue();
        priceTag12.innerHTML = abbreviate(upgrade12price) + " copper";
        currency5.innerHTML = "copper: " + abbreviate(copper);
        up12counter.innerHTML = up12count;
    }
}

// upgrade 13 stones 1.2x

const upgrade13 = document.getElementById("upgrade13");
const priceTag13 = document.getElementById("priceTag13");
const up13counter = document.getElementById("up13counter");

upgrade13.addEventListener("click", upStoneValueCopper);

let upgrade13price = 20;
let up13count = 0;
let stoneValueM3 = 1;

function upStoneValueCopper() {
    if(copper >= upgrade13price) {
        stoneValueM3 = stoneValueM3 + 0.2;
        copper = copper - upgrade13price;
        upgrade13price = upgrade13price * 1.5;
        up13count++;
        updateStoneValue();
        priceTag13.innerHTML = abbreviate(upgrade13price) + " copper";
        currency5.innerHTML = "copper: " + abbreviate(copper);
        up13counter.innerHTML = up13count;
    }
}

// upgrade 14 bricks 1.2x

const upgrade14 = document.getElementById("upgrade14");
const priceTag14 = document.getElementById("priceTag14");
const up14counter = document.getElementById("up14counter");

upgrade14.addEventListener("click", upBrickValueCopper);

let upgrade14price = 50;
let up14count = 0;
let brickValueM2 = 1;

function upBrickValueCopper() {
    if(copper >= upgrade14price) {
        brickValueM2 = brickValueM2 + 0.2;
        copper = copper - upgrade14price;
        upgrade14price = upgrade14price * 1.5;
        up14count++;
        updateBricks();
        priceTag14.innerHTML = abbreviate(upgrade14price) + " copper";
        currency5.innerHTML = "copper: " + abbreviate(copper);
        up14counter.innerHTML = up14count;
    }
}

// upgrade 15 silver 1.2x

const upgrade15 = document.getElementById("upgrade15");
const priceTag15 = document.getElementById("priceTag15");
const up15counter = document.getElementById("up15counter");

upgrade15.addEventListener("click", upSilverValueCopper);

let upgrade15price = 100;
let up15count = 0;
let silverValueM1 = 1;

function upSilverValueCopper() {
    if(copper >= upgrade15price) {
        silverValueM1 = silverValueM1 + 0.2;
        copper = copper - upgrade15price;
        upgrade15price = upgrade15price * 1.5;
        up15count++;
        updateSilver();
        priceTag15.innerHTML = abbreviate(upgrade15price) + " copper";
        currency5.innerHTML = "copper: " + abbreviate(copper);
        up15counter.innerHTML = up15count;
    }
}

// upgrade 16 gold 1.2x

const upgrade16 = document.getElementById("upgrade16");
const priceTag16 = document.getElementById("priceTag16");
const up16counter = document.getElementById("up16counter");

upgrade16.addEventListener("click", upGoldValueCopper);

let upgrade16price = 200;
let up16count = 0;
let goldValueM1 = 1;

function upGoldValueCopper() {
    if(copper >= upgrade16price) {
        goldValueM1 = goldValueM1 + 0.2;
        copper = copper - upgrade16price;
        upgrade16price = upgrade16price * 1.5;
        up16count++;
        updateGold();
        priceTag16.innerHTML = abbreviate(upgrade16price) + " copper";
        currency5.innerHTML = "copper: " + abbreviate(copper);
        up16counter.innerHTML = up16count;
    }
}

// silver upgrades:

// upgrade 17 rocks x2

const upgrade17 = document.getElementById("upgrade17");
const priceTag17 = document.getElementById("priceTag17");
const up17counter = document.getElementById("up17counter");

upgrade17.addEventListener("click", upRockValueSilver);

let upgrade17price = 10;
let up17count = 0;
let rockValueM5 = 1;

function upRockValueSilver() {
    if(silver >= upgrade17price) {
        rockValueM5 = rockValueM5 + 1;
        silver = silver - upgrade17price;
        upgrade17price = upgrade17price * 1.5;
        up17count++;
        updateRockValue();
        priceTag17.innerHTML = abbreviate(upgrade17price) + " silver";
        currency6.innerHTML = "silver: " + abbreviate(silver);
        up17counter.innerHTML = up17count;
    }
}

// upgrade 18 stones x2

const upgrade18 = document.getElementById("upgrade18");
const priceTag18 = document.getElementById("priceTag18");
const up18counter = document.getElementById("up18counter");

upgrade18.addEventListener("click", upStoneValueSilver);

let upgrade18price = 50;
let up18count = 0;
let stoneValueM4 = 1;

function upStoneValueSilver() {
    if(silver >= upgrade18price) {
        stoneValueM4 = stoneValueM4 + 1;
        silver = silver - upgrade18price;
        upgrade18price = upgrade18price * 1.5;
        up18count++;
        updateStoneValue();
        priceTag18.innerHTML = abbreviate(upgrade18price) + " silver";
        currency6.innerHTML = "silver: " + abbreviate(silver);
        up18counter.innerHTML = up18count;
    }
}

// upgrade 19 charge x2 max 1

const upgrade19 = document.getElementById("upgrade19");
const priceTag19 = document.getElementById("priceTag19");
const up19counter = document.getElementById("up19counter");

upgrade19.addEventListener("click", upChargeSilver);

let upgrade19price = 100;
let up19count = 0;

function upChargeSilver() {
    if(up19count < 1) {
        if(silver >= upgrade19price) {
            chargeAmount++;
            silver = silver - upgrade19price;
            up19count++;
            priceTag17.innerHTML = "MAX";
            currency6.innerHTML = "silver: " + abbreviate(silver);
            up19counter.innerHTML = up19count;
        }
    }
}

// gold upgrades:

// upgrade 20 keep autocollect

const upgrade20 = document.getElementById("upgrade20");
const priceTag20 = document.getElementById("priceTag20");
const up20counter = document.getElementById("up20counter");

upgrade20.addEventListener("click", upKeepAutoCollect);

let upgrade20price = 1;
let up20count = 0;
let keepAutoCollect = false;

function upKeepAutoCollect() {
    if(up20count < 1) {
        if(gold >= upgrade20price) {
            keepAutoCollect = true;
            gold = gold - upgrade20price;
            up20count++;
            priceTag20.innerHTML = "MAX";
            currency7.innerHTML = "gold: " + abbreviate(gold);
            up20counter.innerHTML = up20count;
        }
    }
}

// upgrade 21 rock autobuy

const upgrade21 = document.getElementById("upgrade21");
const priceTag21 = document.getElementById("priceTag21");
const up21counter = document.getElementById("up21counter");

upgrade21.addEventListener("click", upRockAutobuy);

let upgrade21price = 2;
let up21count = 0;
let rockAutobuy = false;

function upRockAutobuy() {
    if(up21count < 1) {
        if(gold >= upgrade21price) {
            rockAutobuy = true;
            gold = gold - upgrade21price;
            up21count++;
            priceTag21.innerHTML = "MAX";
            currency7.innerHTML = "gold: " + abbreviate(gold);
            up21counter.innerHTML = up21count;
        }
    }
}

// upgrade 22 stone autobuy

const upgrade22 = document.getElementById("upgrade22");
const priceTag22 = document.getElementById("priceTag22");
const up22counter = document.getElementById("up22counter");

upgrade22.addEventListener("click", upStoneAutobuy);

let upgrade22price = 5;
let up22count = 0;
let stoneAutobuy = false;

function upStoneAutobuy() {
    if(up22count < 1) {
        if(gold >= upgrade22price) {
            stoneAutobuy = true;
            gold = gold - upgrade22price;
            up22count++;
            priceTag22.innerHTML = "MAX";
            currency7.innerHTML = "gold: " + abbreviate(gold);
            up22counter.innerHTML = up22count;
        }
    }
}

// upgrade 23 brick autobuy

const upgrade23 = document.getElementById("upgrade23");
const priceTag23 = document.getElementById("priceTag23");
const up23counter = document.getElementById("up23counter");

upgrade23.addEventListener("click", upBrickAutobuy);

let upgrade23price = 15;
let up23count = 0;
let brickAutobuy = false;

function upBrickAutobuy() {
    if(up23count < 1) {
        if(gold >= upgrade23price) {
            brickAutobuy = true;
            gold = gold - upgrade23price;
            up23count++;
            priceTag23.innerHTML = "MAX";
            currency7.innerHTML = "gold: " + abbreviate(gold);
            up23counter.innerHTML = up23count;
        }
    }
}

// upgrade 24 brick generation

const upgrade24 = document.getElementById("upgrade24");
const priceTag24 = document.getElementById("priceTag24");
const up24counter = document.getElementById("up24counter");

upgrade24.addEventListener("click", upBrickGen);

let upgrade24price = 10;
let up24count = 0;
let brickGeneration = 0;

function upBrickGen() {
    if(gold >= upgrade24price) {
        brickGeneration++;
        gold = gold - upgrade24price;
        upgrade24price = upgrade24price * 1.5;
        up24count++;
        priceTag24.innerHTML = abbreviate(upgrade24price) + " gold";
        currency7.innerHTML = "gold: " + abbreviate(gold);
        up24counter.innerHTML = up24count;
    }
}

// upgrade 25 all metals generation (super expensive)

const upgrade25 = document.getElementById("upgrade25");
const priceTag25 = document.getElementById("priceTag25");
const up25counter = document.getElementById("up25counter");

upgrade25.addEventListener("click", upMetalsGen);

let upgrade25price = 500;
let up25count = 0;
let metalsGeneration = 0;

function upMetalsGen() {
    if(gold >= upgrade24price) {
        metalsGeneration++;
        gold = gold - upgrade25price;
        upgrade25price = upgrade25price * 1.5;
        up25count++;
        priceTag25.innerHTML = abbreviate(upgrade25price) + " gold";
        currency7.innerHTML = "gold: " + abbreviate(gold);
        up25counter.innerHTML = up25count;
    }
}

// autobuy

setInterval(autoBuy, 500);

function autoBuy() {
    if(rockAutobuy === true) {
        upRockValue();
        upStoneChance();
        upStoneValue();
    }
    if(stoneAutobuy === true) {
        upAutocollectAmount();
        upRockValueStone();
        upBricks();
    }
    if(brickAutobuy === true) {
        upRockValueBrick();
        upStoneValueBrick();
        upCopperValueBrick();
    }
}

// currency generation

setInterval(generateBricks, 1000);

function generateBricks() {
    if(brickGeneration > 0) {
        if(bricksValue > 10) {
            bricks = bricksValue * (brickGeneration / 100);
            currency4.innerHTML = "bricks: " + abbreviate(bricks);
        }
    }
}

setInterval(generateMetals, 1000)

function generateMetals() {
    if(metalsGeneration > 0) {
        if(copperValue > 10) {
            copper = copperValue * (metalsGeneration / 100);
            currency5.innerHTML = "copper: " + abbreviate(copper);
        }
        if(silverValue > 10) {
            silver = silverValue * (metalsGeneration / 100);
            currency6.innerHTML = "silver: " + abbreviate(silver);
        }
        if(goldValue > 10) {
            gold = goldValue * (metalsGeneration / 100);
            currency6.innerHTML = "gold: " + abbreviate(gold);
        }
    }
}

// hide locked upgrades and stuff

function hideUpgrades() {
    upgrade9.classList.add("hide");
    upgrade10.classList.add("hide");
    upgrade11.classList.add("hide");
    reset2div.classList.add("hide");
    reset3div.classList.add("hide");
    reset4div.classList.add("hide");
    reset5div.classList.add("hide");
    c1li.style.display = 'none';
    c2li.style.display = 'none';
    c3li.style.display = 'none';
    c4li.style.display = 'none';
    upgrade12.classList.add("hide");
    upgrade13.classList.add("hide");
    upgrade14.classList.add("hide");
    upgrade15.classList.add("hide");
    upgrade16.classList.add("hide");
    upgrade17.classList.add("hide");
    upgrade18.classList.add("hide");
    upgrade19.classList.add("hide");
    upgrade20.classList.add("hide");
    upgrade21.classList.add("hide");
    upgrade22.classList.add("hide");
    upgrade23.classList.add("hide");
    upgrade24.classList.add("hide");
    upgrade25.classList.add("hide");

}

hideUpgrades();