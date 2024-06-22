import './style.css'

const calculator = document.querySelector('.calculator') 
const keys = calculator.querySelector('.calculator-keys') 
const display = calculator.querySelector('.calculator-display')

let previousKeyType = ''; 
let firstValue = ''; 
let operator = '';  
let secondValue = ''; 

//Todo Max length  to show in the display
const MAX_DISPLAY_LENGTH = 14;


keys.addEventListener('click',e => {
    if(e.target.matches('button')){
        const key = e.target  //? element clicked
        const action = key.dataset.action //? type of element clicked
        const keyContent = key.textContent //? content of elelement clicked
        const displayedNum = display.textContent //? num on display

        //Todo when click a key, add class 'is-depressed' and after 100ms it is removed
        key.classList.add('is-depressed')
            setTimeout(() => {
                key.classList.remove('is-depressed');
            }, 100);


        if(!action){
            // console.log('Number key!')
            if (displayedNum === '0' || previousKeyType === 'operator'){ //Todo if display num only have '0', replace that for the key press
                display.textContent = keyContent
            }else{ 
                //Todo else concat the display num with the key press
                if (displayedNum.length < MAX_DISPLAY_LENGTH){
                    display.textContent = displayedNum + keyContent
                }
            }
            previousKeyType = 'number'
        }

        if(action === 'add'||
            action === 'subtract'||
            action === 'multiply'||
            action === 'divide'
        ){
            //console.log('Operator key!')
            
            firstValue = displayedNum
            operator = action
            calculator.dataset.previousKeyType = 'operator';
            
            previousKeyType = 'operator'
        }

        if(action === 'decimal'){ //Todo when press decimal, concat a point in the display
            // console.log('Decimal key!')
            if(!displayedNum.includes('.') && displayedNum.length < MAX_DISPLAY_LENGTH){ //Todo will only concat a point if there isn't one in the display
                display.textContent = displayedNum + "."
            }
            if(previousKeyType === 'operator'){
                display.textContent = '0.'
            }
            previousKeyType = 'decimal'
        }

        if(action === 'clear'){
            //console.log('Clear key!')
            //Todo Reset all variables
            display.textContent = '0'
            firstValue = ''
            operator = ''
            secondValue = ''

            previousKeyType = 'clear'
        }

        if(action === 'calculate'){
            console.log(('Equal key!'))
            secondValue = displayedNum

            if (firstValue && operator) {
                const result = calculate(firstValue, operator, secondValue);
                display.textContent = formatResult(result);
            }

            previousKeyType = 'calculate'
        }
    }
})

//Todo function to calculate an arithmetic operation
const calculate = (first, operator, second)=>{
    first = parseFloat(first)
    second = parseFloat(second)

    if (operator === 'add') return first + second;
    if (operator === 'subtract') return first - second;
    if (operator === 'multiply') return first * second;
    if (operator === 'divide') return first / second;
    return second;
}

//Todo function to limit the numbers on the display
const formatResult = (result)=>{
    result = result.toString();
    if (result.length > MAX_DISPLAY_LENGTH) {
        
        result = result.substring(0, MAX_DISPLAY_LENGTH);
    }
    return result;
}


