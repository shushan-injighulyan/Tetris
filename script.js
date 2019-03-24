function createMainBoard (xCount, yCount) {

    for (let i = 0; i < xCount; i++) {

        for (let j = 0; j < yCount; j++) {
            let unitSquare = document.createElement("div");
            unitSquare.className = "square";
            document.getElementById("container").appendChild(unitSquare);

        }

    }

}

function createNextBoard (xCount, yCount) {

    for (let i = 0; i < xCount; i++) {

        for (let j = 0; j < yCount; j++) {
            let unitSquare = document.createElement("div");
            unitSquare.className = "nextSquare";
            document.getElementById("next-item-container").appendChild(unitSquare);
        }

    }

}


createMainBoard(15, 20);
createNextBoard (4, 4);


let painted = [ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ];
let score = 0;



class Element {
    constructor (a, b, c, d) {
        this.first = a,
            this.second = b,
            this.third = c,
            this.fourth = d
    }
}


let items = [ [22, 21, 7, 23], [22, 7, 23, 38], [22, 7, 21, 36], [22, 7, 8, 37],  [22, 7, 6, 37],
    [22, 7, 37, 52], [22, 23, 7, 8] ];

let nextItems = [ [9, 8, 5, 10], [9, 5, 10, 14], [10, 6, 9, 13], [9, 5, 6, 13], [10, 6, 5, 14],
    [5, 1, 9, 13], [5, 6, 9, 10] ];


let index = Math.floor(Math.random() * 7);
let nextIndex =  Math.floor(Math.random() * 7);
let nextItem = new Element(...nextItems[nextIndex]);
let nextCurrentItem = new Element(...items[nextIndex]);
let item = new Element(...items[index]);

let state = false;
createNextCurrentItem(nextItem);




function createCurrentItem(obj) {
    for (let key in obj) {
        document.getElementsByClassName("square")[obj[key]].style.backgroundColor = "red";
    }
}


function createNextCurrentItem(obj) {
    for (let key in obj) {
        document.getElementsByClassName("nextSquare")[obj[key]].style.backgroundColor = "red";
    }
}


function cleanItem(obj) {
    for (let key in obj) {
        document.getElementsByClassName("square")[ obj[key] ].style.backgroundColor = "white";
    }
}

function cleanNextItem(obj) {
    for (let key in obj) {
        document.getElementsByClassName("nextSquare")[ obj[key] ].style.backgroundColor = "white";
    }
}


function moveRight(obj) {
    if ( canMoveRight(obj) ) {
        cleanItem(obj);
        for (let key in obj) {
            obj[key] +=  1;
        }
        createCurrentItem(obj);
    }
}


function moveLeft(obj) {
    cleanItem(obj)

    for (let key in obj) {
        obj[key] -= 1;
    }

    createCurrentItem(obj);
}


function moveDown(obj) {

    cleanItem(obj)

    for (let key in obj) {
        obj[key] += 15;
    }

    createCurrentItem(obj);

}


function rotateT(obj) {
    if ( !(document.getElementsByClassName("square")[obj.first + 15].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second += 16;
        createCurrentItem(obj);
    } else if ( !(document.getElementsByClassName("square")[obj.first - 1].style.backgroundColor ==="red") ) {
        cleanItem(obj);
        obj.third += 14;
        createCurrentItem(obj);
    } else if ( !(document.getElementsByClassName("square")[obj.first - 15].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.fourth -= 16;
        createCurrentItem(obj);
    } else if ( !(document.getElementsByClassName("square")[obj.first + 1].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second -= 14;
        createCurrentItem(obj);
        obj.second -= 2;
        obj.third -= 14;
        obj.fourth += 16;
    }
}



function rotateJ(obj) {
    if (obj.first - obj.second === 15 && !(document.getElementsByClassName("square")[obj.second + 16].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third + 30].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth - 16].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second += 16;
        obj.third += 30;
        obj.fourth -= 16;
        createCurrentItem(obj);
    } else if ( obj.third - obj.second === 15 && !(document.getElementsByClassName("square")[obj.second + 14].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third - 2].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth - 14].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second += 14;
        obj.third -= 2;
        obj.fourth -= 14;
        createCurrentItem(obj);
    } else if (obj.second - obj.third === 1 && !(document.getElementsByClassName("square")[obj.second - 16].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third - 30].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth +16].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second -= 16;
        obj.third -= 30;
        obj.fourth += 16;
        createCurrentItem(obj);
    } else if (obj.second - obj.third === 15 && !(document.getElementsByClassName("square")[obj.second - 14].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third + 2].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth + 14].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second -= 14;
        obj.third += 2;
        obj.fourth += 14;
        createCurrentItem(obj);
    }
}


