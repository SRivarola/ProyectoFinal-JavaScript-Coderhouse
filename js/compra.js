let productos = JSON.parse(sessionStorage.getItem('productos'));
let precios = JSON.parse(sessionStorage.getItem('precios'));
let contador = 0;
let contadorDos = 0;
let subtotal = 0;
let precioParseado = [];

//Usando el modo oscuro o claro segun quedo fijado en la pagina principal.
let modo = JSON.parse(localStorage.getItem('modo'));
if (modo != '' && modo != null) {
    let agregarModo = document.getElementsByTagName('body')[0].classList.add(modo);
}


//Armando la tabla de productos segun los tenemos guardados en el storage.
for (item of precios) {
    precioParseado.push(Number(item));
    contadorDos = contadorDos + 1;
    const TR = document.createElement(`tr`);
    TR.classList.add(`tr${contadorDos}`);

    const TDPRECIO = document.createElement('td');
    TDPRECIO.innerText = `$${item}`;
    TDPRECIO.classList.add('precio');
    
    $('tbody').prepend(TR);
    $(`.tr${contadorDos}`).prepend(TDPRECIO);
}

for (let producto of productos) {
    contador = contador + 1;
    const TDNOMBRE = document.createElement('td');
    TDNOMBRE.innerHTML = producto;
    TDNOMBRE.classList.add('nombre');   
    
    $(`.tr${contador}`).prepend(TDNOMBRE);
}


precioParseado.forEach(function(a){subtotal += a;});
let precioTexto = document.getElementsByClassName('subtotal');
precioTexto[0].innerText = `$${subtotal}`;

total = subtotal * 1.21;
let precioTotalTexto = document.getElementsByClassName('total');
precioTotalTexto[0].innerHTML = `$${total}`

//Funcion para efectivizar la compra.
$('.finalizar').click(function procesar(e) {
    e.preventDefault();
    let contador3 = 0;
    let contador4 = 0;
    let nombre = $('#validationCustom01')[0].value;
    let apellido = $('#validationCustom02')[0].value;
    let direccion = $('#validationCustom03')[0].value;
    let cp = $('#validationCustom04')[0].value;
    let celular = $('#validationCustom05')[0].value;

    if (nombre != '' && apellido != '' && direccion != '' && cp != '' && celular != '') {
        if(celular.length == 10){
            const URLGET = 'https://jsonplaceholder.typicode.com/posts';
            let infoPost = { nombre, apellido, direccion, cp, celular}
            $.post(URLGET, infoPost, (response, state) => {
                if (state === 'success') {
                    $('main').append(`
                    <div class="textoApiF">
                        <div class="datosPersonales">
                            <h3>Nombre:${response.nombre} ${response.apellido}</h3>
                            <h3>Dirección:${response.direccion} ${response.cp}</h3>
                            <h3>Contacto: ${response.celular}
                        </div>
                        <div class="list">
                            <table class="table tablaFactura">
                                <thead>
                                    <tr>
                                        <th scope="col" class="producto">PRODUCTOS</th>
                                        <th class="precio" scope="col">PRECIOS</th>
                                    </tr>
                                </thead>
                                <tbody class="factura">
                                </tbody>
                                <tfoot>
                                <tr>
                                  <td class="textoTablaST">Subtotal:</td>
                                  <td class="subtotalF"></td>
                                </tr>
                                <tr>
                                  <th class="textoTablaT">TOTAL:</td>
                                  <th class="totalF"></td>
                                </tr>
                              </tfoot>
                            </table>
                        </div>
                    </div>
                    `)
                    for (item of precios) {
                        contador3 = contador3 + 1;
                        const TR = document.createElement(`tr`);
                        TR.classList.add(`trf${contador3}`);
                    
                        const TDPRECIO = document.createElement('td');
                        TDPRECIO.innerText = `$${item}`;
                        TDPRECIO.classList.add('precioP');
                        
                        $('.factura').prepend(TR);
                        $(`.trf${contador3}`).prepend(TDPRECIO);
                    }
                    
                    for (producto of productos) {
                        contador4 = contador4 + 1;
                        const TDNOMBRE = document.createElement('td');
                        TDNOMBRE.innerHTML = producto;
                        TDNOMBRE.classList.add('nombre');   
                        
                        $(`.trf${contador4}`).prepend(TDNOMBRE);
                    }
                    $('.subtotalF')[0].innerHTML = '$' + subtotal;
                    $('.totalF')[0].innerHTML = '$' + total;
                }
            })
            $('.finalizar').fadeOut(800);
            Swal.fire('Su compra se realizó correctamente.');
        } else {
            Swal.fire('El numero de celular no es correcto!');
        }
        
    } else {
        Swal.fire('Le faltan completar datos');
    }
});




  