import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

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
  const profitPerMile = milesNumber > 0 ? profitAfterTax / milesNumber : 0;
  const variableCostPerMile = milesNumber > 0 ? variableCosts / milesNumber : 0;
  const fixedCostPerMile = milesNumber > 0 ? fixedCosts / milesNumber : 0;

  const yearlyTakeHome = profitAfterTax * 52;
  const yearlyRevenue = revenueNumber * 52;

  const inputStyle = {
    width: "100%",
    padding: "12px 13px",
    border: "1px solid #cbd5e1",
    borderRadius: "14px",
    marginTop: "7px",
    fontSize: "16px",
    background: "#ffffff",
    boxShadow: "inset 0 1px 2px rgba(15,23,42,0.05)",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.96)",
    borderRadius: "28px",
    padding: "28px",
    boxShadow: "0 24px 70px rgba(0,0,0,0.22)",
    border: "1px solid rgba(226,232,240,0.9)",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 600,
    color: "#334155",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    borderBottom: "1px solid #e2e8f0",
    padding: "9px 0",
  };

  const detailStyle = {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "-3px",
    marginBottom: "8px",
  };

  const globalStyles = `
    * { box-sizing: border-box; }
    html, body { margin: 0; overflow-x: hidden; }
    input, button, table { max-width: 100%; }
    .article-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12) !important;
      border-color: #c7d2fe !important;
    }
    .soft-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
    }
    @media (max-width: 760px) {
      .page-shell { padding: 24px 10px !important; }
      .hero-pill { font-size: 12px; padding: 8px 12px !important; }
      .hero-title { font-size: 40px !important; line-height: 1.02 !important; letter-spacing: -0.035em !important; }
      .hero-subtitle { font-size: 16px !important; }
      .result-number { font-size: 38px !important; }
      .mobile-tight-card { padding: 18px !important; border-radius: 22px !important; }
      .mobile-stack { grid-template-columns: 1fr !important; gap: 18px !important; }
      .mobile-form-grid { grid-template-columns: 1fr !important; }
      .mobile-article-card { padding: 20px !important; border-radius: 22px !important; }
      .article-title { font-size: 30px !important; line-height: 1.12 !important; }
      .article-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      h1, h2, h3, p, strong, span { overflow-wrap: anywhere; }
    }
  `;

  if (activePage === "multiapp") {
    return (
      <main className="page-shell" style={{ minHeight: "100vh", background: "#0f172a", padding: "32px 16px", color: "#0f172a", overflowX: "hidden" }}>
        <style>{globalStyles}</style>
        <section style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button type="button" onClick={() => setActivePage("calculator")} style={{ marginBottom: "20px", background: "white", border: 0, borderRadius: "999px", padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>
            ← Back to calculator
          </button>
          <article className="mobile-article-card" style={{ ...cardStyle, padding: "36px" }}>
            <h1 className="article-title" style={{ marginTop: 0, marginBottom: "18px", fontSize: "40px", lineHeight: 1.1 }}>Some multi-app drivers earn up to 3x more — but at what cost?</h1>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Some drivers claim multi-apping completely changed their earnings. Others say it increased stress, mileage, distractions, and burnout so much that it stopped feeling worth it.
            </p>

            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              The confusing part is that both groups can be right at the same time. Some drivers dramatically increase revenue by reducing downtime and getting access to more orders. Others accidentally increase dead miles, stack inefficient routes, and create constant app-switching chaos.
            </p>

            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              The real question is not whether multi-apping increases gross revenue. The real question is whether the extra complexity actually improves after-expense hourly pay.
            </p>
            <div style={{ marginTop: "22px", background: "#f8fafc", borderRadius: "18px", padding: "18px", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", marginBottom: "12px" }}>Quick comparison</strong>
              <div className="article-table-wrap" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Metric</th>
                      <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Single-app</th>
                      <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Multi-app</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Downtime</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Higher</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Usually lower</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Stress level</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Lower</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Higher</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Mileage risk</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Usually lower</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Can rise quickly</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px" }}>Operational complexity</td>
                      <td style={{ padding: "10px" }}>Simple</td>
                      <td style={{ padding: "10px" }}>High</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "20px" }}>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "18px", padding: "18px" }}>
                <h3 style={{ marginTop: 0 }}>Single-app driver</h3>
                <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
                  Simpler workflow, fewer distractions, less app-switching stress, and often fewer miles. But slow periods can crush hourly earnings if there are not enough good orders.
                </p>
              </div>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "18px", padding: "18px" }}>
                <h3 style={{ marginTop: 0 }}>Multi-app driver</h3>
                <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
                  More order flow and less downtime, but potentially more miles, more stress, more decisions, and a higher chance of taking inefficient routes.
                </p>
              </div>
            </div>
            <div style={{ marginTop: "34px", background: "#eff6ff", borderRadius: "22px", padding: "24px", border: "1px solid #bfdbfe" }}>
              <h2 style={{ marginTop: 0 }}>What the research shows</h2>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                Gridwise Analytics reported that drivers who multi-app consistently earn more total weekly revenue than single-platform drivers because they reduce downtime and gain access to more order opportunities across apps. One Gridwise analysis found that some multi-app drivers earned up to 3x more weekly revenue than single-app drivers in certain markets and time periods.
              </p>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                However, higher revenue does not automatically mean higher profit after gas, taxes, maintenance, and vehicle depreciation. Multiple driver studies and interviews also found that multi-apping can increase stress, cognitive overload, and operational complexity if drivers constantly switch between apps or stack inefficient orders. Large gig-delivery companies also discourage poor multi-apping behavior because it can hurt on-time delivery metrics, customer experience, and contract violation risk if drivers manage multiple orders badly.
              </p>
            </div>

            <div style={{ marginTop: "40px", background: "#ecfccb", borderRadius: "22px", padding: "24px", border: "1px solid #bef264" }}>
              <strong style={{ display: "block", marginBottom: "6px", color: "#365314" }}>Bottom line</strong>
              <div style={{ color: "#365314", lineHeight: 1.7 }}>
                Multi-apping often increases gross revenue, but the highest earners are usually the drivers who control downtime without letting mileage, stress, and operational complexity spiral out of control.
              </div>
            </div>

            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>The key metric</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Compare profit per mile and hourly pay after expenses, not just gross earnings. A multi-app driver making more revenue can still keep less if mileage and vehicle costs rise too fast.
            </p>
          </article>
        </section>
      </main>
    );
  }

  if (activePage === "cherrypicker") {
    return (
      <main className="page-shell" style={{ minHeight: "100vh", background: "#0f172a", padding: "32px 16px", color: "#0f172a", overflowX: "hidden" }}>
        <style>{globalStyles}</style>
        <section style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button type="button" onClick={() => setActivePage("calculator")} style={{ marginBottom: "20px", background: "white", border: 0, borderRadius: "999px", padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>
            ← Back to calculator
          </button>
          <article className="mobile-article-card" style={{ ...cardStyle, padding: "36px" }}>
            <h1 className="article-title" style={{ marginTop: 0, fontSize: "36px", lineHeight: 1.12 }}>Cherry picking strategies: do low acceptance rates increase real profit?</h1>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Some drivers swear that aggressively rejecting low-paying orders completely transformed their profitability. Others say cherry picking destroyed their order flow and left them sitting in parking lots waiting for offers.
            </p>

            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              The frustrating reality is that the same strategy can work extremely well in one market and fail badly in another. Market density, wait times, competition, and order quality all change the outcome.
            </p>

            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              The real goal is not achieving a low acceptance rate. The goal is maximizing real after-expense hourly profit.
            </p>
            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>When cherry picking can work well</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              In dense markets with strong order volume, cherry pickers can sometimes maintain high hourly earnings while driving fewer miles and reducing unnecessary vehicle wear.
            </p>
            <div style={{ marginTop: "20px", background: "#f8fafc", borderRadius: "18px", padding: "18px", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", marginBottom: "12px" }}>Typical cherry-picking targets</strong>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
                <div style={{ background: "white", borderRadius: "14px", padding: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Target $/mile</div>
                  <strong>$1.50–$2.00+</strong>
                </div>
                <div style={{ background: "white", borderRadius: "14px", padding: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Primary goal</div>
                  <strong>Protect profit per mile</strong>
                </div>
                <div style={{ background: "white", borderRadius: "14px", padding: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Main risk</div>
                  <strong>Too much downtime</strong>
                </div>
              </div>
            </div>

            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>Potential downsides</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              However, in weaker suburban markets, aggressive cherry picking can also increase idle time and reduce total order volume enough to hurt overall earnings.
            </p>
            <div style={{ marginTop: "34px", background: "#eff6ff", borderRadius: "22px", padding: "24px", border: "1px solid #bfdbfe" }}>
              <h2 style={{ marginTop: 0 }}>What real-world driver studies found</h2>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                Real-world driver experiments found that cherry picking can improve profit per mile and reduce unnecessary vehicle wear by rejecting low-paying, high-mileage orders. Many experienced cherry pickers target roughly $1.50–$2.00+ per mile instead of focusing only on gross payout size.
              </p>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                Some drivers reported averaging around $28/hour active time while maintaining very low acceptance rates. However, other drivers found that aggressive cherry picking reduced order frequency, increased idle time, and hurt earnings in weaker suburban markets.
              </p>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                Most comparisons concluded that market density, wait times, scheduling access, and local order quality matter more than acceptance rate alone.
              </p>
            </div>

            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>The real answer</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              The better strategy is the one that produces higher after-expense hourly pay, not the one that looks better inside the app.
            </p>
          </article>
        </section>
      </main>
    );
  }

  if (activePage === "alcoholorders") {
    return (
      <main className="page-shell" style={{ minHeight: "100vh", background: "#0f172a", padding: "32px 16px", color: "#0f172a", overflowX: "hidden" }}>
        <style>{globalStyles}</style>
        <section style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button type="button" onClick={() => setActivePage("calculator")} style={{ marginBottom: "20px", background: "white", border: 0, borderRadius: "999px", padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>
            ← Back to calculator
          </button>
          <article className="mobile-article-card" style={{ ...cardStyle, padding: "36px" }}>
            <h1 className="article-title" style={{ marginTop: 0, fontSize: "36px", lineHeight: 1.12 }}>Are alcohol delivery orders worth it for gig drivers?</h1>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Alcohol orders can sometimes produce larger tips and higher payouts than normal food deliveries, especially during evenings, weekends, and sporting events. But they also introduce additional legal, safety, and operational risks.
            </p>

            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>Potential advantages</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Some drivers report that alcohol orders can improve earnings because order totals are often higher and customers may tip more generously. Alcohol deliveries can also remain busy during late-night hours when restaurant demand slows down.
            </p>

            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>Potential downsides</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Alcohol deliveries often require ID verification, customer interaction at the door, and additional compliance checks. Drivers may also face intoxicated customers, fake IDs, contract violation risk, or uncomfortable late-night situations.
            </p>

            <div style={{ marginTop: "34px", background: "#eff6ff", borderRadius: "22px", padding: "24px", border: "1px solid #bfdbfe" }}>
              <h2 style={{ marginTop: 0 }}>What studies and platform data show</h2>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                Multiple public-health and alcohol-delivery studies found that age verification failures remain a major issue in alcohol delivery. One 2025 mystery-shopping study reported that more than 80% of test alcohol deliveries were completed without proper ID verification.
              </p>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                A separate alcohol e-commerce compliance study found overall ID verification failure rates near 65% across multiple delivery and pickup methods. Researchers concluded that alcohol delivery platforms still face major compliance and safety challenges.
              </p>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                DoorDash and other delivery platforms have also publicly stated that alcohol orders require additional ID scanning, fake-ID detection, and intoxication checks because of the elevated legal and safety risks involved.
              </p>
            </div>

            <div style={{ marginTop: "34px", background: "#fee2e2", borderRadius: "22px", padding: "24px", border: "1px solid #fca5a5" }}>
              <strong style={{ display: "block", marginBottom: "8px", color: "#991b1b" }}>Higher-risk situations</strong>
              <ul style={{ color: "#991b1b", lineHeight: 1.8, paddingLeft: "20px", marginBottom: 0 }}>
                <li>Late-night apartment deliveries</li>
                <li>Customers who appear intoxicated</li>
                <li>ID mismatch situations</li>
                <li>Customers pressuring drivers to ignore app rules</li>
              </ul>
            </div>

            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>Ways drivers try to reduce risk</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Experienced drivers often avoid rushing alcohol deliveries, carefully verify IDs, avoid unsafe-feeling situations, and stay cautious during late-night deliveries. Some drivers also avoid alcohol orders entirely in certain neighborhoods or time windows.
            </p>

            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>The real question</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Alcohol deliveries may increase gross earnings for some drivers, but the additional stress, compliance burden, customer interaction, and legal exposure may not be worth the tradeoff for everyone.
            </p>
          </article>
        </section>
      </main>
    );
  }

  if (activePage === "grosspay") {
    return (
      <main className="page-shell" style={{ minHeight: "100vh", background: "#0f172a", padding: "32px 16px", color: "#0f172a", overflowX: "hidden" }}>
        <style>{globalStyles}</style>
        <section style={{ maxWidth: "900px", margin: "0 auto" }}>
          <button type="button" onClick={() => setActivePage("calculator")} style={{ marginBottom: "20px", background: "white", border: 0, borderRadius: "999px", padding: "10px 16px", fontWeight: 700, cursor: "pointer" }}>
            ← Back to calculator
          </button>
          <article className="mobile-article-card" style={{ ...cardStyle, padding: "36px" }}>
            <h1 className="article-title" style={{ marginTop: 0, fontSize: "36px", lineHeight: 1.12 }}>Why some drivers earn more gross pay but keep less after expenses</h1>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Gross earnings screenshots can be misleading because they ignore gas, depreciation, maintenance, insurance, phone costs, taxes, and unpaid repositioning miles.
            </p>
            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>Example</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Driver A earns $1,100 but drives 1,100 miles. Driver B earns $850 but drives 500 miles. Driver A may look better in the app, but Driver B may keep more profit after vehicle costs.
            </p>
            <div style={{ marginTop: "34px", background: "#eff6ff", borderRadius: "22px", padding: "24px", border: "1px solid #bfdbfe" }}>
              <h2 style={{ marginTop: 0 }}>What research shows</h2>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                Academic studies of rideshare and gig-work platforms found that gross earnings alone often fail to show real driver profitability. Driver outcomes can vary significantly based on trip distance, waiting time, location, time of day, unpaid repositioning, and post-dropoff earning opportunities.
              </p>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                One large rideshare productivity study analyzed more than 1.4 million trips and found that trip distance and downstream earning opportunities could meaningfully change driver productivity. In practical terms, two drivers can show similar gross earnings while keeping very different amounts after time, mileage, gas, and vehicle costs are considered.
              </p>
              <p style={{ color: "#1e3a8a", lineHeight: 1.7 }}>
                This is why real driver profitability should be measured with after-expense hourly pay, profit per mile, downtime, and vehicle costs — not app screenshots alone.
              </p>
            </div>

            <div style={{ marginTop: "22px", background: "#f8fafc", borderRadius: "18px", padding: "18px", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", marginBottom: "12px" }}>Gross pay vs real profitability example</strong>
              <div className="article-table-wrap" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Metric</th>
                      <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Driver A</th>
                      <th style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #cbd5e1" }}>Driver B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Weekly revenue</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>$1,100</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>$850</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>Miles driven</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>1,100</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>500</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px" }}>Likely take-home efficiency</td>
                      <td style={{ padding: "10px" }}>Potentially weaker</td>
                      <td style={{ padding: "10px" }}>Potentially stronger</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 style={{ marginTop: "36px", marginBottom: "14px", fontSize: "28px" }}>What to track instead</h2>
            <p style={{ color: "#475569", lineHeight: 1.9, marginBottom: "22px" }}>
              Track hourly after tax, profit per mile, total miles, dead miles, and vehicle costs. Those numbers reveal whether the work is actually profitable.
            </p>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #020617 0%, #0f172a 48%, #1e293b 100%)", padding: "32px 12px", color: "#0f172a", overflowX: "hidden" }}>
      <style>{globalStyles}</style>
      <section style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", color: "white", marginBottom: "36px" }}>
          <div className="hero-pill" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.16)", padding: "9px 16px", borderRadius: "999px", marginBottom: "18px", boxShadow: "0 12px 30px rgba(0,0,0,0.18)" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#22c55e", display: "inline-block" }} />
            DoorDash True Profit Calculator
          </div>
          <h1 className="hero-title" style={{ fontSize: "clamp(40px, 6vw, 68px)", lineHeight: 0.96, letterSpacing: "-0.05em", margin: 0, textShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>Most drivers overestimate their real pay.</h1>
          <p className="hero-subtitle" style={{ maxWidth: "720px", margin: "16px auto 0", color: "#cbd5e1", fontSize: "18px" }}>
            Calculate your real DoorDash profit after gas, depreciation, insurance, maintenance, phone costs, and taxes.
          </p>
          <div style={{ marginTop: "14px", display: "inline-block", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", padding: "10px 16px", borderRadius: "14px", color: "#e2e8f0", fontSize: "14px" }}>
            Gross earnings can look strong while vehicle costs quietly reduce real take-home pay.
          </div>
          <p style={{ maxWidth: "720px", margin: "16px auto 0", color: "#cbd5e1", fontSize: "18px" }}>
          </p>
        </div>

        <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px", alignItems: "start" }}>
          <div className="mobile-tight-card" style={cardStyle}>
            <h2 style={{ marginTop: 0, marginBottom: "6px", fontSize: "26px", letterSpacing: "-0.02em" }}>Enter your weekly numbers</h2>
            <p style={{ marginTop: 0, marginBottom: "22px", color: "#64748b", lineHeight: 1.6 }}>Use gross pay before subtracting gas, maintenance, taxes, or vehicle costs.</p>

            <div className="mobile-form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <label style={labelStyle}>Weekly gross earnings<input style={inputStyle} type="number" value={revenue} onChange={(e) => setRevenue(cleanNumber(e.target.value))} /></label>
              <label style={labelStyle}>Hours worked<input style={inputStyle} type="number" value={hours} step="0.5" onChange={(e) => setHours(cleanNumber(e.target.value))} /></label>
              <label style={labelStyle}>Miles driven<input style={inputStyle} type="number" value={miles} step="1" onChange={(e) => setMiles(cleanNumber(e.target.value))} /></label>
              <label style={labelStyle}>Vehicle fuel efficiency (MPG)<input style={inputStyle} type="number" value={mpg} step="0.1" onChange={(e) => setMpg(cleanNumber(e.target.value))} /></label>
            </div>

            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} style={{ marginTop: "18px", background: "transparent", border: 0, color: "#334155", textDecoration: "underline", fontWeight: 700, cursor: "pointer" }}>
              {showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
            </button>

            {showAdvanced && (
              <div className="mobile-form-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "16px" }}>
                <label style={labelStyle}>Gas price<input style={inputStyle} type="number" value={gasPrice} step="0.01" onChange={(e) => setGasPrice(cleanNumber(e.target.value))} /></label>
                <label style={labelStyle}>Monthly insurance payment<input style={inputStyle} type="number" value={insuranceMonthly} onChange={(e) => setInsuranceMonthly(cleanNumber(e.target.value))} /></label>
                <label style={labelStyle}>Yearly maintenance costs<input style={inputStyle} type="number" value={annualMaintenanceCost} step="100" onChange={(e) => setAnnualMaintenanceCost(cleanNumber(e.target.value))} /></label>
                <label style={labelStyle}>Vehicle purchase price<input style={inputStyle} type="number" value={purchasePrice} step="100" onChange={(e) => setPurchasePrice(cleanNumber(e.target.value))} /></label>
                <label style={labelStyle}>Expected resale value<input style={inputStyle} type="number" value={estimatedResaleValue} step="100" onChange={(e) => setEstimatedResaleValue(cleanNumber(e.target.value))} /></label>
                <label style={labelStyle}>Estimated annual miles<input style={inputStyle} type="number" value={annualMiles} step="100" onChange={(e) => setAnnualMiles(cleanNumber(e.target.value))} /></label>
                <label style={labelStyle}>Years used for delivery<input style={inputStyle} type="number" value={yearsUsed} step="1" onChange={(e) => setYearsUsed(cleanNumber(e.target.value))} /></label>
                <label style={labelStyle}>Monthly phone bill<input style={inputStyle} type="number" value={phoneMonthly} onChange={(e) => setPhoneMonthly(cleanNumber(e.target.value))} /></label>
              </div>
            )}

            <div style={{ background: "#f8fafc", borderRadius: "18px", padding: "18px", marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <strong>Estimated tax rate</strong>
                <strong>{taxRateNumber}%</strong>
              </div>
              <input type="range" value={taxRate} min="0" max="40" step="1" style={{ width: "100%" }} onChange={(e) => setTaxRate(cleanNumber(e.target.value))} />
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                Planning estimate only. Depreciation is estimated using purchase price, expected resale value, annual miles driven, and useful vehicle life.
              </p>
            </div>
          </div>

          <div>
            <div className="mobile-tight-card" style={{ ...cardStyle, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: hourlyAfterTax < 14 ? "#ef4444" : hourlyAfterTax < 20 ? "#f59e0b" : "#22c55e" }} />
              <p style={{ color: "#64748b", fontWeight: 800, textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.08em" }}>{showYearlyView ? "Estimated yearly take-home profit" : "Estimated hourly after-tax pay"}</p>
              <div className="result-number" style={{ fontSize: "52px", fontWeight: 950, letterSpacing: "-0.05em", lineHeight: 1 }}>{formatMoney(showYearlyView ? yearlyTakeHome : hourlyAfterTax)}</div>
              <p style={{ color: "#64748b" }}>{showYearlyView ? "After estimated vehicle costs and taxes." : "Your estimated real hourly pay after expenses and taxes."}</p>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button type="button" onClick={() => setShowYearlyView(false)} style={{ background: !showYearlyView ? "#0f172a" : "#e2e8f0", color: !showYearlyView ? "white" : "#0f172a", border: 0, borderRadius: "999px", padding: "8px 14px", cursor: "pointer", fontWeight: 700 }}>
                  Hourly
                </button>
                <button type="button" onClick={() => setShowYearlyView(true)} style={{ background: showYearlyView ? "#0f172a" : "#e2e8f0", color: showYearlyView ? "white" : "#0f172a", border: 0, borderRadius: "999px", padding: "8px 14px", cursor: "pointer", fontWeight: 700 }}>
                  Yearly
                </button>
              </div>
              {showYearlyView && (
                <div style={{ marginTop: "12px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "14px", padding: "14px", fontSize: "14px", color: "#1e3a8a" }}>
                  Based on your current weekly inputs, your estimated annual DoorDash revenue is <strong>{formatMoney(yearlyRevenue)}</strong> and projected annual take-home pay is <strong>{formatMoney(yearlyTakeHome)}</strong>.
                </div>
              )}
              <div style={{ marginTop: "14px", background: "#f8fafc", borderRadius: "18px", padding: "16px", fontSize: "14px", color: "#334155", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: 700 }}>
                  <span>💰 Gross earnings</span>
                  <span>{formatMoney(showYearlyView ? yearlyRevenue : revenueNumber)}</span>
                </div>

                <div style={{ height: "14px", background: "#e2e8f0", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${Math.min((totalExpensesBeforeTax / Math.max(revenueNumber,1)) * 100, 100)}%`, background: "#ef4444" }} />
                  <div style={{ flex: 1, background: "#22c55e" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginTop: "14px" }}>
                  <div style={{ background: "white", borderRadius: "14px", padding: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>⛽ Vehicle costs</div>
                    <strong style={{ color: "#dc2626" }}>{formatMoney(totalExpensesBeforeTax)}</strong>
                  </div>

                  <div style={{ background: "white", borderRadius: "14px", padding: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>✅ Real take-home</div>
                    <strong style={{ color: "#166534" }}>{formatMoney(showYearlyView ? yearlyTakeHome : profitAfterTax)}</strong>
                  </div>
                </div>

                <div style={{ marginTop: "16px", background: "white", borderRadius: "16px", padding: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", color: "#64748b", marginBottom: "10px", fontWeight: 700 }}>
                    <span>Where the money goes</span>
                    <span>{formatMoney(revenueNumber)} gross</span>
                  </div>
                  <div style={{ height: "18px", borderRadius: "999px", overflow: "hidden", display: "flex", background: "#e2e8f0" }}>
                    <div title="Gas" style={{ width: `${Math.min((gasCost / Math.max(revenueNumber, 1)) * 100, 100)}%`, background: "#f97316" }} />
                    <div title="Maintenance" style={{ width: `${Math.min((maintenance / Math.max(revenueNumber, 1)) * 100, 100)}%`, background: "#eab308" }} />
                    <div title="Depreciation" style={{ width: `${Math.min((depreciation / Math.max(revenueNumber, 1)) * 100, 100)}%`, background: "#ef4444" }} />
                    <div title="Taxes" style={{ width: `${Math.min((estimatedTaxes / Math.max(revenueNumber, 1)) * 100, 100)}%`, background: "#8b5cf6" }} />
                    <div title="Take-home" style={{ flex: 1, background: "#22c55e" }} />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px", fontSize: "11px", color: "#475569" }}>
                    <span>🟧 Gas</span><span>🟨 Maintenance</span><span>🟥 Depreciation</span><span>🟪 Taxes</span><span>🟩 Take-home</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginTop: "20px" }}>
                <div style={{ background: hourlyAfterTax < 14 ? "#fee2e2" : hourlyAfterTax < 20 ? "#fef3c7" : "#dcfce7", borderRadius: "16px", padding: "14px", border: hourlyAfterTax < 14 ? "2px solid #dc2626" : hourlyAfterTax < 20 ? "2px solid #d97706" : "2px solid #16a34a" }}>
                  <div style={{ color: "#64748b", fontSize: "13px" }}>
                    {showYearlyView ? "Annual earnings outlook" : "Weekly take-home"}
                  </div>
                  <strong>{formatMoney(showYearlyView ? yearlyTakeHome : profitAfterTax)}</strong>
                  <div style={{ marginTop: "6px", fontSize: "12px", fontWeight: 700, color: hourlyAfterTax < 14 ? "#991b1b" : hourlyAfterTax < 20 ? "#92400e" : "#166534" }}>
                    {showYearlyView
                      ? yearlyTakeHome < 40000
                        ? "Lower annual take-home than many drivers expect"
                        : yearlyTakeHome < 65000
                        ? "Moderate annual earnings"
                        : "Strong annual earnings"
                      : hourlyAfterTax < 14
                      ? "Lower than many drivers expect"
                      : hourlyAfterTax < 20
                      ? "Moderate earnings"
                      : "Strong earnings"}
                  </div>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: "16px", padding: "14px" }}><div style={{ color: "#64748b", fontSize: "13px" }}>Profit per mile</div><strong>{formatMoney(profitPerMile)}</strong><div style={{ marginTop: "5px", fontSize: "12px", color: "#64748b" }}>After estimated expenses and taxes</div></div>
              </div>
            </div>

            <div style={{ ...cardStyle, marginTop: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <h2 style={{ marginTop: 0, marginBottom: 0 }}>Advanced breakdown</h2>
                <button
                  type="button"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  style={{ background: "transparent", border: 0, color: "#334155", textDecoration: "underline", fontWeight: 700, cursor: "pointer" }}
                >
                  {showBreakdown ? "Hide breakdown" : "Show breakdown"}
                </button>
              </div>

              {showBreakdown && (
                <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <h2 style={{ marginTop: 0, marginBottom: "8px" }}>Cost breakdown</h2>
                <button type="button" onClick={() => setShowCostDetails(!showCostDetails)} style={{ background: "transparent", border: 0, color: "#334155", textDecoration: "underline", fontWeight: 700, cursor: "pointer" }}>
                  {showCostDetails ? "Hide explanations" : "Show explanations"}
                </button>
              </div>

              <div style={rowStyle}><span>Revenue</span><strong>{formatMoney(revenueNumber)}</strong></div>

              <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "12px", marginTop: "10px", marginBottom: "10px", border: "1px solid #e2e8f0" }}>
                <strong>Variable driving costs</strong>
                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>These usually rise as you drive more miles. Current variable cost: {formatMoney(variableCostPerMile)} per mile.</div>
              </div>

              <div style={rowStyle}><span>Gas</span><strong style={{ color: "#dc2626" }}>{formatMoney(-gasCost)}</strong></div>
              {showCostDetails && <div style={detailStyle}>Calculated from miles driven ÷ MPG × gas price. Gas price is editable in Advanced Settings.</div>}

              

              <div style={rowStyle}><span>Maintenance</span><strong style={{ color: "#dc2626" }}>{formatMoney(-maintenance)}</strong></div>
              {showCostDetails && <div style={detailStyle}>Yearly maintenance cost divided by estimated annual miles, then multiplied by weekly miles driven.</div>}

              <div style={rowStyle}><span>Depreciation</span><strong style={{ color: "#dc2626" }}>{formatMoney(-depreciation)}</strong></div>
              {showCostDetails && <div style={detailStyle}>Purchase price minus expected resale value, spread over estimated delivery miles during useful life.</div>}

              <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "12px", marginTop: "14px", marginBottom: "10px", border: "1px solid #e2e8f0" }}>
                <strong>Fixed weekly costs</strong>
                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>These do not usually rise just because revenue goes up. Current fixed cost: {formatMoney(fixedCosts)} per week, or {formatMoney(fixedCostPerMile)} per mile at your current mileage.</div>
              </div>

              <div style={rowStyle}><span>Insurance</span><strong style={{ color: "#dc2626" }}>{formatMoney(-weeklyInsurance)}</strong></div>
              {showCostDetails && <div style={detailStyle}>Monthly insurance payment divided by 4.33 weeks per month.</div>}

              <div style={rowStyle}><span>Phone/app costs</span><strong style={{ color: "#dc2626" }}>{formatMoney(-weeklyPhone)}</strong></div>
              {showCostDetails && <div style={detailStyle}>Monthly phone bill divided by 4.33 weeks per month.</div>}

              <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "12px", marginTop: "14px", marginBottom: "10px", border: "1px solid #e2e8f0" }}>
                <strong>Final earnings summary</strong>
                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Estimated remaining income after vehicle costs and taxes.</div>
              </div>

              <div style={rowStyle}><span>Profit before tax</span><strong>{formatMoney(profitBeforeTax)}</strong></div>

              <div style={rowStyle}><span>Estimated taxes</span><strong style={{ color: "#dc2626" }}>{formatMoney(-estimatedTaxes)}</strong></div>
              {showCostDetails && <div style={detailStyle}>Estimated using the selected effective tax rate.</div>}

                </div>
              )}
            </div>
            <div style={{ background: "rgba(255,255,255,0.96)", borderRadius: "28px", padding: "28px", marginTop: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.14)", border: "1px solid rgba(226,232,240,0.9)" }}>
              <div style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)", borderRadius: "22px", padding: "22px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", marginBottom: "10px" }}>What top drivers do differently</strong>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.7, marginBottom: "14px" }}>
                  Most drivers focus on gross earnings. Experienced drivers look at mileage, downtime, taxes, stress, and real take-home pay.
                </p>

                <div style={{ display: "grid", gap: "10px" }}>
                  <button className="article-card" type="button" onClick={() => setActivePage("multiapp")} style={{ textAlign: "left", background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #e2e8f0", fontSize: "15px", fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(15,23,42,0.06)", transition: "0.2s ease" }}>
                    Some multi-app drivers earn up to 3x more — but at what cost?
                  </button>

                  <button className="article-card" type="button" onClick={() => setActivePage("cherrypicker")} style={{ textAlign: "left", background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #e2e8f0", fontSize: "15px", fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(15,23,42,0.06)", transition: "0.2s ease" }}>
                    Cherry picking strategies: do low acceptance rates increase real profit?
                  </button>

                  <button className="article-card" type="button" onClick={() => setActivePage("grosspay")} style={{ textAlign: "left", background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #e2e8f0", fontSize: "15px", fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(15,23,42,0.06)", transition: "0.2s ease" }}>
                    Why some drivers earn more gross pay but keep less after expenses
                  </button>

                  <button className="article-card" type="button" onClick={() => setActivePage("alcoholorders")} style={{ textAlign: "left", background: "white", borderRadius: "16px", padding: "16px", border: "1px solid #e2e8f0", fontSize: "15px", fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(15,23,42,0.06)", transition: "0.2s ease" }}>
                    Are alcohol delivery orders worth the extra risk?
                  </button>
                </div>
              </div>
            </div>

            <div style={{ background: "#fffbeb", borderRadius: "24px", padding: "24px", marginTop: "24px" }}>
              <strong>Important note</strong>
              <p style={{ color: "#78350f", fontSize: "14px", marginTop: "10px" }}>
                This site is independent and is not affiliated with or endorsed by DoorDash.
              </p>
              <p style={{ color: "#78350f", fontSize: "14px" }}>
                This calculator is for planning and education. It is not tax, legal, insurance, or financial advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
