// rpc component acceso rapido
// vite es una manera de crear app con react

import React,{useEffect, useState} from 'react';
import {getCountries} from './services/countriesService.js';
import {getCities} from './services/citiesService.js';
import {getCityWeather } from "./services/weatherService";
import {getCityWeatherFuture} from "./services/weatherFutureService";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [weather, setWeather] = useState(null);
    const [tiempoFuturo, setTiempoFuturo] = useState();
    const [fechaActual, setFechaActual] = useState('');
    const [horaActual, setHoraActual] = useState('');
    useEffect(() => {
      // dispatch del servicio
      (async () => {
        // yo se que mi servicio me devuelve un array entonces lo guardo en setCountries
       // setCountries(await getCountries());
       // setCities(await getCities('AR'));
        setWeather(await getCityWeather('Buenos Aires'));
        setTiempoFuturo(await getCityWeatherFuture('Buenos Aires'));
      })();// funcion autoinvocada
    },[]);
    useEffect(() => {
      // Función para actualizar la fecha y la hora cada segundo
      const actualizarFechaYHora = () => {
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString('es-ES');
        const horaFormateada = fecha.toLocaleTimeString('es-ES');
        setFechaActual(fechaFormateada);
        setHoraActual(horaFormateada);
      };
  
      // Actualizar la fecha y la hora inicialmente
      actualizarFechaYHora();
  
      // Configurar un intervalo para actualizar la fecha y la hora cada segundo
      const intervalo = setInterval(actualizarFechaYHora, 1000);
  
      // Limpieza del intervalo cuando el componente se desmonta
      return () => clearInterval(intervalo);
     }, []);
  
    
    // cada vez que se seleccione un option obtengo el valor
    // es decir del evento seleccionar dame el value que selecciono
    /*
    const countryHandler = async e => {
      e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
      console.log(cities);
      setWeather(null);
     // setTiempoFuturo(null);


     // este es el componente renderizado que va abajo 
      <div>
        <div>
          <label>Elige un país:</label>
        </div>
       <select onChange={countryHandler}>
            <option value="">Selecciona</option>
            {countries.map(country => <option key={country.cca2} value={country.cca2}>{country.name.common}</option>)}
        </select>
        <hr />
      </div>
   }*/
  /*
   const cityHandler = async e =>{
    e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value));
    setTiempoFuturo(await getCityWeatherFuture('Avellaneda'));
    // renderizado de ciudad

     
      
      {cities.length > 0 && (
            <div>
              <div>
                <label>Elige una ciudad:</label>
              </div>
               
               <select onChange={cityHandler}>
                  <option value="">Selecciona</option>
                  {cities.map(city => <option key={city.id}>{city.name}</option>)}
               </select>
               <hr />
            </div>
      )}
   } */
   // Función para traducir las descripciones del clima