function rotateL(obj) {
    if (obj.first - obj.second === 15 && (obj.first + 1) % 15 !==0
        && !(document.getElementsByClassName("square")[obj.second + 16].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third + 2].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth - 16].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second += 16;
        obj.third += 2;
        obj.fourth -= 16;
        createCurrentItem(obj);
    } else if ( obj.second - obj.third === 15 && !(document.getElementsByClassName("square")[obj.second + 14].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third + 30].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth - 14].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second += 14;
        obj.third += 30;
        obj.fourth -= 14;
        createCurrentItem(obj);
    } else if (obj.third - obj.second === 1 && !(document.getElementsByClassName("square")[obj.second - 16].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third - 2].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth + 16].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second -= 16;
        obj.third -= 2;
        obj.fourth += 16;
        createCurrentItem(obj);

    } else if (obj.third - obj.second === 15 && !(document.getElementsByClassName("square")[obj.second - 14].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third - 30].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth + 14].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.second -= 14;
        obj.third -= 30;
        obj.fourth += 14;
        createCurrentItem(obj);
    }
}

function rotateS(obj) {
    if ( !(document.getElementsByClassName("square")[obj.first -1].style.backgroundColor === "red")
        && obj.first % 15 !==0) {
        cleanItem(obj);
        obj.third -= 2;
        obj.fourth -= 30;
        createCurrentItem(obj);
    } else if ( !(document.getElementsByClassName("square")[obj.first + 1].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.third += 2;
        obj.fourth += 30;
        createCurrentItem(obj);
    }
}



function rotateZ(obj) {
    if ( !(document.getElementsByClassName("square")[obj.first + 1].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.third += 2;
        obj.fourth -= 30;
        createCurrentItem(obj);
    } else if ( !(document.getElementsByClassName("square")[obj.first - 1].style.backgroundColor === "red") ) {
        cleanItem(obj);
        obj.third -= 2;
        obj.fourth += 30;
        createCurrentItem(obj);
    }
}


function rotateI(obj) {
    if ( !(document.getElementsByClassName("square")[obj.second + 14].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third - 14].style.backgroundColor ==="red") &&
        !(document.getElementsByClassName("square")[obj.fourth - 28].style.backgroundColor === "red")
        && obj.first - obj.second === 15 && obj.first%15 !== 0 && (obj.first+1)%15 !== 0 && (obj.first+2)%15 !== 0 ) {
        cleanItem(obj);
        obj.second += 14;
        obj.third -= 14;
        obj.fourth -= 28;
        createCurrentItem(obj);
    } else if ( !(document.getElementsByClassName("square")[obj.second - 14].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.third + 14].style.backgroundColor === "red") &&
        !(document.getElementsByClassName("square")[obj.fourth + 28].style.backgroundColor === "red") &&
        obj.first%15 !== 0 && (obj.first+1)%15 !== 0 && (obj.first+2)%15 !== 0) {
        cleanItem(obj);
        obj.second -= 14;
        obj.third += 14;
        obj.fourth += 28;
        createCurrentItem(obj);
    }
}


