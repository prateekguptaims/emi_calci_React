import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { tenureData } from './utils/constants'
import { numberWithCommas } from './utils/config'
import TestInput from './component/test-input'
import SliderInput from './component/slider-input'

function App() {
  // const [count, setCount] = useState(0)
  const [cost, setCost] = useState(0)
  const [interest, setInterest] = useState(10)
  const [fee, setFee] = useState(1)
  const [downPayment, setDownPayment] = useState(0)
  const [tenure, setTenure] = useState(12)
  const [emi, setEmi] = useState(0)

  const calculateEMI = (downPayment) => {
    if (!cost) return;

    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numberOfYears = tenure / 12;
    const EMI = (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) / ((1 + rateOfInterest) ** numberOfYears - 1);
    return Number(EMI / 12).toFixed(0);

  }

  const calculateDP = (emi) => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;

    return Number((downPaymentPercent / 100) * cost).toFixed(0);

  }
  const updateEMI = (e) => {
    if (!cost) return;

    // calculate emi and updated
    const dp = Number(e.target.value)
    setDownPayment(dp.toFixed(0))

    const emi = Number(e.target.value)
    setEmi(emi.toFixed(0))
  }
  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };
  const totalEMI = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };

  const updateDownPayment = (e) => {
    if (!cost) return;
    // calculate emi and updated
    const emi = Number(e.target.value)
    setEmi(emi.toFixed(0))

    const dp = calculateDP(emi)
    setDownPayment(dp)

  }
  useEffect(() => {
    if (!cost) return;
    setDownPayment(0)
    setEmi(0)

    const emi = calculateEMI(downPayment)
    setEmi(emi);

  }, [tenure])


  return (
    <div className='App'>
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>

      {/* <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        Total cost of asset
      </span>
      <input type="number" value={cost} placeholder='total cost of assets'
        onChange={(e) => setCost(e.target.value)} />

      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        Interest Rate (in %)
      </span>
      <input type="number" value={interest} placeholder='Interest Rate (in %)  '
        onChange={(e) => setInterest(e.target.value)} />

      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        Processing fee (in %)
      </span>
      <input type="number" value={fee} placeholder='Processing fee (in %) '
        onChange={(e) => setFee(e.target.value)} /> */}
        <TestInput Title={"total cost of asset"} state={cost} setState={setCost} />

        <TestInput Title={"Interest Rate (in %)"} state={interest} setState={setInterest} />

        <TestInput Title={"Processing fee (in %)"} state={fee} setState={setFee} />

        <SliderInput
        title="Down Payment"
        underlineTitle={`Total Down Payment - ${totalDownPayment()}`}
        onChange={updateEMI}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title="Loan per Month"
        underlineTitle={`Total Loan Amount - ${totalEMI()}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
      />


<span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button
              key={t}
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>



    </div>
  )
}

export default App
