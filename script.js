// VARIABLES GLOBALES
let todasLasGasolineras = [];
let gasolinerasMunicipio = [];

//1) FUNCION PARA CARGAR TODAS LAS GASOLINERAS UNA SOLA VEZ
async function cargasTodas() {
    const url = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";
    const respuesta = await fetch(url);
    //Trasnformar la respuesta en un objeto JS
    const datos = await respuesta.json();
    //Guardo todas las gasolineras en una variable global
    todasLasGasolineras = datos.ListaEESSPrecio;

    console.log(todasLasGasolineras)
    cargarProvincias()
   
}

//2) FUNCION PARA CARGAR PROVINCIAS
function cargarProvincias(){
    const select = document.getElementById("provincia");

    const provincias = [...new Set(todasLasGasolineras.map(g => g.Provincia))].sort();

    provincias.forEach(p =>{
        const op = document.createElement("option");
        op.value = p;
        op.textContent = p;
        select.appendChild(op);

    });
}




// CARGAR TODO AL INICIO
cargasTodas()