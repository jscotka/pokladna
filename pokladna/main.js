var polozky = new Map();
//polozky.set("pivo_male", [30,0]);

function Plus(id)
    {
    var number = document.getElementById(id).value;
    number++;
    change_item_sum(id, number);
    }

function Minus(id)
    {
    var number = document.getElementById(id).value;
    if (number == 0) {
       return;
    }
    number--;
    change_item_sum(id, number);
    }

function change_item_sum(id,value)
    {
    var items = polozky.get(id);
    //console.log(id, polozky);
    // counter
    document.getElementById(id).value = value;
    // sum


    items[3] = value;
    polozky.set(id,items);
    document.getElementById(id + "_sum").textContent = items[2] * value;

    all_sum()
    }

function all_sum(){
    var sum = 0
    for (let [key, values] of polozky.entries()) {
        sum += values[2]*values[3]
    }
    var elem = document.getElementById("summarize");
    elem.textContent = sum
    return sum
}

function download(){
    var MIME_TYPE = "text/csv";
    var datum = new Date()
    var obj = Object.fromEntries(polozky);
    var jsonString = JSON.stringify(obj)
    var data = 'Datum: ' + String(datum)  + '\n' +
               'Suma: ' + String(all_sum()) + '\n'+
               jsonString + '\n';
    console.log(data)
    var blob = new Blob([data], {type: MIME_TYPE, name: "filee.csv"});
    window.location.href = window.URL.createObjectURL(blob);
}

function cleanItems(){
    var base = document.getElementById("polozky")
    while (base.firstChild) {
        base.removeChild(base.lastChild);
    }
}
function generateItem(key, values){
    var base = document.getElementById("polozky")
    var group = document.createElement("div");
    group.setAttribute("class", "pf-v5-c-input-group")
    var element1 = document.createElement("div");
    element1.setAttribute("class", "pf-v5-c-input-group__item")
    element1.setAttribute("name", key)
    console.log(key, values)

    var jmeno = document.createElement("span");
    jmeno.textContent = values[0]
    element1.appendChild(jmeno)

    var outeritem = document.createElement("span");
    outeritem.setAttribute("class", "pf-v5-c-form-control")
    var inputitem = document.createElement("input");
    inputitem.setAttribute("type", "number")
    inputitem.setAttribute("value", "0")
    inputitem.setAttribute("type", "number")
    inputitem.setAttribute("name", "number-input-default-name")
    inputitem.setAttribute("aria-label", "Number input")
    inputitem.setAttribute("id", key)
    outeritem.appendChild(inputitem)

    element1.appendChild(outeritem)
    // ----------------------------------
    var plus = document.createElement("div");
    plus.setAttribute("class", "pf-v5-c-input-group__item")

    var plusbutton = document.createElement("button");
    plusbutton.setAttribute("class", "pf-v5-c-button pf-m-primary")
    plusbutton.setAttribute("type", "button")
    plusbutton.setAttribute("onclick", "Plus('"+key+"')")

    var plusspan = document.createElement("span");
    plusspan.setAttribute("class", "pf-v5-c-button__icon pf-m-start")

    var plusi =  document.createElement("i");
    plusi.setAttribute("class", "fas fa-plus-circle")
    plusi.setAttribute("aria-hidden", "true")
    plusspan.appendChild(plusi)
    plusbutton.appendChild(plusspan)
    plus.appendChild(plusbutton)
    // ----------------------------------

    var minus = document.createElement("div");
    minus.setAttribute("class", "pf-v5-c-input-group__item")

    var minusbutton = document.createElement("button");
    minusbutton.setAttribute("class", "pf-v5-c-button pf-m-primary")
    minusbutton.setAttribute("type", "button")
    minusbutton.setAttribute("onclick", "Minus('"+key+"')")

    var minusspan = document.createElement("span");
    minusspan.setAttribute("class", "pf-v5-c-button__icon pf-m-start")

    var minusi =  document.createElement("i");
    minusi.setAttribute("class", "fas fa-minus-circle")
    minusi.setAttribute("aria-hidden", "true")
    minusspan.appendChild(minusi)
    minusbutton.appendChild(minusspan)
    minus.appendChild(minusbutton)
    // sum ---------------------------
    var sum = document.createElement("div");
    sum.setAttribute("class", "pf-v5-c-input-group__item")

    var sumspan = document.createElement("span");
    sumspan.setAttribute("id", key + "_sum")

    sum.appendChild(sumspan)
// --------------------------------------
    group.appendChild(element1)
    group.appendChild(plus)
    group.appendChild(minus)
    group.appendChild(sum)

    base.appendChild(group)

}

function generateList(){
    for (let [key, values] of polozky.entries()) {
        generateItem(key, values)
    }
}

function readFile(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
        var lines = e.target.result.split("\n")
        for (let i = 0; i < lines.length; i++) {
            line = lines[i]
            if (line.length < 3) {
                continue;
            }
            var items = line.split(";");
            polozky.set(items[0], [items[1], items[2], items[3], 0]);
    }
  }
  reader.readAsText(file)
  cleanItems()
  generateList()
}
