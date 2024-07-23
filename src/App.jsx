import Header from "./components/Header";
import { useCallback, useState } from "react";
import { Fragment } from "react";
import { calculateInvestmentResults, formatter } from "./util/investment.js";

function App() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [annualInvestment, setAnnualInvestment] = useState(100000);
  const [returnInvestment, setReturnInvestment] = useState(10000);
  const [duration, setDuration] = useState(10);

  function inputToObject(initial, annual, returnInt, duration) {
    return {
      duration: Number(duration),
      initialInvestment: Number(initial),
      annualInvestment: Number(annual),
      expectedReturn: Number(returnInt),
    };
  }
  const dataArray = calculateInvestmentResults(
    inputToObject(
      initialInvestment,
      annualInvestment,
      returnInvestment,
      duration
    )
  );
  const handleInitialInv = useCallback((e) => {
    setInitialInvestment(Number(e.target.value));
  }, []);
  const handleAnnualInv = useCallback((e) => {
    setAnnualInvestment(Number(e.target.value));
  }, []);

  const handleDuration = useCallback((e) => {
    setDuration(Number(e.target.value));
  }, []);
  const handleReturn = useCallback((e) => {
    setReturnInvestment(Number(e.target.value));
  }, []);

  return (
    <Fragment>
      <Header>Investment Calculator</Header>
      <div id="user-input">
        <div className="input-group">
          <label>
            Initial Investment
            <input
              type="number"
              min="0"
              value={initialInvestment}
              onChange={handleInitialInv}
            />
          </label>
          <label>
            Annual Investment
            <input
              type="number"
              min="0"
              value={annualInvestment}
              onChange={handleAnnualInv}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Return Investment
            <input
              type="number"
              min="0"
              value={returnInvestment}
              onChange={handleReturn}
            />
          </label>
          <label>
            Duration
            <input
              type="number"
              min="0"
              value={duration}
              onChange={handleDuration}
            />
          </label>
        </div>
      </div>

      <table id="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest(Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>

        <tbody className="center">
          {console.log(dataArray)}
          {dataArray.map((yearData) => {
            const totalInterest =
              yearData.valueEndOfYear -
              yearData.annualInvestment * yearData.year -
              initialInvestment;
            const totalAmount = yearData.valueEndOfYear - totalInterest;

            return (
              <tr key={yearData.year}>
                <td>{yearData.year}</td>
                <td>{formatter.format(yearData.valueEndOfYear)}</td>
                <td>{formatter.format(yearData.interest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(totalAmount)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
}

export default App;
