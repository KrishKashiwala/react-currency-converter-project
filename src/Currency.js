import React from 'react'

const Currency = ({currencyOptions , selectedCurrency , onChangeCurrency , amount , onChangeAmount}) => {

  return (
    
    <>  
            
          
            <input  className = "inputTag" value = {amount} onChange = {onChangeAmount}/>
            <select value = {selectedCurrency} onChange = {onChangeCurrency}>
            {currencyOptions.map(option  => (
              <option value={option} key = {option}>{option}</option>
            ))}     
            </select>
    </>
  )
} 

export default Currency