document.addEventListener("keydown", function(e){
    if(e.keyCode == '39' && state ) {
        moveRight(item);
    } else if (e.keyCode == '40' && canMoveDown(item) && state && !(document.getElementById("game-over-container").style.display === "block") ) {
        moveDown(item);
    } else if (e.keyCode == '40' && !canMoveDown(item) && state && !(document.getElementById("game-over-container").style.display === "block")) {
        checkPlace(item);
        checkDrown ();
    } else if (e.keyCode == '37' && canMoveLeft(item) && state) {
        moveLeft(item);
    } else if (e.keyCode == '38' && state){
        switch(index) {

            case 0:
                rotateT(item);
                break;

            case 1:
                rotateS(item);
                break;

            case 2:
                rotateZ(item);
                break;

            case 3:
                rotateJ(item);
                break;

            case 4:
                rotateL(item);
                break;

            case 5:
                rotateI(item);
                break;

            case 6:
                break;
        }

    }

});


function canMoveDown(obj) {

    let itemCoordinates = [];

    for (let key in obj) {
        itemCoordinates.push(obj[key]);
    }


    let itemMainCoordinates = [];
    for (let i = 0; i < itemCoordinates.length; i++) {
        if ( !(document.getElementsByClassName("square")[ itemCoordinates[i] + 15 ]
            && document.getElementsByClassName("square")[ itemCoordinates[i] + 15 ].style.backgroundColor === "red"
            && (itemCoordinates[i] + 15 === itemCoordinates[0] || itemCoordinates[i] + 15 === itemCoordinates[1]
                || itemCoordinates[i] + 15 === itemCoordinates[2]  || itemCoordinates[i] + 15 === itemCoordinates[3])) ){
            itemMainCoordinates.push(itemCoordinates[i]);
        }
    }

    let index1 = 0;
    for (let i = 0; i < itemMainCoordinates.length; i++) {
        if (itemMainCoordinates[i] + 15 < 300 && !(document.getElementsByClassName("square")[ itemMainCoordinates[i] + 15 ].style.backgroundColor === "red") ) {
            index1++;
        }
    }

    if (index1 === itemMainCoordinates.length) {
        return true;
    } else {
        return false;
    }

}


function canMoveLeft(obj) {
    let itemCoordinates = [];

    for (let key in obj) {
        itemCoordinates.push(obj[key]);
    }


    let itemMainCoordinates = [];
    for (let i = 0; i < itemCoordinates.length; i++) {
        if (!( itemCoordinates.length !== 0 && document.getElementsByClassName("square")[ itemCoordinates[i] - 1 ].style.backgroundColor === "red"
            && (itemCoordinates[i] - 1 === itemCoordinates[0] ||
                itemCoordinates[i] - 1 === itemCoordinates[1] || itemCoordinates[i] - 1 === itemCoordinates[2]
                || itemCoordinates[i] - 1 === itemCoordinates[3])) ) {
            itemMainCoordinates.push(itemCoordinates[i]);
        }
    }

    let index = 0;
    for (let i = 0; i < itemMainCoordinates.length; i++) {
        if ( !(document.getElementsByClassName("square")[ itemMainCoordinates[i] - 1 ].style.backgroundColor === "red") &&
            itemMainCoordinates[i] %  15 !== 0 ) {
            index++;
        }
    }

    if (index === itemMainCoordinates.length) {
        return true;

    }

}


