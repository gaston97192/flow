# flow

Holaa equipo de flow!

Muchas gracias por darme la oportunidad de trabajar con ustedes :)

Aca les envio la prueba tecnica, estan los 3 endpoints desarrollados, los 3 devuelven lo que pide su enunciado,
consumiendo las api que mencionaron.

Trate de hacer todo con las sugerencias que habia en el pdf, use fastfy, node-fetch, eslint, etc

me quedo pendiente lo que es la parte de test y lo de openapi


============================================================================================================

PARA EJECUTAR EL PROYECTO

1- npm i

2- npm start

3- llamar a los endPoint desde el navegador

==============================================================================================================

Endpoints

http://localhost:3000/v1/location

http://localhost:3000/v1/current

http://localhost:3000/v1/forecast

A los 3 se le puede pasar ?ipDefault=true en caso de que ip-api no pueda obtener la ubicacion

current y forecast reciben el parametro city opcional

http://localhost:3000/v1/current/salta

http://localhost:3000/v1/forecast/cordoba

============================================================================================================

Estructura de directorios

En el root de la api  esta la carpeta config y el archivo .env, estos tiene todas las configuraciones.

esta la carpeta server que contiene un archivo con la clase Server que levanta el servidor

esta la carpeta routes que contiene un archivo por cada ruta

y por ultimo el index, que seria el entry point que instancia la clase server y lo levanta

============================================================================================================

En algunas ocaciones api-ip no encuentra mi ubicacion, me devuelve un objeto con todas las propiedades en null

Si estoy llegase a pasar agregar a la url ?ipDefault=true, este queryparam hace que se tome un ip por defecto


