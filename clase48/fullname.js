// primero importamos las dependencias
const child_process = require('child_process');


child_process.exec('node name.js', function (err, result1) {
    child_process.exec('node lastname.js', function (err2, result2) {
        const nom_completo=result1.trim()+' '+result2.trim()
        console.log(`El nombre es ${nom_completo}`);
    })
  })