const traducirDescripcion = (descripcionEnIngles) => {
  switch (descripcionEnIngles) {
    case 'broken clouds':
      return 'Nubes rotas';
    case 'clear sky':
      return 'Cielo despejado';
    case 'few clouds':
      return 'Pocas nubes';
    case 'scattered clouds':
      return 'Nubes dispersas';
    case 'overcast clouds':
      return 'Nublado';
    case 'light rain':
      return 'Lluvia ligera';
    case 'moderate rain':
      return 'Lluvia moderada';
    case 'heavy intensity rain':
      return 'Lluvia intensa';
    case 'light snow':
      return 'Nieve ligera';
    case 'moderate snow':
      return 'Nieve moderada';
    case 'heavy snow':
      return 'Nieve intensa';
    case 'light shower snow':
      return 'Lluvia ligera de nieve';
    case 'shower snow':
      return 'Lluvia de nieve';
    case 'thunderstorm with light rain':
      return 'Tormenta con lluvia ligera';
    case 'thunderstorm with rain':
      return 'Tormenta con lluvia';
    case 'thunderstorm with heavy rain':
      return 'Tormenta con lluvia intensa';
    case 'thunderstorm':
      return 'Tormenta';
    case 'mist':
      return 'Niebla';
    default:
      return descripcionEnIngles;
  }
 };
 const formatearFechaHora = (timestamp) => {
  const fechaHora = new Date(timestamp * 1000); // Multiplica por 1000 para convertir a milisegundos
  const dia = fechaHora.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const hora = fechaHora.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${dia} ${hora}`;
 };
 const formatearFecha = (timestamp) => {
  const fecha = new Date(timestamp * 1000); // Multiplica por 1000 para convertir a milisegundos
  return fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatearHora = (timestamp) => {
  const hora = new Date(timestamp * 1000); // Multiplica por 1000 para convertir a milisegundos
  return hora.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

function obtenerDiaSemanaEnEspanol(dtTxt) {
  // Crear un objeto Date a partir de la cadena dtTxt
  const fecha = new Date(dtTxt);

  // Array con los nombres de los días de la semana en español
  const diasSemana = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  // Obtener el número del día de la semana (0 para Domingo, 1 para Lunes, ...)
  const numeroDiaSemana = fecha.getDay();

  // Obtener el nombre del día de la semana en español
  const diaSemanaEnEspanol = diasSemana[numeroDiaSemana];

  return diaSemanaEnEspanol;
}




const formatearTemperatura = (temperatura) => {
  const temperaturaFormateada = temperatura.toFixed(0); // Redondea a 0 decimales
  return `${temperaturaFormateada}°C`;
};
const redondearTemperatura = (temperatura) => {
  const temperaturaRedondeada = Math.ceil(temperatura); // Redondea al próximo entero
  return `${temperaturaRedondeada}°C`;
};


  return (
    <div class="container-fluid">
      <h1 class="text-center mb-5">Clima para Buenos Aires</h1>
      <div class="row justify-content-between align-start gap-2">
      {weather!==null && (
            <div class="col-sm-12 col-md-6">
              <div class="row shadow-lg p-3 mb-5 bg-tarjetas rounded position-sticky top-0 left-0">
                <div class="col-sm-12">
                  <p>Fecha y Hora: {fechaActual} - {horaActual} </p>
                  <h2>Temperatura Actual: {redondearTemperatura(weather.main.temp)}</h2>
                  <br />
                  <h3>Sensación Termica: {redondearTemperatura(weather.main.feels_like)}</h3>
                  <br />
                  <h5>Temp.Min: {redondearTemperatura(weather.main.temp_min.toFixed())}</h5>
                  <h5>Temp.Max: {redondearTemperatura(weather.main.temp_max.toFixed())}</h5>
                  <br />
                  <h5>Humedad: {weather.main.humidity}%</h5>
                </div>
                <div class="col-sm-12">
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
                </div>
            </div>
          </div>
      )}
      {tiempoFuturo!==null && (
         <div class="col-sm-12 col-md-5 shadow-lg bg-tarjetas p-3 mb-5 rounded">
         <h2 class="text-center">Temperatura proximos días</h2>
         <table class="table table-striped table-hover">
           <thead>
             <tr>
               <th colSpan="2" class="text-center" >Fecha - Hora</th>
               <th class="text-center" >Temperatura</th>
               <th colSpan="4" class="text-center" >Clima</th>
             </tr>
           </thead>
           <tbody>
             {tiempoFuturo &&
               tiempoFuturo.list.map((item, index, list) => (
                 <React.Fragment key={index}>
                   {index === 0 || formatearFecha(item.dt) !== formatearFecha(list[index - 1].dt) ? (
                     <tr>
                       <td colSpan="9">
                        <p class="text-center fw-bold fs-4">{obtenerDiaSemanaEnEspanol(item.dt_txt)}</p>
                        <hr />
                       </td>
                     </tr>
                   ) : null}
                   <tr >
                     <td class="table-primary">{formatearFecha(item.dt)}</td>
                     <td class="table-primary">{formatearHora(item.dt)}</td>
                     <td class="table-danger fw-bold text-center" >{redondearTemperatura(item.main.temp)}</td>
                     <td class="table-light text-center" >
                       <img
                         src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                         alt={item.weather[0].description}
                       />
                     </td>
                     <td class="table-success" colSpan="1">{traducirDescripcion(item.weather[0].description)}</td>
                   </tr>
                 </React.Fragment>
               ))}
           </tbody>
         </table>
       </div>
      )}

      </div>
    
   
    </div>
  )
}

export default App;
//https://restcountries.com/v3.1/all (api que trae todos los paises)
//https://restcountries.com/v3.1/name/{name} (api que trae un pais por nombre)
// api que trae ciudades del pais
//https://countriesnow.space/api/v0.1/countries/cities
//https://spott.p.rapidapi.com/places?limit=100&country=AR&type=CITY
//api para traer el clima de una ciudad
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric