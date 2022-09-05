
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => response.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" // Limpando as cidades quando selecionamos o estado.
    citySelect.disabled = true

    fetch(url)
        .then(response => response.json())
        .then(cities => {


            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover ou classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log("Item ID:", itemId)

    // Verificar se existem itens selecionados, se sim
    // Pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já estiver seleciondos tirar da seleção
    if (alreadySelected >= 0) {
        // Tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado adiconar a seleção
        // adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log("selectedItems: ", selectedItems)
    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}