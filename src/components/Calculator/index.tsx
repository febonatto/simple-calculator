// React imports
import { useState, useEffect } from 'react'

// Clsx import
import { clsx } from 'clsx';

// Assets imports
import backspace from '../../assets/images/icons/backspace.svg'
import clock from '../../assets/images/icons/clock.svg'
import x from '../../assets/images/icons/x.svg'
import broom from '../../assets/images/icons/broom.svg'

// Components imports
import Button from '../Button'

// Utils imports
import replaceCommaWithDot from '../../utils/replaceCommaWithDot'
import replaceDotWithComma from '../../utils/replaceDotWithComma'

// Custom hooks imports
import useHistory from '../../hooks/useHistory';


export default function Calculator() {
  const [displayValue, setDisplayValue] = useState<string>('0')
  const [currentExpression, setCurrentExpression] = useState<string>('')
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false)

  const { history, setValue, cleanHistory } = useHistory()

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      const { key, shiftKey } = event;
      if(key === 'Backspace') {
        handleBackspace()
      } else if(key === 'Escape' || key === 'Delete') {
        handleReset()
      } else if(shiftKey && key === '%') {
        handleClickOperation('%')
      } else if(key === '/') {
        handleClickOperation('/')
      } else if((shiftKey && key === '*') || key === '*') {
        handleClickOperation('*')
      } else if(key === '-') {
        handleClickOperation('-')
      } else if((shiftKey && key === '+') || key === '+') {
        handleClickOperation('+')
      } else if(key === '=' || key === 'Enter') {
        handleClickOperation('=')
      } else if(key === '0') {
        handleClickValue('0')
      } else if(key === '1') {
        handleClickValue('1')
      } else if(key === '2') {
        handleClickValue('2')
      } else if(key === '3') {
        handleClickValue('3')
      } else if(key === '4') {
        handleClickValue('4')
      } else if(key === '5') {
        handleClickValue('5')
      } else if(key === '6') {
        handleClickValue('6')
      } else if(key === '7') {
        handleClickValue('7')
      } else if(key === '8') {
        handleClickValue('8')
      } else if(key === '9') {
        handleClickValue('9')
      } else if (key === ',') {
        handleClickValue(',')
      }
    }

    document.addEventListener('keyup', handleKeyboard)

    return () => {
      document.removeEventListener('keyup', handleKeyboard)
    }
  }, [displayValue])

  function handleBackspace(): void {
    setDisplayValue((prevState) =>
      (prevState.length > 1 ? prevState.slice(0, -1) : '0')
    )
  }

  function handleClickValue(value: string): void {
    setDisplayValue((prevState) => {
      if(prevState === '0' && value !== ',') {
        return value
      } else if(prevState.includes(',') && value === ',') {
        return prevState
      } else {
        return prevState.concat(value)
      }
    });
  }

  function handleClickOperation(chosenOperation: string): void {
    if(currentExpression) {
      const [valueExpression, operationExpression] = currentExpression.split(' ')
      const [modifiedDisplayValue, modifiedValueExpression] = replaceCommaWithDot([displayValue, valueExpression])

      let result: number = 0
      if(operationExpression === '%') {
        result = ((modifiedValueExpression * modifiedDisplayValue) / 100)
      } else if(operationExpression === '/') {
        result = (modifiedValueExpression / modifiedDisplayValue)
      } else if(operationExpression === '*') {
        result = (modifiedValueExpression * modifiedDisplayValue)
      } else if(operationExpression === '-') {
        result = (modifiedValueExpression - modifiedDisplayValue)
      } else if(operationExpression === '+') {
        result = (modifiedValueExpression + modifiedDisplayValue)
      }

      const modifiedResult = replaceDotWithComma(result);
      if(chosenOperation === '=') {
        setValue(`${modifiedValueExpression} ${operationExpression} ${modifiedDisplayValue} = ${modifiedResult}`.replace(/\./g, ','))
        setDisplayValue(modifiedResult);
        setCurrentExpression('');
      } else {
        setDisplayValue('0')
        setCurrentExpression(`${modifiedResult} ${chosenOperation}`)
      }
    } else {
      if(chosenOperation !== '=') {
        setCurrentExpression(`${displayValue} ${chosenOperation}`)
        setDisplayValue('0')
      }
    }
  }

  function handleReset(): void {
    setDisplayValue('0');
    setCurrentExpression('');
  }

  function handleToggleHistory(): void {
    setIsHistoryVisible((prevState) => !prevState)
  }

  function handleHistoryClick(value: string): void {
    const equalIndex = value.indexOf('=')
    const expressionWithoutTotal = value.substring(0, equalIndex)
    const [historyValue, historyOperator, historyDisplayValue] = expressionWithoutTotal.split(' ')
    setDisplayValue(historyDisplayValue)
    setCurrentExpression(`${historyValue} ${historyOperator}`)
    setIsHistoryVisible(false)
  }

  function handleCleanHistory(): void {
    cleanHistory()
    setIsHistoryVisible(false)
  }

  return (
    <div className="text-slate-200">
      <h2 className="text-2xl text-center mb-4">
        SIMPLE CALCULATOR
      </h2>
      <div className="relative w-80 h-96 flex flex-col p-4 rounded-md bg-gray-800 overflow-hidden">
        <div className={clsx(
          (isHistoryVisible ? 'top-0' : '-top-full'),
          'absolute left-0 w-full h-full flex items-start gap-4 p-4 transition-all ease-linear duration-300 bg-gray-800 overflow-hidden z-10')
        }>
          <div className="h-full flex flex-col justify-between">
            <button type="button" onClick={handleToggleHistory}>
              <img src={x} alt="close" />
            </button>
            <button type="button" onClick={handleCleanHistory}>
              <img src={broom} alt="clean" />
            </button>
          </div>
          <div className="w-full h-full flex flex-col gap-3 items-end overflow-hidden">
            {history.map((value) => (
              <button
                key={Math.random()}
                type="button"
                className="whitespace-nowrap"
                onClick={() => handleHistoryClick(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="h-24 flex justify-between mb-4 pb-4 border-b border-b-gray-700">
          <div className="w-2/12 h-full flex flex-col justify-between items-start">
            <button type="button" onClick={handleToggleHistory}>
              <img src={clock} alt="history" />
            </button>
            <button type="button" onClick={handleBackspace}>
              <img src={backspace} alt="backspace" />
            </button>
          </div>
          <div className="w-10/12 h-full flex flex-col justify-between items-end">
            <span className="text-xs max-w-full pr-4 overflow-x-auto scrollbar-none">{currentExpression}</span>
            <span className="text-3xl max-w-full overflow-x-auto scrollbar-none">{displayValue}</span>
          </div>
        </div>
        <div className="h-full grid grid-cols-4 grid-rows-5 gap-2">
          <Button
            hasColSpan
            danger
            buttonLabel="AC"
            onClick={handleReset}
          />
          <Button
            operator
            buttonLabel="%"
            onClick={() => handleClickOperation('%')}
          />
          <Button
            operator
            buttonLabel="/"
            onClick={() => handleClickOperation('/')}
          />
          <Button
            buttonLabel="7"
            onClick={() => handleClickValue('7')}
          />
          <Button
            buttonLabel="8"
            onClick={() => handleClickValue('8')}
          />
          <Button
            buttonLabel="9"
            onClick={() => handleClickValue('9')}
          />
          <Button
            operator
            buttonLabel="*"
            onClick={() => handleClickOperation('*')}
          />
          <Button
            buttonLabel="4"
            onClick={() => handleClickValue('4')}
          />
          <Button
            buttonLabel="5"
            onClick={() => handleClickValue('5')}
          />
          <Button
            buttonLabel="6"
            onClick={() => handleClickValue('6')}
          />
          <Button
            operator
            buttonLabel="-"
            onClick={() => handleClickOperation('-')}
          />
          <Button
            buttonLabel="1"
            onClick={() => handleClickValue('1')}
          />
          <Button
            buttonLabel="2"
            onClick={() => handleClickValue('2')}
          />
          <Button
            buttonLabel="3"
            onClick={() => handleClickValue('3')}
          />
          <Button
            operator
            buttonLabel="+"
            onClick={() => handleClickOperation('+')}
          />
          <Button
            hasColSpan
            buttonLabel="0"
            onClick={() => handleClickValue('0')}
          />
          <Button
            buttonLabel=","
            onClick={() => handleClickValue(',')}
          />
          <Button
            resolve
            buttonLabel="="
            onClick={() => handleClickOperation('=')}
          />
        </div>
      </div>
    </div>
  )
}
