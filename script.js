async function clearSquares() {
    /*await sleep(1000).then(msg => console.log(msg));
    alert("clearing started")
    let squareTurn = 1;
    let squarePos = 0;
    let clearedSquares = 0
    while (clearedSquares < 30 && squareTurn < turn) {
        while (turn > 0) {
            document.getElementById(`${squareTurn}-${squarePos}`).innerHTML = " ";
            document.getElementById(`${squareTurn}-${squarePos}`).style.backgroundColor = "white";
            alert(`cleared square id ${turn-1}-${squarePos}`)
            squarePos += 1;
            if (squarePos === 5) {
                squarePos = 0;
            }
            clearedSquares += 1;
            await sleep(100);
        }
    }
    await getWord()*/
    await sleep(1000);
    console.log("slept");
    let squarePos = 0;
    let clearedSquares = 0;
    while (clearedSquares < turn * 5 && turn>0) {
        document.getElementById(`${turn - 1}-${squarePos}`).innerHTML = " ";
        document.getElementById(`${turn - 1}-${squarePos}`).style.backgroundColor = "while";
        console.log(`${squareTurn}-${squarePos}`)

        if (squarePos === 5) {
            squarePos = 0
        }
        clearedSquares += 1
        await sleep(100)
    }
    await getWord()
}