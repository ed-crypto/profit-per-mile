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
  const variableCostPerMile = milesNumber > 0 ? variableCosts / milesNumber : 0;
  const fixedCostPerMile = milesNumber > 0 ? fixedCosts / milesNumber : 0;

  const yearlyTakeHome = profitAfterTax * 52;
  const yearlyRevenue = revenueNumber * 52;

  const inputStyle = { width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "10px", marginTop: "6px", boxSizing: "border-box" };
  const cardStyle = { background: "white", borderRadius: "24px", padding: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.18)" };
  const labelStyle = { fontSize: "14px", fontWeight: 600, color: "#334155" };
  const rowStyle = { display: "flex", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid #e2e8f0", padding: "9px 0" };
  const detailStyle = { fontSize: "12px", color: "#64748b", marginTop: "-3px", marginBottom: "8px" };

  if (activePage === "multiapp") {
    return (
      <main style={{ minHeight: "100vh", background: "#0f172a", padding: "32px 16px", color: "#0f172a" }}>
        <section style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button type="button" onClick={() => setActivePage("calculator")} style={{ marginBottom: "20px", background: "white", border: 0, borderRadius: "999px", padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>← Back to calculator</button>
          <article style={cardStyle}>
            <h1 style={{ marginTop: 0, fontSize: "36px" }}>Multi-app drivers vs single-app drivers: who actually keeps more?</h1>
            <p style={{ color: "#475569", lineHeight: 1.7 }}>Multi-apping can increase gross earnings and reduce downtime by giving drivers more order options. But it can also increase app-switching stress, decision fatigue, and the risk of inefficient routing if orders are not selected carefully. The winner is not always the driver with the highest weekly revenue.</p>
            <div style={{ marginTop: "22px", background: "#f8fafc", borderRadius: "18px", padding: "18px", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", marginBottom: "12px" }}>Quick comparison</strong>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead><tr><th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Metric</th><th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Single-app</th><th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Multi-app</th></tr></thead>
                  <tbody>
                    <tr><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Downtime</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Higher</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Usually lower</td></tr>
                    <tr><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Stress level</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Lower</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Higher</td></tr>
                    <tr><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Mileage risk</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Usually lower</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Can rise quickly</td></tr>
                    <tr><td style={{ padding: "10px" }}>Operational complexity</td><td style={{ padding: "10px" }}>Simple</td><td style={{ padding: "10px" }}>High</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "20px" }}>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "18px", padding: "18px" }}><h3 style={{ marginTop: 0 }}>Single-app driver</h3><p style={{ color: "#475569", lineHeight: 1.7 }}>Simpler workflow, fewer distractions, less app-switching stress, and often fewer miles. But slow periods can crush hourly earnings if there are not enough good orders.</p></div>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "18px", padding: "18px" }}><h3 style={{ marginTop: 0 }}>Multi-app driver</h3><p style={{ color: "#475569", lineHeight: 1.7 }}>More order flow and less downtime, but potentially more miles, more stress, more decisions, and a higher chance of taking inefficient routes.</p></div>
            </div>
            <div style={{ marginTop: "24px", background: "#eff6ff", borderRadius: "18px", padding: "18px", border: "1px solid #bfdbfe" }}><h2 style={{ marginTop: 0 }}>What the research shows</h2><p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>Gridwise Analytics reported that drivers who multi-app consistently earn more total weekly revenue than single-platform drivers because they reduce downtime and gain access to more order opportunities across apps. One Gridwise analysis found that some multi-app drivers earned up to 3x more weekly revenue than single-app drivers in certain markets and time periods.</p><p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>However, higher revenue does not automatically mean higher profit after gas, taxes, maintenance, and vehicle depreciation. Multi-apping can increase stress, cognitive overload, and operational complexity if drivers constantly switch between apps or stack inefficient orders.</p></div>
            <div style={{ marginTop: "22px", background: "#ecfccb", borderRadius: "18px", padding: "18px", border: "1px solid #bef264" }}><strong style={{ display: "block", marginBottom: "6px", color: "#365314" }}>Key takeaway</strong><div style={{ color: "#365314", lineHeight: 1.7 }}>Multi-apping often increases gross revenue, but the real winner is the driver with the strongest after-expense hourly pay and mileage efficiency.</div></div>
          </article>
        </section>
      </main>
    );
  }

  if (activePage === "cherrypicker") {
    return <ArticlePage title="Cherry picking strategies: do low acceptance rates increase real profit?" back={() => setActivePage("calculator")} cardStyle={cardStyle}>
      <p style={{ color: "#475569", lineHeight: 1.7 }}>Cherry picking is one of the most debated gig-delivery strategies. Some drivers aggressively reject low-paying, high-mileage orders to protect profit per mile, while others prioritize steady order flow and lower downtime.</p>
      <h2>When cherry picking can work well</h2><p style={{ color: "#475569", lineHeight: 1.7 }}>In dense markets with strong order volume, cherry pickers can sometimes maintain high hourly earnings while driving fewer miles and reducing unnecessary vehicle wear.</p>
      <div style={{ marginTop: "20px", background: "#f8fafc", borderRadius: "18px", padding: "18px", border: "1px solid #e2e8f0" }}><strong style={{ display: "block", marginBottom: "12px" }}>Typical cherry-picking targets</strong><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}><Metric label="Target $/mile" value="$1.50–$2.00+" /><Metric label="Primary goal" value="Protect profit per mile" /><Metric label="Main risk" value="Too much downtime" /></div></div>
      <h2>Potential downsides</h2><p style={{ color: "#475569", lineHeight: 1.7 }}>In weaker suburban markets, aggressive cherry picking can increase idle time and reduce total order volume enough to hurt overall earnings.</p>
      <div style={{ marginTop: "24px", background: "#eff6ff", borderRadius: "18px", padding: "18px", border: "1px solid #bfdbfe" }}><h2 style={{ marginTop: 0 }}>What real-world driver studies found</h2><p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>Real-world driver experiments found that cherry picking can improve profit per mile and reduce unnecessary vehicle wear by rejecting low-paying, high-mileage orders. Many experienced cherry pickers target roughly $1.50–$2.00+ per mile instead of focusing only on gross payout size.</p><p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>Some drivers reported averaging around $28/hour active time while maintaining very low acceptance rates. However, other drivers found that aggressive cherry picking reduced order frequency, increased idle time, and hurt earnings in weaker suburban markets.</p></div>
    </ArticlePage>;
  }

  if (activePage === "alcoholorders") {
    return <ArticlePage title="Are alcohol delivery orders worth it for gig drivers?" back={() => setActivePage("calculator")} cardStyle={cardStyle}>
      <p style={{ color: "#475569", lineHeight: 1.7 }}>Alcohol orders can sometimes produce larger tips and higher payouts than normal food deliveries, especially during evenings, weekends, and sporting events. But they also introduce additional legal, safety, and operational risks.</p>
      <h2>Potential advantages</h2><p style={{ color: "#475569", lineHeight: 1.7 }}>Some drivers report that alcohol orders can improve earnings because order totals are often higher and customers may tip more generously.</p>
      <h2>Potential downsides</h2><p style={{ color: "#475569", lineHeight: 1.7 }}>Alcohol deliveries often require ID verification, customer interaction at the door, and additional compliance checks. Drivers may also face intoxicated customers, fake IDs, contract violation risk, or uncomfortable late-night situations.</p>
      <div style={{ marginTop: "24px", background: "#eff6ff", borderRadius: "18px", padding: "18px", border: "1px solid #bfdbfe" }}><h2 style={{ marginTop: 0 }}>What studies and platform data show</h2><p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>Public-health and alcohol-delivery studies found that age verification failures remain a major issue in alcohol delivery. DoorDash and other delivery platforms require additional ID scanning, fake-ID detection, and intoxication checks because of the elevated legal and safety risks involved.</p></div>
      <div style={{ marginTop: "22px", background: "#fee2e2", borderRadius: "18px", padding: "18px", border: "1px solid #fca5a5" }}><strong style={{ display: "block", marginBottom: "8px", color: "#991b1b" }}>Higher-risk situations</strong><ul style={{ color: "#991b1b", lineHeight: 1.8, paddingLeft: "20px", marginBottom: 0 }}><li>Late-night apartment deliveries</li><li>Customers who appear intoxicated</li><li>ID mismatch situations</li><li>Customers pressuring drivers to ignore app rules</li></ul></div>
    </ArticlePage>;
  }

  if (activePage === "grosspay") {
    return <ArticlePage title="Why some drivers earn more gross pay but keep less after expenses" back={() => setActivePage("calculator")} cardStyle={cardStyle}>
      <p style={{ color: "#475569", lineHeight: 1.7 }}>Gross earnings screenshots can be misleading because they ignore gas, depreciation, maintenance, insurance, phone costs, taxes, and unpaid repositioning miles.</p>
      <h2>Example</h2><p style={{ color: "#475569", lineHeight: 1.7 }}>Driver A earns $1,100 but drives 1,100 miles. Driver B earns $850 but drives 500 miles. Driver A may look better in the app, but Driver B may keep more profit after vehicle costs.</p>
      <div style={{ marginTop: "24px", background: "#eff6ff", borderRadius: "18px", padding: "18px", border: "1px solid #bfdbfe" }}><h2 style={{ marginTop: 0 }}>What research shows</h2><p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>Academic studies of rideshare and gig-work platforms found that gross earnings alone often fail to show real driver profitability. Driver outcomes can vary significantly based on trip distance, waiting time, location, time of day, unpaid repositioning, and post-dropoff earning opportunities.</p></div>
      <div style={{ marginTop: "22px", background: "#f8fafc", borderRadius: "18px", padding: "18px", border: "1px solid #e2e8f0" }}><strong style={{ display: "block", marginBottom: "12px" }}>Gross pay vs real profitability example</strong><div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}><thead><tr><th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Metric</th><th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Driver A</th><th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Driver B</th></tr></thead><tbody><tr><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Weekly revenue</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>$1,100</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>$850</td></tr><tr><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Miles driven</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>1,100</td><td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>500</td></tr><tr><td style={{ padding: "10px" }}>Likely take-home efficiency</td><td style={{ padding: "10px" }}>Potentially weaker</td><td style={{ padding: "10px" }}>Potentially stronger</td></tr></tbody></table></div></div>
    </ArticlePage>;
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", padding: "32px 16px", color: "#0f172a" }}>
      <section style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", color: "white", marginBottom: "32px" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "999px", marginBottom: "16px" }}>DoorDash True Profit Calculator</div>
          <h1 style={{ fontSize: "42px", lineHeight: 1.05, margin: 0 }}>Are you actually making money?</h1>
          <p style={{ maxWidth: "720px", margin: "16px auto 0", color: "#cbd5e1", fontSize: "18px" }}>Estimate your real DoorDash profit after gas, insurance, maintenance, depreciation, phone costs, and taxes.</p>
          <div style={{ marginTop: "14px", display: "inline-block", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "10px 16px", borderRadius: "14px", color: "#e2e8f0", fontSize: "14px" }}>Many drivers overestimate take-home pay because they ignore taxes, depreciation, and vehicle wear.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <div style={cardStyle}>
            <h2 style={{ marginTop: 0 }}>Enter your weekly numbers</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <label style={labelStyle}>DoorDash revenue<input style={inputStyle} type="number" value={revenue} onChange={(e) => setRevenue(cleanNumber(e.target.value))} /></label>
              <label style={labelStyle}>Hours worked<input style={inputStyle} type="number" value={hours} step="0.5" onChange={(e) => setHours(cleanNumber(e.target.value))} /></label>
              <label style={labelStyle}>Miles driven<input style={inputStyle} type="number" value={miles} step="1" onChange={(e) => setMiles(cleanNumber(e.target.value))} /></label>
              <label style={labelStyle}>Vehicle MPG<input style={inputStyle} type="number" value={mpg} step="0.1" onChange={(e) => setMpg(cleanNumber(e.target.value))} /></label>
            </div>
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} style={{ marginTop: "18px", background: "transparent", border: 0, color: "#334155", textDecoration: "underline", fontWeight: 700, cursor: "pointer" }}>{showAdvanced ? "Hide advanced settings" : "Show advanced settings"}</button>
            {showAdvanced && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "16px" }}><label style={labelStyle}>Gas price<input style={inputStyle} type="number" value={gasPrice} step="0.01" onChange={(e) => setGasPrice(cleanNumber(e.target.value))} /></label><label style={labelStyle}>Monthly insurance payment<input style={inputStyle} type="number" value={insuranceMonthly} onChange={(e) => setInsuranceMonthly(cleanNumber(e.target.value))} /></label><label style={labelStyle}>Yearly maintenance costs<input style={inputStyle} type="number" value={annualMaintenanceCost} step="100" onChange={(e) => setAnnualMaintenanceCost(cleanNumber(e.target.value))} /></label><label style={labelStyle}>Vehicle purchase price<input style={inputStyle} type="number" value={purchasePrice} step="100" onChange={(e) => setPurchasePrice(cleanNumber(e.target.value))} /></label><label style={labelStyle}>Expected resale value<input style={inputStyle} type="number" value={estimatedResaleValue} step="100" onChange={(e) => setEstimatedResaleValue(cleanNumber(e.target.value))} /></label><label style={labelStyle}>Estimated annual miles<input style={inputStyle} type="number" value={annualMiles} step="100" onChange={(e) => setAnnualMiles(cleanNumber(e.target.value))} /></label><label style={labelStyle}>Years used for delivery<input style={inputStyle} type="number" value={yearsUsed} step="1" onChange={(e) => setYearsUsed(cleanNumber(e.target.value))} /></label><label style={labelStyle}>Monthly phone bill<input style={inputStyle} type="number" value={phoneMonthly} onChange={(e) => setPhoneMonthly(cleanNumber(e.target.value))} /></label></div>}
            <div style={{ background: "#f8fafc", borderRadius: "18px", padding: "18px", marginTop: "24px" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}><strong>Estimated tax rate</strong><strong>{taxRateNumber}%</strong></div><input type="range" value={taxRate} min="0" max="40" step="1" style={{ width: "100%" }} onChange={(e) => setTaxRate(cleanNumber(e.target.value))} /><p style={{ fontSize: "13px", color: "#64748b" }}>Planning estimate only. Depreciation is estimated using purchase price, expected resale value, annual miles driven, and useful vehicle life.</p></div>
          </div>

          <div>
            <div style={cardStyle}>
              <p style={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", fontSize: "13px" }}>{showYearlyView ? "Estimated yearly take-home profit" : "Estimated hourly after-tax pay"}</p>
              <div style={{ fontSize: "44px", fontWeight: 900 }}>{formatMoney(showYearlyView ? yearlyTakeHome : hourlyAfterTax)}</div>
              <p style={{ color: "#64748b" }}>{showYearlyView ? "After estimated vehicle costs and taxes." : "Your estimated real hourly pay after expenses and taxes."}</p>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}><button type="button" onClick={() => setShowYearlyView(false)} style={{ background: !showYearlyView ? "#0f172a" : "#e2e8f0", color: !showYearlyView ? "white" : "#0f172a", border: 0, borderRadius: "999px", padding: "8px 14px", cursor: "pointer", fontWeight: 700 }}>Hourly</button><button type="button" onClick={() => setShowYearlyView(true)} style={{ background: showYearlyView ? "#0f172a" : "#e2e8f0", color: showYearlyView ? "white" : "#0f172a", border: 0, borderRadius: "999px", padding: "8px 14px", cursor: "pointer", fontWeight: 700 }}>Yearly</button></div>
              {showYearlyView && <div style={{ marginTop: "12px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "14px", padding: "14px", fontSize: "14px", color: "#1e3a8a" }}>Based on your current weekly inputs, your estimated annual DoorDash revenue is <strong>{formatMoney(yearlyRevenue)}</strong> and projected annual take-home pay is <strong>{formatMoney(yearlyTakeHome)}</strong>.</div>}
              <div style={{ marginTop: "10px", background: "#f8fafc", borderRadius: "14px", padding: "12px", fontSize: "14px", color: "#334155", border: "1px solid #e2e8f0" }}>DoorDash shows gross earnings of <strong>{formatMoney(showYearlyView ? yearlyRevenue : revenueNumber)}</strong>, but after estimated expenses and taxes your projected take-home pay is <strong>{formatMoney(showYearlyView ? yearlyTakeHome : profitAfterTax)}</strong>.</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginTop: "20px" }}>
                <div style={{ background: hourlyAfterTax < 14 ? "#fee2e2" : hourlyAfterTax < 20 ? "#fef3c7" : "#dcfce7", borderRadius: "16px", padding: "14px", border: hourlyAfterTax < 14 ? "2px solid #dc2626" : hourlyAfterTax < 20 ? "2px solid #d97706" : "2px solid #16a34a" }}><div style={{ color: "#64748b", fontSize: "13px" }}>{showYearlyView ? "Annual earnings outlook" : "Weekly take-home"}</div><strong>{formatMoney(showYearlyView ? yearlyTakeHome : profitAfterTax)}</strong><div style={{ marginTop: "6px", fontSize: "12px", fontWeight: 700, color: hourlyAfterTax < 14 ? "#991b1b" : hourlyAfterTax < 20 ? "#92400e" : "#166534" }}>{showYearlyView ? yearlyTakeHome < 40000 ? "Lower annual take-home than many drivers expect" : yearlyTakeHome < 65000 ? "Moderate annual earnings" : "Strong annual earnings" : hourlyAfterTax < 14 ? "Lower than many drivers expect" : hourlyAfterTax < 20 ? "Moderate earnings" : "Strong earnings"}</div></div>
                <Metric label="Profit per mile" value={formatMoney(profitPerMile)} /><Metric label="Revenue per mile" value={formatMoney(revenuePerMile)} /><Metric label="Expense per mile" value={formatMoney(expensePerMile)} />
              </div>
            </div>

            <div style={{ ...cardStyle, marginTop: "24px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}><h2 style={{ marginTop: 0, marginBottom: 0 }}>Advanced breakdown</h2><button type="button" onClick={() => setShowBreakdown(!showBreakdown)} style={{ background: "transparent", border: 0, color: "#334155", textDecoration: "underline", fontWeight: 700, cursor: "pointer" }}>{showBreakdown ? "Hide breakdown" : "Show breakdown"}</button></div>{showBreakdown && <div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}><h2 style={{ marginTop: 0, marginBottom: "8px" }}>Cost breakdown</h2><button type="button" onClick={() => setShowCostDetails(!showCostDetails)} style={{ background: "transparent", border: 0, color: "#334155", textDecoration: "underline", fontWeight: 700, cursor: "pointer" }}>{showCostDetails ? "Hide explanations" : "Show explanations"}</button></div><div style={rowStyle}><span>Revenue</span><strong>{formatMoney(revenueNumber)}</strong></div><SectionLabel title="Variable driving costs" text={`These usually rise as you drive more miles. Current variable cost: ${formatMoney(variableCostPerMile)} per mile.`} /><CostRow label="Gas" value={-gasCost} money={formatMoney} rowStyle={rowStyle} />{showCostDetails && <div style={detailStyle}>Calculated from miles driven ÷ MPG × gas price.</div>}<CostRow label="Maintenance" value={-maintenance} money={formatMoney} rowStyle={rowStyle} />{showCostDetails && <div style={detailStyle}>Yearly maintenance cost divided by estimated annual miles, then multiplied by weekly miles driven.</div>}<CostRow label="Depreciation" value={-depreciation} money={formatMoney} rowStyle={rowStyle} />{showCostDetails && <div style={detailStyle}>Purchase price minus expected resale value, spread over estimated delivery miles during useful life.</div>}<SectionLabel title="Fixed weekly costs" text={`Current fixed cost: ${formatMoney(fixedCosts)} per week, or ${formatMoney(fixedCostPerMile)} per mile at your current mileage.`} /><CostRow label="Insurance" value={-weeklyInsurance} money={formatMoney} rowStyle={rowStyle} /><CostRow label="Phone/app costs" value={-weeklyPhone} money={formatMoney} rowStyle={rowStyle} /><SectionLabel title="Final earnings summary" text="Estimated remaining income after vehicle costs and taxes." /><div style={rowStyle}><span>Profit before tax</span><strong>{formatMoney(profitBeforeTax)}</strong></div><CostRow label="Estimated taxes" value={-estimatedTaxes} money={formatMoney} rowStyle={rowStyle} /></div>}</div>

            <div style={{ background: "white", borderRadius: "24px", padding: "24px", marginTop: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}><h3 style={{ marginTop: 0 }}>See what top DoorDash drivers do differently</h3><p style={{ color: "#64748b", fontSize: "14px" }}>Learn the strategies higher-earning drivers use to increase take-home pay, reduce taxes, lower vehicle costs, and avoid common profit-killing mistakes.</p><div style={{ display: "grid", gap: "12px", marginTop: "14px" }}><input type="text" placeholder="First name" style={inputStyle} /><input type="email" placeholder="Email address" style={inputStyle} /><div style={{ fontSize: "12px", color: "#64748b", marginBottom: "2px" }}>No spam. Unsubscribe anytime.</div><button style={{ background: "#0f172a", color: "white", border: 0, borderRadius: "14px", padding: "14px", fontWeight: 700, cursor: "pointer" }}>Show me what top drivers do differently</button></div><div style={{ marginTop: "22px", background: "#f8fafc", borderRadius: "18px", padding: "18px", border: "1px solid #e2e8f0" }}><strong style={{ display: "block", marginBottom: "10px" }}>Driver strategy breakdowns</strong><p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.7, marginBottom: "14px" }}>Learn how experienced drivers think about profitability, multi-apping, mileage efficiency, acceptance rates, and real take-home pay.</p><div style={{ display: "grid", gap: "10px" }}><PageButton onClick={() => setActivePage("multiapp")}>Multi-app drivers vs single-app drivers: who actually keeps more?</PageButton><PageButton onClick={() => setActivePage("cherrypicker")}>Cherry picking strategies: do low acceptance rates increase real profit?</PageButton><PageButton onClick={() => setActivePage("grosspay")}>Why some drivers earn more gross pay but keep less after expenses</PageButton><PageButton onClick={() => setActivePage("alcoholorders")}>Are alcohol delivery orders worth the extra risk?</PageButton></div></div></div>
            <div style={{ background: "#fffbeb", borderRadius: "24px", padding: "24px", marginTop: "24px" }}><strong>Important note</strong><p style={{ color: "#78350f", fontSize: "14px", marginTop: "10px" }}>This site is independent and is not affiliated with or endorsed by DoorDash.</p><p style={{ color: "#78350f", fontSize: "14px" }}>This calculator is for planning and education. It is not tax, legal, insurance, or financial advice.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return <div style={{ background: "#f1f5f9", borderRadius: "16px", padding: "14px" }}><div style={{ color: "#64748b", fontSize: "13px" }}>{label}</div><strong>{value}</strong></div>;
}

function SectionLabel({ title, text }) {
  return <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "12px", marginTop: "14px", marginBottom: "10px", border: "1px solid #e2e8f0" }}><strong>{title}</strong><div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{text}</div></div>;
}

function CostRow({ label, value, money, rowStyle }) {
  return <div style={rowStyle}><span>{label}</span><strong style={{ color: value < 0 ? "#dc2626" : "#0f172a" }}>{money(value)}</strong></div>;
}

function PageButton({ children, onClick }) {
  return <button type="button" onClick={onClick} style={{ textAlign: "left", background: "white", borderRadius: "12px", padding: "12px", border: "1px solid #e2e8f0", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>{children}</button>;
}

function ArticlePage({ title, children, back, cardStyle }) {
  return <main style={{ minHeight: "100vh", background: "#0f172a", padding: "32px 16px", color: "#0f172a" }}><section style={{ maxWidth: "900px", margin: "0 auto" }}><button type="button" onClick={back} style={{ marginBottom: "20px", background: "white", border: 0, borderRadius: "999px", padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>← Back to calculator</button><article style={cardStyle}><h1 style={{ marginTop: 0, fontSize: "36px" }}>{title}</h1>{children}</article></section></main>;
}
