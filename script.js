//1-Guardo en variables las url de provincia
const urlProvincias = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/"
const urlMunicipios = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/"





//2-Funcion para cargar las provincias
async function cargarProvincias() {
    const respuesta = await fetch(urlProvincias);
    const datos = await respuesta.json();
    const select = document.getElementById("provincia");

    datos.forEach(provincia => {
        const op = document.createElement("option");
        op.value = provincia.IDPovincia;
        op.textContent = provincia.Provincia;
        select.appendChild(op);
    })
   
}

//3-Funcion para cargar los municipios
async function cargarMunicipios(idProvincia){
    

}



//Cargar al inicio
cargarProvincias()


//Eventos
document.getElementById("provincia").addEventListener("change")