function canMoveRight(obj) {
    let itemCoordinates = [];

    for (let key in obj) {
        itemCoordinates.push(obj[key]);
    }

    let itemMainCoordinates = [];
    for (let i = 0; i < itemCoordinates.length; i++) {
        if (!( document.getElementsByClassName("square")[ itemCoordinates[i] + 1 ].style.backgroundColor === "red" &&
            (itemCoordinates[i] + 1 === itemCoordinates[0] ||
                itemCoordinates[i] + 1 === itemCoordinates[1] || itemCoordinates[i] + 1 === itemCoordinates[2]
                || itemCoordinates[i] + 1 === itemCoordinates[3]) ) ) {

            itemMainCoordinates.push(itemCoordinates[i]);
        }
    }

    let index = 0;
    for (let i = 0; i < itemMainCoordinates.length; i++) {

        if ( !(document.getElementsByClassName("square")[ itemMainCoordinates[i] + 1 ].style.backgroundColor === "red") &&
            (itemMainCoordinates[i] + 1) %  15 !== 0 ) {
            index++;
        }
    }

    if (index === itemMainCoordinates.length) {
        return true;

    }

}

function checkPlace(obj) {
    for (let key in obj) {
        painted[Math.floor(obj[key]/15)].push(obj[key] );
        painted[Math.floor(obj[key]/15)].sort();

    }

}


function checkDrown () {
    for (let i = 0; i < 20 ; i++) {

        if (painted[i].length === 15) {
            for (let j = 0; j <= painted[i][14];  j++) {
                document.getElementsByClassName("square")[j].style.backgroundColor = "white";
            }
            let currentLevel = document.getElementById("level").value;

            score += currentLevel * 10;
            document.getElementById("score").innerHTML = score;
            for (let m = i; m > 0; m--) {
                painted[m] = [...painted[m-1]];
            }

            for (let k = 0; k <= i; k++) {

                for (let l = 0; l < painted[k].length; l++) {
                    if (painted[k][l]) {
                        painted[k][l] = painted[k][l] + 15;
                        document.getElementsByClassName("square")[painted[k][l]].style.backgroundColor = "red";
                    }

                }
            }
        }
    }




    for (let key in item) {
        item[key] = nextCurrentItem[key];

    }
    index = nextIndex;
    cleanNextItem(nextItem);
    if ( canMoveDown(item) ) {
        createCurrentItem(item);
    }  else {
        createCurrentItem(item);
        clearInterval(timerId);
        document.getElementById("game-over-container").style.display = "block";

    }


    nextIndex =  Math.floor(Math.random() * 7);
    nextItem = new Element(...nextItems[nextIndex]);
    nextCurrentItem = new Element(...items[nextIndex]);
    createNextCurrentItem(nextItem);


}


function start() {
    let currentLevel = document.getElementById("level").value;

    if ( currentLevel == 1 ) {

        timerId = setInterval(function(){
            if (canMoveDown(item) && state) {
                moveDown(item);
            } else if (!canMoveDown(item) &&  state){
                checkPlace(item);
                checkDrown ();
            }


        }, 500);

    } else if (currentLevel == 2) {
        timerId = setInterval(function(){
            if (canMoveDown(item) && state) {
                moveDown(item);
            } else if (!canMoveDown(item) &&  state){
                checkPlace(item);
                checkDrown ();
            }



        }, 400);
    } else if (currentLevel == 3){
        timerId = setInterval(function(){
            if (canMoveDown(item) && state) {
                moveDown(item);
            } else if (!canMoveDown(item) &&  state){
                checkPlace(item);
                checkDrown ();
            }


        }, 300);
    } else {
        timerId = setInterval(function(){
            if (canMoveDown(item) && state) {
                moveDown(item);
            } else if (!canMoveDown(item) &&  state){
                checkPlace(item);
                checkDrown ();
            }



        }, 200);
    }

    document.getElementById("start").style.display = "none";
    state = true;

}



function pause() {
    state = false;
}

function resume() {
    state = true;
}


function cleanArea() {
    document.getElementById("game-over-container").style.display = "none";
    document.getElementById("score").innerHTML = 0;

    for (let i = 0; i <  300; i++ ){
        document.getElementsByClassName("square")[i].style.backgroundColor = "white";
    }

    for (let j = 0; j <  20; j++){
        painted[j] = [];
    }

    start();

}

