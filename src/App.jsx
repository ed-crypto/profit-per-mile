import React, { useState } from "react";

export default function DoorDashProfitCalculator() {
  const [revenue, setRevenue] = useState(850);
  const [hours, setHours] = useState(35);
  const [miles, setMiles] = useState(620);
  const [mpg, setMpg] = useState(28);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showCostDetails, setShowCostDetails] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showYearlyView, setShowYearlyView] = useState(false);
  const [activePage, setActivePage] = useState("calculator");

  const [gasPrice, setGasPrice] = useState(4.5);
  const [insuranceMonthly, setInsuranceMonthly] = useState(160);
  const [annualMaintenanceCost, setAnnualMaintenanceCost] = useState(2200);
  const [purchasePrice, setPurchasePrice] = useState(18000);
  const [estimatedResaleValue, setEstimatedResaleValue] = useState(2000);
  const [annualMiles, setAnnualMiles] = useState(25000);
  const [yearsUsed, setYearsUsed] = useState(5);
  const [phoneMonthly, setPhoneMonthly] = useState(40);
  const [taxRate, setTaxRate] = useState(15);

  const cleanNumber = (value) => {
    if (value === "") return "";
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const asNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatMoney = (value) => {
    const safe = Number.isFinite(value) ? value : 0;
    return safe.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
  };

  const revenueNumber = asNumber(revenue);
  const hoursNumber = asNumber(hours);
  const milesNumber = asNumber(miles);
  const mpgNumber = asNumber(mpg);
  const gasPriceNumber = asNumber(gasPrice);
  const insuranceMonthlyNumber = asNumber(insuranceMonthly);
  const annualMaintenanceCostNumber = asNumber(annualMaintenanceCost);
  const purchasePriceNumber = asNumber(purchasePrice);
  const estimatedResaleValueNumber = asNumber(estimatedResaleValue);
  const annualMilesNumber = asNumber(annualMiles);
  const yearsUsedNumber = asNumber(yearsUsed);
  const phoneMonthlyNumber = asNumber(phoneMonthly);
  const taxRateNumber = asNumber(taxRate);

  const gasCost = mpgNumber > 0 ? (milesNumber / mpgNumber) * gasPriceNumber : 0;
  const maintenancePerMile = annualMilesNumber > 0 ? annualMaintenanceCostNumber / annualMilesNumber : 0;
  const maintenance = milesNumber * maintenancePerMile;
  const totalDepreciation = Math.max(purchasePriceNumber - estimatedResaleValueNumber, 0);
  const totalExpectedMiles = annualMilesNumber * yearsUsedNumber;
  const depreciationPerMile = totalExpectedMiles > 0 ? totalDepreciation / totalExpectedMiles : 0;
  const depreciation = milesNumber * depreciationPerMile;
  const weeklyInsurance = insuranceMonthlyNumber / 4.33;
  const weeklyPhone = phoneMonthlyNumber / 4.33;

  const variableCosts = gasCost + maintenance + depreciation;
  const fixedCosts = weeklyInsurance + weeklyPhone;
  const totalExpensesBeforeTax = variableCosts + fixedCosts;
  const profitBeforeTax = revenueNumber - totalExpensesBeforeTax;
  const estimatedTaxes = Math.max(profitBeforeTax, 0) * (taxRateNumber / 100);
  const profitAfterTax = profitBeforeTax - estimatedTaxes;
  const hourlyAfterTax = hoursNumber > 0 ? profitAfterTax / hoursNumber : 0;
  const revenuePerMile = milesNumber > 0 ? revenueNumber / milesNumber : 0;
  const profitPerMile = milesNumber > 0 ? profitAfterTax / milesNumber : 0;
  const expensePerMile = milesNumber > 0 ? totalExpensesBeforeTax / milesNumber : 0;

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", padding: "32px 16px", color: "#0f172a" }}>
      <section style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", color: "white", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "42px", margin: 0 }}>DoorDash True Profit Calculator</h1>
          <p style={{ color: "#cbd5e1", fontSize: "18px" }}>
            Estimate your real DoorDash profit after expenses and taxes.
          </p>
        </div>

        <div style={{ background: "white", borderRadius: "24px", padding: "24px" }}>
          <h2>Weekly Numbers</h2>

          <label>
            Revenue
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(cleanNumber(e.target.value))}
            />
          </label>

          <label>
            Hours Worked
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(cleanNumber(e.target.value))}
            />
          </label>

          <label>
            Miles Driven
            <input
              type="number"
              value={miles}
              onChange={(e) => setMiles(cleanNumber(e.target.value))}
            />
          </label>

          <label>
            MPG
            <input
              type="number"
              value={mpg}
              onChange={(e) => setMpg(cleanNumber(e.target.value))}
            />
          </label>

          <div style={{ marginTop: "24px" }}>
            <h2>Results</h2>

            <p>Profit After Tax: {formatMoney(profitAfterTax)}</p>
            <p>Hourly After Tax: {formatMoney(hourlyAfterTax)}</p>
            <p>Profit Per Mile: {formatMoney(profitPerMile)}</p>
            <p>Revenue Per Mile: {formatMoney(revenuePerMile)}</p>
            <p>Expense Per Mile: {formatMoney(expensePerMile)}</p>
          </div>
        </div>
      </section>
    </main>
  );
}