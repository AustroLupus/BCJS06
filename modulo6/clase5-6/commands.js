const yargs = require('yargs');
const child_process = require('child_process');
const chalk = require('chalk')

yargs.command(
    'byn', //nombre del comando
    'Carga el proyecto de Black and White SpA', //descripcion
    {
        key: { //opciones
            describe: 'Llave para ejecutar el codigo',
            demand: true,
            alias: 'k'
        }
    },
    function (args) {
        const llave = args.key
        if (llave!='123'){
            console.log('Llave incorrecta')
            return
        }
        /* child_process.exec('node server.js 1 >> out.log',(err,out)=>{
            console.log(err)
        }) */
        child_process.exec('node server.js 1>>out.log', (err,out)=>{
            console.log(err)
            console.log(out)
        })
        console.log(chalk.bgRed('Hola'))
    }
).help().argv