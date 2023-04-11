let userBank, autoClickers, bigClickers, biggerClickers, clickerIDs, buttonCount;
userBank = 0
autoClickers = 0;
bigClickers = 0;
biggerClickers = 0;
buttonCount = 1;
clickerIDs = []

function setTitle() {
    let title;
    title = document.getElementById("title")
    title.textContent = userBank + " points"
}
function displayBank() {
    let myBank;
    myBank = document.getElementById("bank");
    myBank.innerHTML = ""
    myBank.innerHTML += "Your Bank: " + userBank;
    // setTitle()
}

function save() {
    localStorage.setItem("userBank", userBank.toString())
    localStorage.setItem("autoClickers", autoClickers.toString())
    localStorage.setItem("bigClickers", bigClickers.toString())
    localStorage.setItem("biggerClickers", biggerClickers.toString())
    localStorage.setItem("buttonCount", buttonCount.toString())
}

function set() {
    let bank, clickers, savedClickers, bigClicks, biggerClicks, bigSaved, biggerSaved, buttons, buttonSaved
    bank = localStorage.getItem("userBank")
    clickers = localStorage.getItem("autoClickers")
    bigClicks = localStorage.getItem("bigClickers")
    biggerClicks = localStorage.getItem("biggerClickers")
    buttons = localStorage.getItem("buttonCount")
    if (bank !== null) {
        userBank = parseInt(bank)
    } else {
        userBank = 0
    }
    if (clickers !== null) {
        savedClickers = parseInt(clickers)
    } else {
        savedClickers = 0
    }
    if (bigClicks !== null) {
        bigSaved = parseInt(bigClicks)
    } else {
        bigSaved = 0
    }
    if (biggerClicks !== null) {
        biggerSaved = parseInt(biggerClicks)
    } else {
        biggerSaved = 0
    }
    displayBank()
    if (savedClickers !== 0) {
        let i;
        for (i = 0; i !== savedClickers; i++) {
            addClickers(1)
        }
        displayAutoClickers()
    }
    if (bigSaved !== 0) {
        let i;
        for (i = 0; i !== bigSaved; i++) {
            addClickers(2)
        }
        displayAutoClickers()
    }
    if (biggerSaved !== 0) {
        let i;
        for (i = 0; i !== biggerSaved; i++) {
            addClickers(3)
        }
        displayAutoClickers()
    }
    if (buttons !== null) {
        buttonSaved = parseInt(buttons)
    } else {
        buttonSaved = 1
    }
    if (buttonSaved > 1) {
        let i;
        for (i = 1; i !== buttonSaved; i++) {
            addButton()
        }
    }
}

function displayAutoClickers() {
    let myClickers, cps, totalCPS;
    if (autoClickers !== null) {
        myClickers = document.getElementById("autoClickers");
        myClickers.innerHTML = ""
        cps = autoClickers/5
        myClickers.innerHTML += "Your Auto-clickers: " + autoClickers + " ("+  cps + " clicks per second!)" +"<br>";
    }
    if (bigClickers !== null) {
        myClickers = document.getElementById("bigClickers");
        myClickers.innerHTML = ""
        cps = (bigClickers*10)/5
        myClickers.innerHTML += "Your Big-clickers: " + bigClickers + " ("+  cps + " clicks per second!)" + "<br>";
    }
    if (biggerClickers !== null) {
        myClickers = document.getElementById("biggerClickers");
        myClickers.innerHTML = ""
        cps = (biggerClickers*100)/5
        myClickers.innerHTML += "Your Bigger-clickers: " + biggerClickers + " ("+  cps + " clicks per second!)" + "<br>";
    }
    cps = document.getElementById("cps")
    cps.innerHTML = ""
    totalCPS = (autoClickers/5) + ((bigClickers*10)/5) + ((biggerClickers*100)/5)
    cps.innerHTML = "Total Clicks Per Second: " + totalCPS
    cps = document.getElementById("5cps")
    cps.innerHTML = ""
    totalCPS = 5 * ((autoClickers/5) + ((bigClickers*10)/5) + ((biggerClickers*100)/5))
    cps.innerHTML = "Total Clicks Per 5 Seconds: " + totalCPS
}

function addToClickers(input) {
    if (input === 1) {
        autoClickers += 1;
    } else if (input === 10) {
        bigClickers += 1;
    } else if (input === 100) {
        biggerClickers += 1;
    }
    displayAutoClickers()
}

function addToBank() {
    userBank += buttonCount;
    displayBank()
}

function bigAddBank() {
    userBank += 10;
    displayBank()
}

function biggerAddBank() {
    userBank += 100;
    displayBank()
}

function addClickers(size) {
    let newClicker;
    if (size === 1) {
        newClicker = setInterval(addToBank, 5000)
        clickerIDs.push(newClicker)
        addToClickers(1)
    } else if (size === 2) {
        newClicker = setInterval(bigAddBank, 5000)
        clickerIDs.push(newClicker)
        addToClickers(10)
    } else if (size === 3) {
        newClicker = setInterval(biggerAddBank, 5000)
        clickerIDs.push(newClicker)
        addToClickers(100)
    }
}

function buyItem(price, item) {
    if (userBank >= price) {
        userBank -= price
        displayBank()
        if (item < 4) {
            addClickers(item)
        } else {
            addButton()
        }
    }
}

function resetGame() {
    let ele;
    ele = document.getElementById("temptation")
    ele.innerHTML = "You gave into temptation and clicked the button. Your progress has been reset."
    userBank = 0
    autoClickers = 0
    bigClickers = 0
    biggerClickers = 0
    buttonCount = 1
    ele = document.getElementById("clickButtons")
    ele.innerHTML = '<img src="Penguin.png" alt="image" onClick="addToBank()" height="200" width="200">'
    for (let click of clickerIDs) {
        clearInterval(click)
    }
    displayBank()
    displayAutoClickers()
    save()
}

function addPoints() {
    userBank += 1000000;
    displayBank()
}

function addButton() {
    let ele;
    ele = document.getElementById("clickButtons")
    ele.innerHTML += '<img src="Penguin.png" alt="image" onClick="addToBank()" height="200" width="200">'
    buttonCount += 1;
}