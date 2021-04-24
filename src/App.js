import React , {useEffect , useState} from 'react'
import './App.css';
import Currency from './Currency'
const URL = "https://api.ratesapi.io/api/latest";
function App() {
  const [currencyOptions , setCurrencyOptions] = useState([])
  const [toCurrency , setToCurrency] = useState();
  const [fromCurrency, setFromCurrency] = useState()
  const [exchangeRates , setExchangeRates] = useState()
  const [amount , setAmount] = useState(1)
  const [amountInFromCurrency , setAmountInFromCurrency]  =useState(true)
  
  let toAmount = 0 ,  fromAmount = 0;
  if(amountInFromCurrency){
      fromAmount = amount
      toAmount = amount * exchangeRates
  }else{
      toAmount = amount
      fromAmount  = amount/exchangeRates
  }
  useEffect(() =>{
      fetch(URL).then((res) => res.json()).then((data) => {
          const  firstCurrency = Object.keys(data.rates)[0]
          setCurrencyOptions([data.base , ...Object.keys(data.rates)])
          setFromCurrency(data.base)
          setToCurrency(firstCurrency);
          setExchangeRates(data.rates[firstCurrency])
      })
  } , []) 
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRates(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function onFromChangeAmount (e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true)
    }
    function onToChangeAmount (e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false)
    }
  return (
      <>
        <h1>Convert</h1>
          <Currency
           currencyOptions = {currencyOptions}
            selectedCurrency = {fromCurrency}
             onChangeCurrency = {e => setFromCurrency(e.target.value)}
             onChangeAmount = {onFromChangeAmount}
           amount = {fromAmount}/>
          
          <h1 className= "htag">=</h1>
          <Currency 
          currencyOptions = {currencyOptions}
           selectedCurrency = {toCurrency}
            onChangeCurrency = {e => setToCurrency(e.target.value)}
            amount = {toAmount}
            onChangeAmount = {onToChangeAmount}
            />
      </> 
  ); 

    // const [currencyOptions , setCurrencyOptions] = useState([])
    // const [fromCurrency , setFromCurrency] = useState()
    // const [toCurrency , setToCurrency] = useState()
    // const [exchangeRates , setExchangeRates] = useState()
    // const [amountInFromCurrency , setAmountInFromCurrency] = useState(true)
    // const [amount , setAmount] = useState(1)
    // let fromAmount = 0 , toAmount = 0;
    // if(amountInFromCurrency){
    //     fromAmount = amount;
    //     toAmount = amount*exchangeRates
    // }else{
    //     toAmount = amount;
    //     fromAmount = amount/exchangeRates
    // }
    // useEffect(() => {
    //     fetch(URL).then(res => res.json()).then(data => {
    //         const firstCurrency = Object.keys(data.rates)[0]
    //         setCurrencyOptions([data.base , ...Object.keys(data.rates)])
    //         setFromCurrency(data.base)
    //         setToCurrency(firstCurrency)
    //         setExchangeRates(data.rates[firstCurrency])
    //     })
    // } , [])
    // useEffect(() => {
    //  if(fromCurrency != null && toCurrency != null){
    //     fetch(`${URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(res => res.json()).then(data => data.rates[toCurrency])
    //  }
    // }, [fromCurrency , toCurrency])
    // function handleFrom (e){
    //     setAmount(e.target.value)
    //     setAmountInFromCurrency(true)
    // }
    // function handleTo (e){
    //     setAmount(e.target.value)
    //     setAmountInFromCurrency(false)
    // }
    // return(
    //     <>
    //             <h1>Convert</h1>
    //             <Currency currencyOptions = {currencyOptions} 
    //              selectedCurrency = {fromCurrency} 
    //              amount = {fromAmount} 
    //              onChangeCurrency = {e => setFromCurrency(e.target.value)}
    //               onChangeAmount = {handleFrom}

    //               />
    //             <h1>=</h1>
    //             <Currency  currencyOptions = {currencyOptions} 
    //              selectedCurrency = {toCurrency} 
    //              amount = {toAmount} 
    //              onChangeCurrency = {e => setToCurrency(e.target.value)} 
    //              onChangeAmount = {handleTo}

    //              />




    //     </>
    // )   
}

export default App; 

