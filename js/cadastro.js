//class que vai conter a logica 
export class cadastro{
    constructor(root){
        this.root = document.querySelector(root)

        this.load()
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem('@minhaLista:')) || []
    
        //O método JSON.parse() analisa uma string e retorna um objeto JavaScript.
    }

    save(){
        localStorage.setItem('@minhaLista:',JSON.stringify(this.entries))
    }

    delete(user){
        let myDelete = this.entries
        .filter(entry => entry.placa !== user.placa)

        this.entries = myDelete
        this.entries.splice(this.entries,0)

        this.update()
        this.save()
    }

    Preferred(){
        let vagasPreferred = ''

        this.check = document.querySelector('.toggle-input')

        for(i=0;i<this.check.length;i++){
            if(this.check[i].type == 'checkbox'){
                let isChecked = this.check[i].checked
                console.log(isChecked)
            }
        }
        // if(this.check){
        //     this.check.checked = false
        // }else{
        //     this.check.checked = true 
        // }
    }

}

//class que vai visualizar o HTML
export class cadastroView extends cadastro{
    constructor(root){
        super(root)
        this.tbody = this.root.querySelector('table tbody')
        // console.log(this.tbody)
        
        this.update()
        this.onadd()
    }

    onadd(){
        let btnAdicionar = this.root.querySelector('#idFormulario')
        btnAdicionar.addEventListener('submit',(e)=>{
            e.preventDefault()
                        
            let input1 = this.root.querySelector('#explicit-modelo')
            let input2 = this.root.querySelector('#explicit-placa')
            let n1 = (input1.value) 
            let n2 = (input2.value) 

            this.Preferred()
                        
            if(n1 == isNaN(n1) || n2 == isNaN(n2)){
                return alert('preencha todos os campos corretamente')
            }

            let userExists = this.entries.find(entry => entry.placa === n2)
            if(userExists){
                return alert('Usuario ja cadastrado')
            }

            let limitesVagas = this.entries.length
            if(limitesVagas > 12){
                return alert('Não há vagas')
            }

            let dados = new Object()
            dados.modelo = n1
            dados.placa = n2
            dados.hours = new Date().getHours()
            dados.seconds = new Date().getMinutes()
           
            this.entries.push(dados)

            
            this.save()
            this.update()
         })
    }

    update(){//function Adm
        this.romveTr()

        this.entries.forEach(user =>{
            // console.log(user)
            let row = this.createTr()
            row.getElementsByTagName('td')[0].innerHTML = user.modelo  
            row.getElementsByTagName('td')[1].innerHTML = user.placa 
            row.querySelector('td .minutos').innerHTML = user.hours
            row.querySelector('td .segundos').innerHTML = user.seconds
            row.querySelector('#remove').onclick = () =>{

                let isOk = confirm('Tem certeza que deseja deletar essa linha?')
                if(isOk){

                    this.delete(user)
                }
            }
            this.tbody.append(row)
        })
        
        
    }

    createTr(){
        let tr = document.createElement('tr')
        tr.innerHTML =
        `
            <td>gol</td>
            <td>gti-2000</td>
            <td>
                <span class="minutos">25</span>
                <span>:</span>
                <span class="segundos">00</span>            
            </td>

            <td>
                <button class="remove" id="remove">Finalizar</button>
            </td>
        `
        return tr
    }

    romveTr(){
        this.tbody.querySelectorAll('tr')
        .forEach((tr)=>{
            tr.remove()
        })
    }
    
}