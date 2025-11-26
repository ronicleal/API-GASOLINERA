//1-Guardo en variables las url de provincia
const urlProvincias = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/"
const urlMunicipios = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/"
const urlGasolinerasProvincia = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/";
const urlGasolinerasMunicipio = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/";





//2-Funcion para cargar las provincias
async function cargarProvincias() {
    const respuesta = await fetch(urlProvincias);
    const datos = await respuesta.json();
    const selectProv = document.getElementById("provincia");

    datos.forEach(provincia => {
        const op = document.createElement("option");
        op.value = provincia.IDPovincia;
        op.textContent = provincia.Provincia;
        selectProv.appendChild(op);
    })
   
}

//3-Funcion para cargar los municipios
async function cargarMunicipios(idProvincia){
    const selectMun = document.getElementById("municipio");
    selectMun.innerHTML = "<option value=''>--Selecciona Municipio--</option>"; 

    if (!idProvincia) return;

    const respuesta = await fetch(`${urlMunicipios}${idProvincia}`);
    const datos = await respuesta.json();
    console.log(datos)
    

    datos.forEach(municipio => {
        const op = document.createElement("option");
        op.value = municipio.IDMunicipio;
        op.textContent = municipio.Municipio;
        selectMun.appendChild(op);
    })



}


//4-Funcion para filtrar gasolineras por provincia + municipio + combustible
async function buscarGasolineras() {
    const provincia = document.getElementById("provincia").value;
    const municipio = document.getElementById("municipio").value;
    const combustible = document.getElementById("combustible").value;
    const soloAbiertas = document.getElementById("abiertas").checked; 

    if (!municipio) return;


    const resp = await fetch(`${urlGasolinerasMunicipio}${(municipio)}`);
    const datos = await resp.json();
    let lista = datos.ListaEESSPrecio;

    // Filtrar por combustible
     if (combustible !== "todos") {
        lista = lista.filter(g => g[combustible] && g[combustible] !== "");
    }

    // Filtrar por abiertas 24h
    if (soloAbiertas) {
        lista = lista.filter(g => g.Horario.includes("24H"));
    }

     mostrarGasolineras(lista, combustible);
}




//5- Mostrar gasolineras en pantalla
function mostrarGasolineras(lista, combustible) {
    const cont = document.getElementById("lista");
    cont.innerHTML = "";

    if (lista.length === 0) {
        cont.innerHTML = "<p>No se encontraron gasolineras.</p>";
        return;
    }


    lista.forEach(g => {
        const precio = combustible === "todos" 
            ? "Varía según tipo" 
            : g[combustible] + " €/L";

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${g.Rótulo}</h3>
            <p><strong>Dirección:</strong> ${g.Dirección}</p>
            <p><strong>Localidad:</strong> ${g.Localidad}</p>
            <p><strong>Provincia:</strong> ${g.Provincia}</p>
            <p><strong>Horario:</strong> ${g.Horario}</p>
            <p class="precio"><strong>${combustible}:</strong> ${precio} €/L</p>
        `;

        cont.appendChild(card);
    });
}


//Eventos
document.getElementById("provincia").addEventListener("change", (e) =>{
    cargarMunicipios(e.target.value);
})

document.getElementById("buscar").addEventListener("click", buscarGasolineras);

//Cargar al inicio
cargarProvincias()