let API_URL = "https://northwind.vercel.app/api/suppliers"
let addBtn = document.getElementById("addBtn")
const nameInp = document.getElementById("companyName")
const items = document.getElementById("items")
const searchInp = document.getElementById("search")
const editInp = document.getElementById("editInput")
const editSaveBtn = document.getElementById("editSaveBtn")
addBtn.addEventListener("click", function (e) {
    e.preventDefault()
    let nameValue = nameInp.value
    let product = {
        companyName: nameValue,
    }
    axios.post(API_URL, product).then(res => console.log(res))
    nameInp.value = ""
    renderList()
})

async function deleteProduct(id) {
    await axios.delete(`${API_URL}/${id}`)
    renderList()
}

function renderList() {
    axios.get(API_URL).then(res => {
        let html = ""
        for (let i = 0; i < res.data.length; i++) {
            const {
                id,
                companyName,
                contactName,
                contactTitle
            } = res.data[i]
            html += `
            <tr>
            <th scope="row">${id}</th>
            <td>${companyName}</td>
            <td>${contactName}</td>
            <td>${contactTitle}</td>
            <td>    <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onclick="editProduct(${id})"
            >
              Edit
            </button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button></td>
          </tr>
            `
        }
        items.innerHTML = html
    })
}
searchInp.addEventListener("keyup", function (e) {
    axios.get(API_URL).then(res => {
        let html = ""
        console.log(res.data)
        console.log(e.target.value)
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].companyName.includes(e.target.value)) {
                const {
                    id,
                companyName,
                contactName,
                contactTitle
            } = res.data[i]
            html += `
            <tr>
            <th scope="row">${id}</th>
            <td>${companyName}</td>
            <td>${contactName}</td>
            <td>${contactTitle}</td>
            <td>    <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onclick="editProduct(${id})"
            >
              Edit
            </button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${id})">Delete</button></td>
          </tr>
            `
        }
        }
        items.innerHTML = html
    })
})

function editProduct(id) {
    editInp.setAttribute("data-id", id)
    axios.get(`${API_URL}/${id}`).then(res => {
        editInp.value = res.data.companyName
    })
}
editSaveBtn.addEventListener("click", async function (e) {
    e.preventDefault()
    let targetId = editInp.getAttribute("data-id")
    let companyName = editInp.value
    let contactName = contactName
    let id = id
    let contactTitle = contactTitle
    await axios.put(`${API_URL}/${targetId}`, {
        companyName: companyName
    }).then(res => console.log(res))
    renderList()
})
renderList()