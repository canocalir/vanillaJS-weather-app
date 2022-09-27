const inputEl = document.querySelector("#input-1");
const input2 = document.querySelector("#input-2");
const btnDiv = document.querySelector(".btn");

let obj = {
  firstValue: 0,
  secondValue: 0,
  firstBoolen: false,
  secondBoolen: false,
};

btnDiv.addEventListener("click", (e) => {
  if (e.target.value == "AC") {
    inputEl.value = "";
  }
  if (e.target.value == "+-") {
    inputEl.value = -1 * inputEl.value;
  }

  if (e.target.classList.contains("number")) {
    inputEl.value += e.target.value;
    obj.firstValue = inputEl.value;
    // obj.firstBoolen=true;

    console.log(obj.firstValue)
  }

  if (
    e.target.value == "*" ||
    e.target.value == "/" ||
    e.target.value == "+" ||
    e.target.value == "-"
  ) {
    input2.value += e.target.classList.contains("number").value;
    obj.secondValue = input2.value;
    obj.firstBoolen = true;
    console.log(e.target.classList.contains("number").value)
    console.log(obj.secondValue);
  }

  //  else{}
  // if(e.target.classList.contains("number")) {
  //   inputEl.value += e.target.value
  //   obj.firstValue= inputEl.value
  //   obj.firstBoolen=true;

  //   console.log(obj.firstValue)
  // }
});
