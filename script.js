const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sModelo = document.querySelector('#m-modelo')
const sMarca = document.querySelector('#m-marca')
const sTipo = document.querySelector('#m-tipo')
const sQuantidade = document.querySelector('#m-quantidade')
const sCondicao = document.querySelector('#m-condicao')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sModelo.value = itens[index].nome
    sMarca.value = itens[index].funcao
    sTipo.value = itens[index].tipo
    sQuantidade.value = itens[index].quantidade
    sCondicao.value = itens[index].condicao
    id = index
  } else {
    sModelo.value = ''
    sMarca.value = ''
    sTipo.value = ''
    sQuantidade.value = ''
  }
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.modelo}</td>
    <td>${item.marca}</td>
    <td>${item.tipo}</td>
    <td>${item.quantidade}</td>
    <td>${item.condicao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sModelo.value == '' || sMarca.value == '' || sTipo.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].modelo = sModelo.value
    itens[id].marca = sMarca.value
    itens[id].tipo = sTipo.value
    itens[id].quantidade = sQuantidade.value
    itens[id].condicao = sCondicao.value
  } else {
    itens.push({'nome': sModelo.value, 'funcao': sMarca.value, 'tipo': sTipo.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
