# Mapa de Restricciones de Movilidad en Centroamérica

## Descripción del Proyecto
Este proyecto es una aplicación web interactiva que visualiza las restricciones de movilidad implementadas en los países de Centroamérica (Guatemala, El Salvador, Honduras, Nicaragua, Costa Rica y Panamá) durante la pandemia de COVID-19. La plataforma permite explorar geográficamente las medidas restrictivas implementadas en diferentes fechas y regiones.

## Características Principales
- **Mapa Interactivo**: Visualización geográfica de restricciones utilizando Leaflet.js
- **Filtrado por Fecha**: Selector temporal para ver restricciones en fechas específicas
- **Información Detallada**: Datos específicos por país y región
- **Niveles de Restricción**: Codificación por colores según la severidad de las medidas
- **Panel de Control**: Interfaz intuitiva para navegar la información
- **Responsive Design**: Adaptado para dispositivos móviles y escritorio

## Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapas**: Leaflet.js + OpenStreetMap
- **Gráficos**: Chart.js
- **Datos**: GeoJSON y CSV
- **Despliegue**: GitHub Pages


## Cómo Funciona
1. **Carga de Datos**: La aplicación lee archivos GeoJSON con información geográfica y CSV con datos de restricciones.
2. **Renderizado del Mapa**: Leaflet.js crea el mapa base con capas de países.
3. **Interacción del Usuario**: 
   - Selección de fecha mediante un calendario
   - Clic en países para ver detalles
   - Cambio entre niveles de zoom
4. **Visualización de Datos**: 
   - Colores dinámicos según severidad de restricciones
   - Popups con información detallada
   - Gráficos temporales en el panel lateral

## Datos Utilizados
- **Fuentes**: Gobiernos nacionales, organizaciones de salud, datos oficiales
- **Formato**: GeoJSON para geometrías, CSV para series temporales
- **Actualización**: Periódica según disponibilidad de datos oficiales
- **Cobertura**: Todos los países de Centroamérica con desglose departamental/provincial



# Abrir index.html en un navegador



