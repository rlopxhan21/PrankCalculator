const allBtn = document.querySelectorAll('.btn')

const btnArgs = Array.from(allBtn)

const displayElm = document.querySelector(".display")

let strToDisplay = ""

// let allowDot = true

let lastOperator = ""

const operator = ['+', '-', '*', '/', '%']

const sound = new Audio("sound.mp3")


btnArgs.map((item) => {
    item.addEventListener('click', () => {

        displayElm.style.background = '';
        displayElm.style.color = "black";
        displayElm.classList.remove("prank")


        const val = item.innerText

        if (val === 'AC') {
            // allowDot= true
            strToDisplay = ''
            display(strToDisplay)
            return
        }

        if (val === 'C') {
            if (strToDisplay.length) {
                strToDisplay = strToDisplay.slice(0, -1)
                display(strToDisplay)
            }
            return
        }

        if (val === '=') {
            if (operator.includes(strToDisplay[strToDisplay.length-1])) {
                strToDisplay = strToDisplay.slice(0, -1)
            }
           
            total();
            return
        }

        if (operator.includes(val)) {
            if (!strToDisplay) {
                return
            }
            
            lastOperator = val
            // allowDot = true
            if (operator.includes(strToDisplay[strToDisplay.length-1])) {
                strToDisplay = strToDisplay.slice(0, -1)
            }
        }

        // if (val === '.') {
        //     if (!allowDot) {
        //         return
        //     }
        //     allowDot = false
        // }

        if (val === '.') {
            if (lastOperator) {
                const operatorIndex = strToDisplay.lastIndexOf(lastOperator)

                const lastNumberSet = strToDisplay.slice(operatorIndex + 1)
                if (lastNumberSet.includes(".")) {
                    return
                }
                else {

                }
            }
            if (!lastOperator && strToDisplay.includes(".")) {
                return
            }
        }


            
        strToDisplay += val
        display(strToDisplay)
    })
})

const display = str => {
    displayElm.innerText = str || "0.00"
    
}

const total = () => {
    const extra = randomNumber()

    if (extra) {
        displayElm.style.background = "red"
        displayElm.style.color = "white"
        displayElm.classList.add('prank')
        sound.play()
    }
    const ttl = eval(strToDisplay) + extra
    strToDisplay = ttl
    display(strToDisplay)
}


const randomNumber = () => {
    const num = Math.round(Math.random() * 10)
    return num <= 3 ? num : 0;
}