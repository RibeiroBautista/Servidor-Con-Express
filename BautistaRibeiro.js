//const http = require('http')
const puerto = 8080;
const express = require('express');
const app = express();

const fs = require('fs')
function mostrarPrograma() {
    class Contenedor {
/* ------------------------------------------------------------------------------------------------------------------------ */
    constructor(FileName) {
        this.FileName = FileName
        fs.promises.writeFile(`./${FileName}`, '')
    }
/* ------------------------------------------------------------------------------------------------------------------------ */
    async save(objeto){

        let data = await fs.promises.readFile(`./${this.FileName}`, 'utf-8')
        if(!data) {
            objeto.id = 1
            const arr = [objeto]
            await fs.promises.writeFile(`./${this.FileName}`, JSON.stringify(arr))
            return objeto.id
        }else {
            data = JSON.parse(data)
            objeto.id = data.length + 1;
            data.push(objeto)
            await fs.promises.writeFile(`./${this.FileName}`, JSON.stringify(data))
            return objeto.id
        }

    }
    async getById(id){
        let data = await fs.promises.readFile(`./${this.FileName}`, 'utf-8')
        if(!data){
            return console.log('no datos en el array')
        }else {
            data = JSON.parse(data)
            const encontrado = data.find(alias => alias.id === id)
            return console.log(encontrado);
        }
    }

    async getAll(){
        let data = await fs.promises.readFile(`./${this.FileName}`, 'utf-8')
        if(!data){
            return console.log(data)
        }else {
            data = JSON.parse(data)
            const array = await data.map((e) => e)
            return array
        }
    }
    async deleteById(number) {
        let data = await fs.promises.readFile(`./${this.filename}`, "utf-8");

        if (data) {
            data = JSON.parse(data);

            data.forEach(element => {
                if (element.id == number) {
                    data.slice(number - 1, 1)
                }
            })

            return data;
        }
    }

    async deleteAll() {
        let data = await fs.promises.readFile(`./${this.filename}`, "utf-8");
        let longitud = data.length;

        if (data) {
            data.slice(0, longitud);
        }
    }
}

async function Main() {

    const productos = new Contenedor('productos.txt')
    
        productos.save(
        {
            title: "Parlantes con Microfono T20 RGB",
            price: 17540.69,
            thumbnail: 'https://pssevolutionforever.life/web/image/product.template/9411/image_1024?unique=80fbd7a'
        }).then(() => {
            productos.save(
                {
                    title: 'Mouse MK-503 Xtrike Me RGB',
                    price: 9645.23,
                    thumbnail: 'https://images.fravega.com/f300/a6aef034c39536e1e6482627fd039a0c.jpg.webp'
                }).then(() => {
                    productos.save(
                        {
                            title: "Teclado Logitech G-PRO-X RGB",
                            price: 14286.32,
                            thumbnail: 'https://resource.logitechg.com/w_1000,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/gaming/en/products/pro-x-keyboard/pro-x-keyboard-gallery-1.png?v=1'
                        }).then(()=>{
                            app.get('/productos', async(req, res) => {
                                const allProducts = await productos.getAll();
                                    if(allProducts.length === 0){
                                        res.send('no hay productos');
                                    }else{
                                        res.send(`
                                        <div style="
                                            background-color:lightblue;
                                            color: black;
                                            padding:10px ;
                                            text-align:center;
                                            height: 100px;
                                            width: auto;
                                            text-align: center;
                                        "
                                        >
                                            <p>${JSON.stringify(allProducts)}</p>
                                        </div>
                                        `)
                                    }
                            })
                            
                            app.get('/productosRandom', async(req, res) => {
                                const prodRandom = await productos.getAll();
                                if(prodRandom.length === 0){
                                    res.send('no hay productos');
                                }else{
                                    const random = Math.floor(Math.random() * prodRandom.length);
                                    res.send(`
                                        <div style="
                                        background-color:lightgreen;
                                        color: black;
                                        padding:10px ;
                                        text-align:center;
                                    ">
                                        <p>${JSON.stringify(prodRandom[random])}</p>
                                    </div>
                                    `);
                                }
                            })
                        })
                    })
                })
}
Main()

}
mostrarPrograma();

app.get('/', (req, res) => {
    res.send(`
    <div style="
        background-color:lightcoral;
        color: black;
        padding:10px ;
        text-align:center;
    "
    >
        <h1>Hola y Bienvenido a la página de Ribeiro Bautista</h1>
        <h2>Escribir "/productos" en la url para ver los productos disponibles</h2>
        <h2>Escribir "/productosRandom" en la url para ver uno de los productos al azar</h2>
    </div>
    <div>
    
    </div>
    `)
})

app.listen(puerto, ()=>{
    console.log(`escuchando al puerto ${puerto}`)
})