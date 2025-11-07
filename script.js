
let contents;
let turn = true;

function createTable() {
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");

    for (let i = 0; i < 3; i++) {
        let tr = document.createElement("tr");

        for (let j = 0; j < 3; j++) {
            let td = document.createElement("td");
            td.classList.add("tdclass", "content");
            tr.append(td);
        }

        tbody.append(tr);
    }

    table.append(tbody);
    document.getElementById("submaincontainer").append(table);

    contents = document.querySelectorAll(".content");
    Tick(contents);
}

function Tick(contents) {
    contents.forEach((content, i) => {
        content.id = `index${i + 1}`;
        content.addEventListener("click", () => {
            if (content.innerHTML !== "") return;

            if (turn) {
                content.innerHTML = "O";
                content.classList.add("common", "player1");
            } else {
                content.innerHTML = "X";
                content.classList.add("common", "player2");
            }

            turn = !turn;
            checkWinner(contents);
        });
    });
}

function checkWinner(contents) {
    let board = [];
    for (let i = 0; i < contents.length; i++) {
        board.push(contents[i].innerHTML);
    }

    let combo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < combo.length; i++) {
        let [a, b, c] = combo[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setTimeout(() => {
                alert(board[a] + " Wins!");
                resetGame(contents);
            }, 100);
            return;
        }
    }

    let fill = board.every((cell) => cell !== "");
    if (fill) {
        setTimeout(() => {
            alert("Draw!");
            resetGame(contents);
        }, 100);
    }
}

function resetGame(contents) {
    contents.forEach((content) => {
        content.innerHTML = "";
        content.classList.remove("player1", "player2", "common");
    });
    turn = true;
}


