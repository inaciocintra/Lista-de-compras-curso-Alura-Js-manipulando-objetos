let listaDeItens = []
let itemAEditar

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados")

const listaRecuperada = localStorage.getItem('listaDeItens')

function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens)) // stringify transforma elementos em tipo String uma vez que no JSON é so string
}

// (valores omitidos, 0 , null, NaN, undefined, "", false) << retornam false
if(listaRecuperada){
 listaDeItens = JSON.parse(listaRecuperada)
 mostrarItem()
 //transforma em tipo JavaScript
}
else{
    listaDeItens = []
}

form.addEventListener("submit", function(evento){
    evento.preventDefault();
    salvarItem();
    mostrarItem();
    itensInput.focus();
})

function salvarItem(){
    const comprasItem = itensInput.value;
    const checarduplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase() );

    if(checarduplicado){
        alert("ja foi adicionado");
    }
   else{

       listaDeItens.push ({
           valor: comprasItem,
           checar: false
       })
    }
   itensInput.value = ' '
}

function mostrarItem(){
    ulItens.innerHTML = ' '
    ulItensComprados.innerHTML = ' '
    listaDeItens.forEach((elemento,index) => {
        if(elemento.checar){
            ulItensComprados.innerHTML += ` 
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li> `

        }else{

        
        ulItens.innerHTML += ` 
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index != itemAEditar ? 'disabled' : ''}> </input>
        </div>

        <div>
            ${index == itemAEditar ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `
        }
    })
    //eventos ao marcar a caixa
    const inputsCheck = document.querySelectorAll('input[type= "checkbox"]')
    inputsCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemnto = (evento.target.parentElement.parentElement.getAttribute('data-value'));
            listaDeItens[valorDoElemnto].checar = evento.target.checked;
            mostrarItem();
            console.log(listaDeItens[valorDoElemnto].checar);
        })
    })

    //deletar
    const deletarObjetos = document.querySelectorAll(".deletar")
    deletarObjetos.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemnto = (evento.target.parentElement.parentElement.getAttribute('data-value'));
            // listaDeItens.splice(valorDoElemnto,1, {valor: "Limão", checar: false}) irá subsituir por um objeto limao ao clicar no lixo
            listaDeItens.splice(valorDoElemnto,1);
            mostrarItem();
            
        })
    })

    const editarItens = document.querySelectorAll(".editar")

    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem();

            
        })
    })
    atualizaLocalStorage()            
}

function salvarEdicao (){
    const itemEditado = document.querySelector (`[data-value = "${itemAEditar}"] input[type = "text"]`)
    console.log(itemEditado.value);
    listaDeItens[itemAEditar].valor = itemEditado.value
    console.log(listaDeItens)
    itemAEditar = -1
    mostrarItem()
}