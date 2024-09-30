let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
// let img = document.querySelector("#image");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],    
    [2, 5, 8], 
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "red";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "blueviolet";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    const img = document.getElementById('image');
    img.src = 'win_O.gif';
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "Game Draw!";
    msgContainer.classList.remove("hide");
    const img = document.getElementById('image');
    img.src = 'tryagain_1.gif';
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let position1Value = boxes[pattern[0]].innerText;
        let position2Value = boxes[pattern[1]].innerText;
        let position3Value = boxes[pattern[2]].innerText;

        if (position1Value !== "" && position2Value !== "" && position3Value !== "") {
            if (position1Value === position2Value && position2Value === position3Value) {
                showWinner(position1Value);
                return; 
            }
        }
    }
    
    const allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (allFilled) {
        showDraw();
        boxes.forEach(box => {
     box.style.backgroundColor = "red"; 
        box.innerText = "";

        });
    }
};

resetBtn.addEventListener("click", () => {
    enableBoxes();
    msgContainer.classList.add("hide");
});

newGamebtn.addEventListener("click", () => {
    enableBoxes();
    msgContainer.classList.add("hide");
});

const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "";
    }
};
