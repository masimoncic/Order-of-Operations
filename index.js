let logicSyms = ['~','&','|','->','==', '@'];




function findIndices(str) {
    for (let i=0; i < str.length; i++) {
        if(str[i] ==='(') {
            leftIndices.push(i);
        }
        if(str[i] ===')') {
            rightIndices.push(i);
        }
    }
    console.log(`left: ${leftIndices}, right: ${rightIndices}`);
}



function getPairs () {
    for (let i= leftIndices.length -1; i >= 0; i--) {
        for (let j = 0; j < rightIndices.length; j++) {
            if ((rightIndices[j] > leftIndices[i]) && !rightPaired[j] && !leftPaired[i]) {
                pairs.push([leftIndices[i], rightIndices[j]])
                rightPaired[j] = true;
                leftPaired[i] = true;
            }
        }
    }
}
/*
let testStr = '(a@((b@c)@(d@e)@f)@g)'
let ind = findIndices(testStr);
getPairs(ind);
console.log(leftIndices);
console.log(rightIndices);
console.log(pairs);
console.log(rightPaired)
console.log(leftPaired);
*/


function parsePar (str) {
    for (let i=0; i < pairs.length; i++) {
        let sub = str.slice(pairs[i][0], pairs[i][1] +1);
        subStrs.push(sub);
    }
}

const list = document.getElementById('list');

function createHTML(subStrs) {
    for (i=0; i < subStrs.length; i++) {
        let li = document.createElement('li');
        li.innerText = subStrs[i];
        list.appendChild(li);

    }
}




//const inStr = document.getElementById('htmlInput1Id');



function makeList () {
    const errMsg = document.getElementById('errMsg');
    let str = document.getElementById('htmlInput1Id').value;
    let leftIndices = [];
    let rightIndices = [];
    let rightPaired = new Array(rightIndices.length).fill(false);
    let leftPaired = new Array(rightIndices.length).fill(false);
    let pairs = [];
    let subStrs = []
    let ind = findIndices(str);
    if (!(rightIndices.length === leftIndices.length)) {
        errMsg.removeAttribute('hidden');
        return;
    }
    getPairs(ind);
    console.log(pairs);
    parsePar (str);
    createHTML(subStrs)
}

const button = document.getElementById('generateOOOId');
button.addEventListener('click', makeList);
