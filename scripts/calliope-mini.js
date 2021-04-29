let draw = false
let win = false
let degrees = 0
let enemyChoice = 0
let choice = 0
function showChoice(choiceNumber: number) {
    // 0 = Schere, 1 = Stein, 2 = Papier
    if (choiceNumber == 0) {
        // schere
        basic.showLeds(`
            . . . . .
            # . # # #
            . # . . .
            # . # # #
            . . . . .
            `)
    }
    if (choiceNumber == 1) {
        // stein
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            `)
    }
    if (choiceNumber == 2) {
        // papier
        basic.showLeds(`
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            `)
    }
    basic.pause(2000)
}
function chooser(inputNumber: number) {
    // 0 = Schere, 1 = Stein, 2 = Papier
    let choice2: number = 0
    if (degrees < 30) {
        choice2 = 1
        basic.showArrow(ArrowNames.North)
    } else if (degrees < 150) {
        choice2 = 2
        basic.showArrow(ArrowNames.East)
    } else if (degrees < 210) {
        // unten ist zufällig
        choice2 = Math.random(2)
        basic.showArrow(ArrowNames.South)
    } else if (degrees < 330) {
        choice2 = 0
        basic.showArrow(ArrowNames.West)
    } else {
        choice2 = 1
        basic.showArrow(ArrowNames.North)
    }
    showChoice(choice2)
    return choice2;
}
basic.forever(() => {
    for (let i = 0; i < 2; i++) {
        degrees = input.compassHeading()
        choice = chooser(degrees)
    }
    // show your final choice
    showChoice(choice)
    basic.pause(1000)
    // enemy choice
    enemyChoice = Math.random(2)
    basic.showString("vs")
    showChoice(enemyChoice);
    // versus
    basic.pause(1000)
    basic.showString(">")
    basic.pause(1000)

    // show win or loose 
    win = false
    draw = false

    // 0 = Schere, 1 = Stein, 2 = Papier
    if (choice == 0 && enemyChoice == 2) {
        // schere schneidet papier
        win = true
    }
    if (choice == 1 && enemyChoice == 0) {
        // stein zerschlägt schere
        win = true
    }
    if (choice == 2 && enemyChoice == 1) {
        // papier umwickelt stein
        win = true
    }
    if (choice == enemyChoice) {
        // unentschieden
        draw = true
    }
    // zeige ergebnis
    if (draw) {
        basic.showString("=")
    } else {
        if (win) {
            music.playTone(880, 300)
            basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `)
        } else {
            music.playTone(175, 300)
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
        }
    }
    basic.pause(5000)
})
