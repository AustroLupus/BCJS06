const http = require('http')

//Primero se crea el servidor
const app = http.createServer((req,res) =>{
    if (req.url=='/'){
        res.writeHead(200);
        res.end('Bienvenido a nuestra App')
    }else if(req.url=='/contacto'){
        res.writeHead(200);
        res.end(`
        <form>
            <label> Coloque su mail aqui</label>
            <input type="email">
            <input type="submit">
        </submit>
        `)
    }
})

//despues lo ejecutamos
const PORT = 3001
app.listen(PORT)
console.log(`Servidor andando en puerto ${PORT}`);