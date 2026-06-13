const baseUrl =
  "https://latest.currency-api.pages.dev/v1/currencies";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropDowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;

        let response = await fetch(URL);
        let data = await response.json();

        // Get exchange rate
        let rate =
            data[fromCurr.value.toLowerCase()][
                toCurr.value.toLowerCase()
            ];

        let finalAmt = amtVal * rate;

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(
            2
        )} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate";
        console.error(error);
    }
});