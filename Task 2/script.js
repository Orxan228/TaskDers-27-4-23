let API_URL ="https://pokeapi.co/api/v2/pokemon/"
const wrapperInner = document.getElementById("wrapperInner")

fetch(API_URL).then(resp => resp.json()).then(data =>{
    data.forEach(pokemon => {
        wrapperInner += `
        `
    });
})