
function sumOrd(obj) {
  let sum = 0;
  for (let i = 0; i < obj.length; i++) {
    sum += parseInt(obj[i].Sold);
  }
  return sum;
}
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


var totalOrder = sumOrd(buyData);
document.getElementById("totalSales").innerHTML = totalOrder.toLocaleString('en-US');
console.log(totalOrder);

function totalIncomeByProduct(obj, prod, product) {
  let price = 0;
  product = "" + product;

  for (let i = 0; i < prod.length; i++) {
    if (prod[i].ProductID == product) {
      price = prod[i].UnitPrice;
    }
  }

  console.log(price);

  let sum = 0;
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].ProductID == product) {
      sum += parseInt(obj[i].Sold) * price;
    }
  }
  return sum;
}

let totalSum = 0;
for (let i = 0; i < Products.length; i++) {
  totalSum += totalIncomeByProduct(buyData, Products, Products[i].ProductID);
}
console.log(totalSum);

document.getElementById("totalIncome").innerHTML = formatter.format(totalSum);

// =CONCATENATE("{";"Account:";"'"; A2;"'";",";"AccountType:";"'"; B2;"',";"SalespersonID:";"'"; C2;"'";",";"OrderStatus:";"'"; D2;"'";",";"OrderDate:";"'"; E2;"'";",";"ProductID:";"'"; F2;"'";",";"Sold:";"'"; G2;"'";"},")
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Total Sales",
      backgroundColor: "#89d6d0",
      borderColor: "rgb(255, 99, 132)",
      data: [],
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    animation: {
        duration: 1000,
    },
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);
function addData(chart, data) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function getMonth(month) {
  return month[5] + month[6];
}

function updateChart(input) {
  let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < buyData.length; i++) {
    if (input == buyData[i].Account) {
      if (getMonth(buyData[i].OrderDate) == "01") {
        arr[0] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "02") {
        arr[1] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "03") {
        arr[2] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "04") {
        arr[3] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "05") {
        arr[4] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "06") {
        arr[5] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "07") {
        arr[6] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "08") {
        arr[7] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "09") {
        arr[8] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "10") {
        arr[9] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "11") {
        arr[10] += parseInt(buyData[i].Sold);
      } else if (getMonth(buyData[i].OrderDate) == "12") {
        arr[11] += parseInt(buyData[i].Sold);
      }
    }
  }
  arr.forEach((arr) => addData(myChart, arr));
}

document.getElementById("customers").addEventListener("change", function (evt) {
  evt.preventDefault();
  data.datasets[0].data = [];
  let e = document.getElementById("customers");
  let strUser = e.options[e.selectedIndex].text;
  updateChart(strUser);
  //console.log(myChart.data.datasets);
});


function topByRevenue(){

  for(let j = 0; j< salesPerson.length; j++) {
    let temp = 0;
    for(let i = 0; i < buyData.length; i++) {
      if(buyData[i].SalespersonID == salesPerson[j].id){
        for(let z = 0; z< Products.length;z++) {
        if(buyData[i].ProductID == Products[z].ProductID){
          temp += (buyData[i].Sold * Products[z].UnitPrice);
        console.log(temp);
        }
        }
      }
    }
    salesPerson[j]["topRev"] = temp;
    console.log(salesPerson[j]);
  }
  salesPerson.sort((a, b) => (a.topRev < b.topRev) ? 1 : -1);
  //console.log(salesPerson);
  const table = document.getElementById("topThreeEmplByIncome");

  const row1 = table.insertRow(1);
  const cell1 = row1.insertCell(0);
  const cell2 = row1.insertCell(1);
  const cell3 = row1.insertCell(2);

  cell1.innerHTML = salesPerson[0].id;
  cell2.innerHTML = salesPerson[0].Name;
  cell3.innerHTML = salesPerson[0].topRev;

  const row2 = table.insertRow(2);
  const cell4 = row2.insertCell(0);
  const cell5 = row2.insertCell(1);
  const cell6 = row2.insertCell(2);

  cell4.innerHTML = salesPerson[1].id;
  cell5.innerHTML = salesPerson[1].Name;
  cell6.innerHTML = salesPerson[1].topRev;


  const row3 = table.insertRow(3);
  const cell7 = row3.insertCell(0);
  const cell8 = row3.insertCell(1);
  const cell9 = row3.insertCell(2);

  cell7.innerHTML = salesPerson[2].id;
  cell8.innerHTML = salesPerson[2].Name;
  cell9.innerHTML = salesPerson[2].topRev;
}

function topBySales() {
  for(let j = 0; j< salesPerson.length; j++) {
    let temp = 0;
    for(let i = 0; i < buyData.length; i++) {
          if(salesPerson[j].id == buyData[i].SalespersonID){
            temp+= parseInt(buyData[i].Sold);
          }
          salesPerson[j]["sales"] = temp;
    }
  }
  salesPerson.sort((a, b) => (a.sales < b.sales) ? 1 : -1);
  const table = document.getElementById("topThreeEmpl");

  const row1 = table.insertRow(1);
  const cell1 = row1.insertCell(0);
  const cell2 = row1.insertCell(1);
  const cell3 = row1.insertCell(2);

  cell1.innerHTML = salesPerson[0].id;
  cell2.innerHTML = salesPerson[0].Name;
  cell3.innerHTML = salesPerson[0].sales;

  const row2 = table.insertRow(2);
  const cell4 = row2.insertCell(0);
  const cell5 = row2.insertCell(1);
  const cell6 = row2.insertCell(2);

  cell4.innerHTML = salesPerson[1].id;
  cell5.innerHTML = salesPerson[1].Name;
  cell6.innerHTML = salesPerson[1].sales;


  const row3 = table.insertRow(3);
  const cell7 = row3.insertCell(0);
  const cell8 = row3.insertCell(1);
  const cell9 = row3.insertCell(2);

  cell7.innerHTML = salesPerson[2].id;
  cell8.innerHTML = salesPerson[2].Name;
  cell9.innerHTML = salesPerson[2].sales;
}

let connn = topBySales();
let con = topByRevenue();



let sideMenu = document.querySelector("aside");
let menuBtn = document.querySelector("#menu-btn");
let closeBtn = document.querySelector("#close-btn");
let themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener('click', () => { 
  sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  sideMenu.style.display = 'none';
});

//CHANGE THEME

themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables');

  themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
  themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

