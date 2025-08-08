const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.querySelector(".result");

convertBtn.addEventListener("click", () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (from === to) {
    resultDiv.innerText = "Please select different currencies.";
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const converted = data.rates[to];
      resultDiv.innerText = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
    })
    .catch(() => {
      resultDiv.innerText = "Conversion failed. Try again.";
    });
});
// Currency codes to show in the marquee
function updateMarqueeRates() {
  const marquee = document.getElementById("live-rates");

  fetch("https://api.frankfurter.app/latest?from=INR")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const rates = data.rates;
      const supportedCurrencies = Object.keys(rates);
      
      let text = "💱 Live INR Exchange Rates: ";
      supportedCurrencies.forEach((currency) => {
        const value = rates[currency].toFixed(4);
        text += `1 INR = ${value} ${currency} | `;
      });

      marquee.textContent = text.slice(0, -2); // Remove trailing "|"
    })
    .catch((error) => {
      console.error("Error fetching exchange rates:", error);
      marquee.textContent = "❌ Failed to fetch live exchange rates.";
    });
}

window.addEventListener("DOMContentLoaded", updateMarqueeRates);
