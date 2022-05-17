const title = document.querySelector('#title')
const price = document.querySelector('#price')
const taxes = document.querySelector('#taxes')
const ads = document.querySelector('#ads')
const discount = document.querySelector('#discount')
const total = document.querySelector('#total')
const count = document.querySelector('#count')
const category = document.querySelector('#cat')
const btn = document.querySelector('#btn')
// console.log(title,price, taxes, ads, discount, count, category)
let mode = 'create'

let temp;

// calculate total

const calTotal = () =>{
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
        - +discount.value
        total.innerHTML = result
        total.style.background = "#040"
    } else {
        total.innerHTML = ''
        total.style.background = "#a00d02"
    }
}


//create data
let dataPro
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}

// dataPro = []
btn.addEventListener('click', function(e){
    e.preventDefault()
    const newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value, 
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100) {
    if (mode === 'create'){
    if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++){
            dataPro.push(newPro)
        }
        
    } else {
        dataPro.push(newPro)
    }
} else {
    dataPro[  temp ] = newPro
    mode = 'create'
    btn.innerHTML = 'Create'

count.style.display = 'block'

}
clearData()
}


    

    localStorage.setItem('product', JSON.stringify(dataPro ))
    console.log(newPro)
        
    
    clearData()
    showData()
})


//clear inputs
const clearData = () => {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read data: 
const showData = () => {
    calTotal()
    let table = ''
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        
        <td>${dataPro[i].category}</td>
        <td><button onclick = updatePro(${i}) id="update">Update</button></td>
        <td><button onclick = delPro(${i}) id="delete">Delete</button></td>
        
        </tr>
        `
    }
    // console.log(table)
    document.querySelector('#tbody').innerHTML = table
    let btnDel = document.querySelector('#delBtn')
    if(dataPro.length > 0){
        btnDel.innerHTML = `
        <button id="delBtn" onclick = "deleteAll()" >Delete All ( ${dataPro.length})</button>
        `
    } else {
        btnDel.innerHTML = ''
    }
}

showData()


//delete product: 
const delPro = (i) => {
    dataPro.splice (i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

//deleteAll Products:

const deleteAll = () => {
localStorage.clear()
dataPro.splice(0)
showData()
}

// Update product:
const updatePro = (i) => {
title.value = dataPro[i].title
price.value = dataPro[i].price
taxes.value = dataPro[i].taxes
ads.value = dataPro[i].ads
discount.value = dataPro[i].discount
calTotal()
category.value = dataPro[i].category
count.style.display = 'none'
btn.innerHTML = 'Update'

mode = 'update'

temp = i

scroll({
    top: 0,
    behavior: "smooth"
})

}

//Search and find product:
let  searchMode = 'title';

const getSearchMode = (id) => {

    const search = document.querySelector('#search')

if(id === 'searchTitle') {
    searchMode =  'title'
    search.placeholder = 'Search By Title'
} else {
    searchMode = 'category'
    
}
search.placeholder = 'Search By ' + searchMode

search.focus()

search.value = '';

showData()
}


function searchData(value){
    let table = ''

for(let i = 0; i < dataPro.length; i++){

if(searchMode === 'title'){

    if(dataPro[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        
        <td>${dataPro[i].category}</td>
        <td><button onclick = updatePro(${i}) id="update">Update</button></td>
        <td><button onclick = delPro(${i}) id="delete">Delete</button></td>
        
        </tr>
        `
    }


} else {
    for(let i = 0; i < dataPro.length; i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            
            <td>${dataPro[i].category}</td>
            <td><button onclick = updatePro(${i}) id="update">Update</button></td>
            <td><button onclick = delPro(${i}) id="delete">Delete</button></td>
            
            </tr>
            `
        }
    }
}

}
document.querySelector('#tbody').innerHTML = table
}

