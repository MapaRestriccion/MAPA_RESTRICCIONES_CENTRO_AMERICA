// =============================================
// CONSTANTES Y CONFIGURACIÓN GLOBAL
// =============================================

const CONFIG = {
    MAP: {
        CENTER: [-15.0, -60.0],
        ZOOM: 4,
        TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    COLORS: {
        LAYERS: {
            'layer000': '#4CAF50',
            'layer001': '#F44336',
            'layer002': '#2196F3',
            'layer003': '#00BCD4',
            'layer004': '#FF9800',
            'layer005': '#9C27B0',
            'layer006': '#795548'
        },
        BADGES: {
            'ambiental': 'bg-primary',
            'forestal': 'bg-primary',
            'Conservación': 'bg-primary',
            'hidrica': 'bg-danger',
            'Hídrica': 'bg-danger',
            'fauna': 'bg-success',
            'default': 'bg-secondary'
        }
    },
    COUNTRY_CENTERS: {
        "Belice": { center: [17.0, -88.0], zoom: 8 },
        "Chile": { center: [-35.0, -71.0], zoom: 5 },
        "Perú": { center: [-13.0, -74.0], zoom: 6 },
        "Colombia": { center: [4.0, -73.0], zoom: 6 },
        "Brasil": { center: [-10.0, -55.0], zoom: 5 },
        "México": { center: [19.0, -99.0], zoom: 5 },
        "Argentina": { center: [-40.0, -72.0], zoom: 5 },
        "Ecuador": { center: [-2.0, -44.0], zoom: 7 },
        "Bolivia": { center: [-17.0, -65.0], zoom: 6 },
        "Venezuela": { center: [8.0, -66.0], zoom: 6 },
        "Paraguay": { center: [-23.0, -58.0], zoom: 7 },
        "Uruguay": { center: [-33.0, -56.0], zoom: 8 },
        "Guyana": { center: [5.0, -58.0], zoom: 7 },
        "Surinam": { center: [4.0, -56.0], zoom: 7 },
        "Guayana Francesa": { center: [4.0, -53.0], zoom: 8 }
    }
};

// =============================================
// VARIABLES GLOBALES
// =============================================

let table;
let filteredData = [...restrictionsData];
let map;
let currentFeature = null;
let geojsonLayers = {};
let mapInitialized = false;
let currentRestriction = null;

// =============================================
// CLASE PRINCIPAL DE LA APLICACIÓN
// =============================================

class RestrictionsApp {
    constructor() {
        this.init();
    }

    init() {
        this.initializeTable();
        this.populateFilters();
        this.setupEventListeners();
        this.updateStats();
        // No inicializamos el mapa aquí, lo haremos cuando se active la pestaña
    }

    // =============================================
    // INICIALIZACIÓN DEL MAPA
    // =============================================

    initializeMap() {
        if (mapInitialized) return;

        map = L.map('map').setView(CONFIG.MAP.CENTER, CONFIG.MAP.ZOOM);

        // Capa base
        const osmLayer = L.tileLayer(CONFIG.MAP.TILE_LAYER, {
            attribution: CONFIG.MAP.ATTRIBUTION
        });
        osmLayer.addTo(map);

        // Agregar leyenda
        this.addLegend();

        // Evento para cuando se hace clic en el mapa
        map.on('click', () => {
            this.hideFeatureInfo();
        });

        mapInitialized = true;

        // Ocultar el indicador de carga del mapa
        $('#map-loading').fadeOut();
    }

    addLegend() {
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'legend');
            div.innerHTML = '<p>Mapa visualizar restricciones</p>';
            return div;
        };
        legend.addTo(map);
    }

    // =============================================
    // GESTIÓN DE CAPAS GEOJSON
    // =============================================
    async loadGeoJsonLayer(id, name, urls) {
        const color = "#3F51B5";
        try {
            // 🔹 Crear o mostrar overlay elegante
            let overlay = document.getElementById('loading-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'loading-overlay';
                Object.assign(overlay.style, {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(15, 23, 42, 0.75)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '999999',
                    backdropFilter: 'blur(8px)',
                    opacity: '0',
                    transition: 'opacity 0.3s ease'
                });

                // Container del contenido
                const container = document.createElement('div');
                Object.assign(container.style, {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '32px 48px',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    minWidth: '320px',
                    transform: 'scale(0.9)',
                    transition: 'transform 0.3s ease'
                });

                // Spinner mejorado con doble anillo
                const spinnerWrapper = document.createElement('div');
                spinnerWrapper.style.position = 'relative';
                spinnerWrapper.style.width = '60px';
                spinnerWrapper.style.height = '60px';

                const spinner1 = document.createElement('div');
                Object.assign(spinner1.style, {
                    position: 'absolute',
                    width: '60px',
                    height: '60px',
                    border: '3px solid rgba(255, 255, 255, 0.2)',
                    borderTop: '3px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
                });

                const spinner2 = document.createElement('div');
                Object.assign(spinner2.style, {
                    position: 'absolute',
                    width: '46px',
                    height: '46px',
                    top: '7px',
                    left: '7px',
                    border: '3px solid rgba(255, 255, 255, 0.1)',
                    borderBottom: '3px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '50%',
                    animation: 'spin 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse'
                });

                spinnerWrapper.appendChild(spinner1);
                spinnerWrapper.appendChild(spinner2);

                // Texto principal
                const text = document.createElement('div');
                text.id = 'loading-progress';
                Object.assign(text.style, {
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textAlign: 'center',
                    letterSpacing: '0.3px'
                });
                text.textContent = name;

                // Subtexto
                const subtext = document.createElement('div');
                Object.assign(subtext.style, {
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textAlign: 'center'
                });
                subtext.textContent = 'Cargando capas...';

                // Barra de progreso animada
                const progressBar = document.createElement('div');
                Object.assign(progressBar.style, {
                    width: '100%',
                    height: '3px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginTop: '8px'
                });

                const progressFill = document.createElement('div');
                Object.assign(progressFill.style, {
                    height: '100%',
                    width: '0%',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.5), #fff)',
                    borderRadius: '10px',
                    animation: 'progress 1.5s ease-in-out infinite'
                });

                progressBar.appendChild(progressFill);
                container.appendChild(spinnerWrapper);
                container.appendChild(text);
                container.appendChild(subtext);
                container.appendChild(progressBar);
                overlay.appendChild(container);
                document.body.appendChild(overlay);

                // 🔹 Agregar animaciones CSS
                if (!document.getElementById('spinner-style')) {
                    const style = document.createElement('style');
                    style.id = 'spinner-style';
                    style.textContent = `
                                @keyframes spin {
                                    from { transform: rotate(0deg); }
                                    to { transform: rotate(360deg); }
                                }
                                @keyframes progress {
                                    0% { width: 0%; margin-left: 0; }
                                    50% { width: 70%; margin-left: 15%; }
                                    100% { width: 0%; margin-left: 100%; }
                                }
                            `;
                    document.head.appendChild(style);
                }

                // Animación de entrada
                requestAnimationFrame(() => {
                    overlay.style.opacity = '1';
                    container.style.transform = 'scale(1)';
                });
            } else {
                overlay.style.display = 'flex';
                overlay.style.opacity = '1';
                document.getElementById('loading-progress').textContent = name;
            }

            // 🔹 Descargar GeoJSONs
            let allFeatures = [];

            // Asegurarse de que urls sea un array
            const urlsArray = Array.isArray(urls) ? urls : [urls];

            // Cargar cada GeoJSON
            for (const url of urlsArray) {
                console.log(url)
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Error al cargar el GeoJSON: ${response.statusText}`);
                    const data = await response.json();

                    // Agregar features al array
                    if (data.features) {
                        allFeatures = allFeatures.concat(data.features);
                    } else if (data.type === 'Feature') {
                        allFeatures.push(data);
                    }
                } catch (error) {
                    console.error(`Error cargando ${url}:`, error);
                    // Continuar con el siguiente URL aunque uno falle
                }
            }

            // Crear un GeoJSON combinado
            const combinedGeoJSON = {
                type: "FeatureCollection",
                features: allFeatures
            };

            const canvasRenderer = L.canvas({ padding: 0.5 });

            const layer = L.geoJSON(combinedGeoJSON, {
                renderer: canvasRenderer,
                style: {
                    color: color,
                    weight: 2,
                    fillOpacity: 0.3
                },
                onEachFeature: (feature, layer) => {
                    this.setupLayerInteraction(feature, layer, id);
                }
            }).addTo(map);

            // 🔹 Guardar referencia
            geojsonLayers[id] = {
                layer: layer,
                urls: urlsArray,
                color: color,
                visible: true,
                name: name
            };

            // 🔹 Mostrar capa
            layer.addTo(map);

            try {
                map.fitBounds(layer.getBounds(), { padding: [20, 20] });
            } catch (e) {
                console.error("Error al ajustar los límites de la capa:", e);
            }

            // 🔹 Ocultar overlay con animación
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);

            this.showNotification(`Capa "${name}" cargada correctamente`);
            return layer;

        } catch (error) {
            console.error('Error cargando capa:', error);
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            }
            this.showNotification(`Error al cargar la capa "${name}"`, true);
            throw error;
        }
    }

    setupLayerInteraction(feature, layer, id) {
        // Añadir popup con propiedades
        if (feature.properties) {
            let popupContent = '<div class="popup-content">';
            for (const key in feature.properties) {
                popupContent += `<div><strong>${key}:</strong> ${feature.properties[key]}</div>`;
            }
            popupContent += '</div>';
            layer.bindPopup(popupContent);
        }

        // Evento de clic en la capa
        layer.on('click', (e) => {
            const restriction = restrictionsData.find(r => r.id_layer === id);
            if (restriction) {
                this.showFeatureInfo(restriction);
            }

            // Resaltar la capa
            if (currentFeature) {
                this.resetFeatureStyle(currentFeature);
            }
            currentFeature = layer;
            this.highlightFeature(layer);
        });
    }

    // =============================================
    // GESTIÓN DE FILTROS
    // =============================================

    populateFilters() {
        this.updateFilterOptions('countryFilter', restrictionsData, 'pais');
        this.updateFilterOptions('typeFilter', restrictionsData, 'tipo_descrip');
        this.updateFilterOptions('eudrFilter', restrictionsData, 'eudr_cat');
        this.updateFilterOptions('cuantifyFilter', restrictionsData, 'cuantificable');
        this.updateFilterOptions('datasetFilter', restrictionsData, 'tipo_dataset');
        this.updateFilterOptions('processFilter', restrictionsData, 'tipo_geoproceso');
        this.updateFilterOptions('scaleFilter', restrictionsData, 'nivel_escala');
    }

    updateFilterOptions(filterId, data, property) {
        const select = document.getElementById(filterId);
        const currentValue = select.value;

        let values = [...new Set(data.map(item => item[property]))]
            .filter(value => value !== undefined && value !== null && value !== '')
            .sort();

        select.innerHTML = '<option value="">Todos</option>';
        values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });

        select.value = currentValue && values.includes(currentValue) ? currentValue : '';
    }

    updateAllFilters() {
        this.updateFilterOptions('countryFilter', filteredData, 'pais');
        this.updateFilterOptions('typeFilter', filteredData, 'tipo_descrip');
        this.updateFilterOptions('eudrFilter', filteredData, 'eudr_cat');
        this.updateFilterOptions('cuantifyFilter', filteredData, 'cuantificable');
        this.updateFilterOptions('datasetFilter', filteredData, 'tipo_dataset');
        this.updateFilterOptions('processFilter', filteredData, 'tipo_geoproceso');
        this.updateFilterOptions('scaleFilter', filteredData, 'nivel_escala');
    }

    applyFilters() {
        const filters = this.getCurrentFilters();

        filteredData = restrictionsData.filter(item => {
            return Object.keys(filters).every(key => {
                if (!filters[key].value) return true;

                switch (key) {
                    case 'search':
                        return this.matchesSearch(item, filters[key].value);
                    default:
                        return item[filters[key].property] === filters[key].value;
                }
            });
        });

        this.updateTable();
        this.updateStats();
        this.updateResultsCount();
        this.updateActiveFilters();
        this.toggleNoResults();
        this.updateAllFilters();
    }

    getCurrentFilters() {
        return {
            country: { value: $('#countryFilter').val(), property: 'pais' },
            type: { value: $('#typeFilter').val(), property: 'tipo_descrip' },
            eudr: { value: $('#eudrFilter').val(), property: 'eudr_cat' },
            cuantify: { value: $('#cuantifyFilter').val(), property: 'cuantificable' },
            dataset: { value: $('#datasetFilter').val(), property: 'tipo_dataset' },
            process: { value: $('#processFilter').val(), property: 'tipo_geoproceso' },
            scale: { value: $('#scaleFilter').val(), property: 'nivel_escala' },
            search: { value: $('#searchInput').val().toLowerCase() }
        };
    }

    matchesSearch(item, searchTerm) {
        if (!searchTerm) return true;

        const searchFields = [
            'pais', 'normativa_aplicable', 'descripcion_restriccion',
            'ip_restriccion', 'tipo_restriccion', 'nombre_del_dataset'
        ];

        return searchFields.some(field =>
            item[field] && item[field].toLowerCase().includes(searchTerm)
        );
    }

    resetFilters() {
        $('#countryFilter, #typeFilter, #eudrFilter, #cuantifyFilter, #datasetFilter, #processFilter, #scaleFilter, #searchInput').val('');

        filteredData = [...restrictionsData];
        this.updateTable();
        this.updateStats();
        this.updateResultsCount();
        this.updateActiveFilters();
        this.toggleNoResults();
        this.updateAllFilters();
    }

    // =============================================
    // GESTIÓN DE LA TABLA
    // =============================================

    initializeTable() {
        table = $('#restrictionsTable').DataTable({
            data: restrictionsData,
            columns: this.getTableColumns(),
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
            },
            pageLength: 10,
            lengthMenu: [5, 10, 25, 50],
            responsive: true,
            order: [[0, 'asc']],
            initComplete: () => {
                this.updateResultsCount();
            }
        });

        this.setupTableEventListeners();
    }

    getTableColumns() {
        return [
            {
                data: "pais",
                title: "País",
                render: (data) => `<span class="fw-bold">${data}</span>`
            },
            {
                data: "ip_restriccion",
                title: "ID Restricción",
                render: (data) => `<code class="bg-light">${data}</code>`
            },
            {
                data: "normativa_aplicable",
                title: "Norma Aplicable",
                render: (data, type, row) => {
                    if (row.enlace_norma && row.enlace_norma !== "") {
                        return `<a href="${row.enlace_norma}" target="_blank" class="text-decoration-none text-primary">${data}</a>`;
                    }
                    return data;
                }
            },
            {
                data: "descripcion_restriccion",
                title: "Restricción",
                render: (data) => data.length > 100 ? data.substring(0, 100) + '...' : data
            },
            {
                data: "tipo_restriccion",
                title: "Tipo",
                render: (data) => data
            },
            {
                data: "eudr_cat",
                title: "Categoría EUDR",
                render: (data) => data
            },
            {
                data: "nombre_del_dataset",
                title: "Dataset",
                render: (data, type, row) => {
                    if (!data || data === "") return "<span class='text-muted'>No especificado</span>";
                    if (row.enlace_dataset && row.enlace_dataset !== "") {
                        return `<a href="${row.enlace_dataset}" target="_blank" class="text-decoration-none text-info">${data}</a>`;
                    }
                    return data;
                }
            },
            {
                data: "tipo_analisis",
                title: "Tipo Analisis",
                render: (data) => {
                    if (!data || data === "") return "<span class='text-muted'>No especificado</span>";
                    return data.length > 50 ? data.substring(0, 50) + '...' : data;
                }
            },
            {
                data: null,
                title: "Acciones",
                orderable: false,
                render: (data, type, row) => this.getActionButtons(row)
            }
        ];
    }

    getActionButtons(row) {
        return `
                    <button class="btn btn-sm btn-outline-primary view-detail" data-id="${row.ip_restriccion}" title="Ver detalle">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success export-row" data-id="${row.ip_restriccion}" title="Exportar">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info view-on-map" data-country="${row.pais}" data-type="${row.tipo_restriccion}" data-id_layer="${row.id_layer}" data-id="${row.ip_restriccion}" title="Ver en mapa">
                        <i class="fas fa-map-marked-alt"></i>
                    </button>
                `;
    }

    setupTableEventListeners() {
        $('#restrictionsTable tbody')
            .on('click', '.view-detail', (e) => {
                const id = $(e.currentTarget).data('id');
                this.showDetailModal(id);
            })
            .on('click', '.export-row', (e) => {
                const id = $(e.currentTarget).data('id');
                this.exportRow(id);
            })
            .on('click', '.view-on-map', (e) => {
                const $target = $(e.currentTarget);
                const country = $target.data('country');
                const type = $target.data('type');
                const id_layer = $target.data('id_layer');
                const id = $target.data('id');
                $('#map-tab').tab('show');
                this.viewOnMap(country, type, id_layer, id);
            });
    }

    updateTable() {
        table.clear();
        table.rows.add(filteredData);
        table.draw();
    }

    // =============================================
    // GESTIÓN DE EVENTOS
    // =============================================

    setupEventListeners() {
        // Filtros
        $('#applyFilters').click(() => this.applyFilters());
        $('#resetFilters').click(() => this.resetFilters());
        $('#searchInput').on('keyup', () => this.applyFilters());
        $('#countryFilter, #typeFilter, #eudrFilter, #cuantifyFilter, #datasetFilter, #processFilter, #scaleFilter')
            .on('change', () => this.applyFilters());

        // Evento para cuando se active la pestaña del mapa
        $('#map-tab').on('shown.bs.tab', (e) => {
            if (!mapInitialized) {
                this.initializeMap();
            } else {
                // Si el mapa ya está inicializado, actualizamos su tamaño
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
        });

        // Tarjetas de estadísticas clickeables
        $('#totalRestrictionsCard').click(() => {
            this.resetFilters();
            $('#table-tab').tab('show');
        });

        $('#highEudrCard').click(() => {
            this.resetFilters();
            $('#eudrFilter').val('true');
            $('#table-tab').tab('show');
            this.applyFilters();
        });

        $('#protectedAreasCard').click(() => {
            this.resetFilters();
            $('#typeFilter').val('ambiental');
            $('#table-tab').tab('show');
            this.applyFilters();
        });

        $('#waterBuffersCard').click(() => {
            this.resetFilters();
            $('#typeFilter').val('hidrica');
            $('#table-tab').tab('show');
            this.applyFilters();
        });
    }

    // =============================================
    // ESTADÍSTICAS Y UI
    // =============================================

    updateStats() {
        const total = filteredData.length;
        const eudr = filteredData.filter(item => item.eudr_cat).length;
        const environmental = filteredData.filter(item =>
            item.tipo_restriccion.includes('ambiental') ||
            item.tipo_restriccion.includes('forestal') ||
            item.tipo_restriccion.includes('Conservación')
        ).length;
        const water = filteredData.filter(item =>
            item.tipo_restriccion.includes('hidrica') ||
            item.tipo_restriccion.includes('Hídrica')
        ).length;

        $('#totalRestrictions').text(total);
        $('#highEudr').text(eudr);
        $('#protectedAreas').text(environmental);
        $('#waterBuffers').text(water);
    }

    updateResultsCount() {
        $('#resultsCount').text(`${filteredData.length} resultados`);
    }

    updateActiveFilters() {
        const filters = this.getCurrentFilters();
        let badgesHtml = '';
        let hasActiveFilters = false;

        const badgeConfig = {
            country: { icon: 'fa-globe-americas', text: (val) => val },
            type: { icon: 'fa-layer-group', text: (val) => val },
            eudr: { icon: 'fa-leaf', text: (val) => `EUDR ${val === "true" ? "Sí" : "No"}` },
            cuantify: { icon: 'fa-check-circle', text: (val) => `Cuantificable ${val}` },
            dataset: { icon: 'fa-database', text: (val) => val },
            process: { icon: 'fa-cogs', text: (val) => val },
            scale: { icon: 'fa-ruler', text: (val) => val },
            search: { icon: 'fa-search', text: (val) => `"${val}"` }
        };

        Object.keys(filters).forEach(key => {
            if (filters[key].value) {
                const config = badgeConfig[key];
                badgesHtml += `<span class="filter-badge" data-filter="${key}">
                            <i class="fas ${config.icon}"></i> ${config.text(filters[key].value)}
                        </span>`;
                hasActiveFilters = true;
            }
        });

        $('#filterBadges').html(badgesHtml);
        $('#activeFilters').toggle(hasActiveFilters);

        $('.filter-badge').on('click', (e) => {
            const filterType = $(e.currentTarget).data('filter');
            $(`#${filterType}Filter`).val('');
            this.applyFilters();
        });
    }

    toggleNoResults() {
        const hasResults = filteredData.length > 0;
        $('#noResults').toggle(!hasResults);
        $('.table-responsive').toggle(hasResults);
    }

    // =============================================
    // FUNCIONALIDADES DEL MAPA
    // =============================================

    showFeatureInfo(restriction) {
        const content = `
                    <strong>${restriction.descripcion_restriccion}</strong><br>
                    <strong>País:</strong> ${restriction.pais}<br>
                    <strong>Tipo:</strong> ${restriction.tipo_restriccion}<br>
                    <strong>ID:</strong> ${restriction.ip_restriccion}<br>
                    <button class="btn btn-sm btn-primary mt-2" onclick="app.viewOnMap('${restriction.pais}', '${restriction.tipo_restriccion}', '${restriction.id_layer}', '${restriction.ip_restriccion}')">Ver en Mapa</button>
                    <button class="btn btn-sm btn-outline-primary mt-2 ms-1" onclick="app.showDetailForId('${restriction.ip_restriccion}')">Ver Detalle</button>
                `;
        $('#featureContent').html(content);
        $('#featureInfo').show();
    }

    hideFeatureInfo() {
        $('#featureInfo').hide();
        if (currentFeature) {
            this.resetFeatureStyle(currentFeature);
            currentFeature = null;
        }
    }

    showDetailForId(id) {
        const item = restrictionsData.find(row => row.ip_restriccion === id);
        if (item) {
            this.showDetailModal(item.ip_restriccion);
        }
    }

    resetFeatureStyle(feature) {
        feature.setStyle({
            color: feature.options.color,
            weight: 2,
            fillOpacity: 0.3
        });
    }

    highlightFeature(feature) {
        feature.setStyle({
            weight: 5,
            color: '#e74c3c',
            fillOpacity: 0.9
        });
    }

    async viewOnMap(country, type, id_layer, restrictionId) {
        // Cerrar modal si está abierto
        const detailModal = document.getElementById('detailModal');
        const modalInstance = bootstrap.Modal.getInstance(detailModal);
        if (modalInstance) {
            modalInstance.hide();
        }

        $('#map-tab').tab('show');

        // Esperar a que la pestaña del mapa se muestre
        setTimeout(async () => {
            // Buscar la restricción correspondiente
            const restriction = restrictionsData.find(row => row.ip_restriccion === restrictionId);


            if (restriction && restriction.id_layer && restriction.url_geojson) {
                try {
                    // 🔹 LIMPIAR el mapa antes de agregar la nueva capa
                    for (const key in geojsonLayers) {
                        const layerInfo = geojsonLayers[key];
                        if (layerInfo.visible) {
                            map.removeLayer(layerInfo.layer);
                            layerInfo.visible = false;
                        }
                    }

                    // Verificar si la capa ya está cargada
                    if (!geojsonLayers[restriction.id_layer]) {
                        // Cargar la capa con el array de URLs
                        await this.loadGeoJsonLayer(
                            restriction.id_layer,
                            //restriction.entregable || restriction.nombre_del_dataset,
                            restriction.entregable,
                            restriction.url_geojson // Ahora es un array
                        );
                    }

                    // Mostrar y ajustar el mapa a la nueva capa
                    const layerInfo = geojsonLayers[restriction.id_layer];
                    if (!map.hasLayer(layerInfo.layer)) {
                        layerInfo.layer.addTo(map);
                        layerInfo.visible = true;
                    }

                    try {
                        map.fitBounds(layerInfo.layer.getBounds(), { padding: [20, 20] });
                    } catch (e) {
                        console.error("Error al ajustar los límites de la capa:", e);
                        this.centerMapOnCountry(country);
                    }

                } catch (error) {
                    console.error('Error cargando capa:', error);
                    this.centerMapOnCountry(country);
                }
            } else {
                // Si no hay capa, centrar en el país
                this.centerMapOnCountry(country);
            }

            // Mostrar la información de la restricción
            if (restrictionId) {
                const restriction = restrictionsData.find(row => row.ip_restriccion === restrictionId);
                if (restriction) {
                    this.showFeatureInfo(restriction);
                }
            }
        }, 300);
    }

    centerMapOnCountry(country) {
        const countryConfig = CONFIG.COUNTRY_CENTERS[country] || { center: CONFIG.MAP.CENTER, zoom: CONFIG.MAP.ZOOM };
        map.setView(countryConfig.center, countryConfig.zoom);
    }

    // =============================================
    // MODALES Y DETALLES
    // =============================================

    showDetailModal(id) {
        const item = restrictionsData.find(row => row.ip_restriccion === id);
        if (item) {
            const modalContent = this.generateModalContent(item);
            $('#modalContent').html(modalContent);
            $('#detailModalLabel').text(`Detalle de la Restricción: ${item.ip_restriccion}`);
            new bootstrap.Modal(document.getElementById('detailModal')).show();
        }
    }

    generateModalContent(item) {
        return `
                    <div class="row">
                        <div class="col-md-6">
                            <h5><i class="fas fa-balance-scale"></i> Información Legal</h5>
                            <hr>
                            ${this.generateLegalInfo(item)}
                        </div>
                        <div class="col-md-6">
                            <h5><i class="fas fa-tools"></i> Detalles Técnicos</h5>
                            <hr>
                            ${this.generateTechnicalDetails(item)}
                        </div>
                        <div class="col-md-12">
                            <h5><i class="fas fa-balance-scale"></i> Texto Norma</h5>
                            <hr>
                            ${item.texto_norma ? `<p>${item.texto_norma}</p>` : ''}

                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <h5><i class="fas fa-align-left"></i> Descripción de la Restricción</h5>
                            <hr>
                            <div class="alert alert-info">${item.descripcion_restriccion}</div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <h5><i class="fas fa-leaf"></i> Pertinencia EUDR</h5>
                            <hr>
                            <div class="alert alert-${item.eudr_cat ? 'success' : 'secondary'}">
                                ${item.eudr_cat ? `Categoría: ${item.eudr_cat}. ${item.pertinencia_eudr}` : 'Esta restricción no es pertinente para el cumplimiento del EUDR'}
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <h5><i class="fas fa-database"></i> Dataset y Geoproceso</h5>
                            <hr>
                            ${this.generateDatasetInfo(item)}
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <h5><i class="fas fa-cogs"></i> Geoproceso a Realizar</h5>
                            <hr>
                            <div class="bg-light p-3 rounded">
                                ${item.geoproceso_a_realizar || "<span class='text-muted'>No especificado</span>"}
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <h5><i class="fas fa-info"></i> Información Adicional</h5>
                            <hr>
                            ${this.generateAdditionalInfo(item)}
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12">
                            <button class="btn btn-primary" onclick="app.viewOnMap('${item.pais}', '${item.tipo_restriccion}', '${item.id_layer}', '${item.ip_restriccion}')">
                                <i class="fas fa-map-marked-alt"></i> Ver esta restricción en el mapa
                            </button>
                        </div>
                    </div>
                `;
    }

    generateLegalInfo(item) {
        return `
                    <p><strong><i class="fas fa-flag"></i> País:</strong> ${item.pais} (${item.iso})</p>
                    <p><strong><i class="fas fa-id-card"></i> ID Restricción:</strong> <code>${item.ip_restriccion}</code></p>
                    <p><strong><i class="fas fa-book"></i> Normativa:</strong> <a href="${item.enlace_norma}" target="_blank" class="text-decoration-none">${item.normativa_aplicable}</a> (${item.normativa_tipo})</p>
                    <p><strong><i class="fas fa-file-alt"></i> Artículo:</strong> ${item.articulo_norma}</p>
                    <p><strong><i class="fas fa-calendar-alt"></i> Fecha Norma:</strong> ${item.fecha_norma} (${item.decada_norma})</p>
                    <p><strong><i class="fas fa-building"></i> Institución Responsable:</strong> ${item.institucion_responsable}</p>
                    <p><strong><i class="fas fa-map-marker-alt"></i> Nivel/Escala:</strong> ${item.nivel_escala}</p>
                    ${item.observaciones_relevantes ? `<p><strong><i class="fas fa-sticky-note"></i> Observaciones Relevantes:</strong> ${item.observaciones_relevantes}</p>` : ''}
                `;
    }

    generateTechnicalDetails(item) {
        return `
                    <p><strong><i class="fas fa-layer-group"></i> Tipo de Restricción:</strong> <span class="badge ${this.getBadgeClass(item.tipo_restriccion)}">${item.tipo_restriccion}</span></p>
                    <p><strong><i class="fas fa-tag"></i> Tipo Descripción:</strong> ${item.tipo_descrip}</p>
                    <p><strong><i class="fas fa-check-circle"></i> Cuantificable:</strong> ${item.cuantificable === 'Si' ? 'Sí' : 'No'}</p>
                    <p><strong><i class="fas fa-ruler"></i> Parámetros Geográficos:</strong> ${item.parametros_geo}</p>
                    <p><strong><i class="fas fa-draw-polygon"></i> Representación:</strong> ${item.representacion}</p>
                    <p><strong><i class="fas fa-chart-line"></i> Tipo de Análisis:</strong> ${item.tipo_analisis || "No especificado"}</p>
                    <p><strong><i class="fas fa-database"></i> ID Dato:</strong> ${item.id_dato || "No especificado"}</p>
                    <p><strong><i class="fas fa-map"></i> Cartografía Base:</strong> ${item.cartografia_base || "No especificado"}</p>
                `;
    }

    generateDatasetInfo(item) {
        let geojsonLinks = '';

        // Manejar el array de URLs GeoJSON
        if (item.url_geojson) {
            const urls = Array.isArray(item.url_geojson) ? item.url_geojson : [item.url_geojson];
            geojsonLinks = urls.map((url, index) =>
                `<a href="${url}" target="_blank" class="text-decoration-none">GeoJSON ${index + 1}</a>`
            ).join(', ');
        }

        return `
                    <p><strong><i class="fas fa-database"></i> Dataset:</strong> 
                        ${item.nombre_del_dataset && item.enlace_dataset ?
                `<a href="${item.enlace_dataset}" target="_blank" class="text-decoration-none">${item.nombre_del_dataset}</a>` :
                (item.nombre_del_dataset || "<span class='text-muted'>No especificado</span>")
            }
                    </p>
                    <p><strong><i class="fas fa-map"></i> GeoJSON:</strong> 
                        ${geojsonLinks || "<span class='text-muted'>No especificado</span>"}
                    </p>
                    <p><strong><i class="fas fa-calendar"></i> Fecha Dataset:</strong> ${item.fecha_dataset ? new Date(item.fecha_dataset).toLocaleDateString() : "No especificado"} (${item.decada_dataset})</p>
                    <p><strong><i class="fas fa-cogs"></i> Tipo de Dataset:</strong> ${item.tipo_dataset || "<span class='text-muted'>No especificado</span>"}</p>
                    <p><strong><i class="fas fa-project-diagram"></i> Tipo de Geoproceso:</strong> ${item.tipo_geoproceso || "<span class='text-muted'>No especificado</span>"}</p>
                    <p><strong><i class="fas fa-code-branch"></i> ID Capa:</strong> ${item.id_layer || "<span class='text-muted'>No especificado</span>"}</p>
                    <p><strong><i class="fas fa-file-alt"></i> Descripción Dataset:</strong> ${item.descripcion_dataset || "<span class='text-muted'>No especificado</span>"}</p>
                    <p><strong><i class="fas fa-globe"></i> Cobertura Espacial:</strong> ${item.cobertura_espacial || "<span class='text-muted'>No especificado</span>"}</p>
                    <p><strong><i class="fas fa-building"></i> Proveedor Dataset:</strong> ${item.proveedor_dataset || "<span class='text-muted'>No especificado</span>"}</p>
                    <p><strong><i class="fas fa-link"></i> Fuente:</strong> ${item.fuente || "<span class='text-muted'>No especificado</span>"}</p>
                    <p><strong><i class="fas fa-shield-alt"></i> Licencia:</strong> ${item.licencia_condiciones_de_uso || "<span class='text-muted'>No especificado</span>"}</p>
                    <p><strong><i class="fas fa-envelope"></i> Contacto Oficial:</strong> ${item.contacto_oficial || "<span class='text-muted'>No especificado</span>"}</p>
                    ${item.observaciones_dataset ? `<p><strong><i class="fas fa-sticky-note"></i> Observaciones Dataset:</strong> ${item.observaciones_dataset}</p>` : ''}
                    ${item.entregable ? `<p><strong><i class="fas fa-file"></i> Entregable:</strong> ${item.entregable}</p>` : ''}
                    ${item.link_entregable ? `<p><strong><i class="fas fa-link"></i> Link Entregable:</strong> <a href="${item.link_entregable}" target="_blank">${item.link_entregable}</a></p>` : ''}
                `;
    }

    generateAdditionalInfo(item) {
        let info = '';

        if (item.analisis_geoespacial && item.analisis_geoespacial !== "") {
            info += `<p><strong><i class="fas fa-globe-americas"></i> Análisis Geoespacial:</strong> ${item.analisis_geoespacial}</p>`;
        }

        if (item.observaciones && item.observaciones !== "") {
            info += `<p><strong><i class="fas fa-sticky-note"></i> Observaciones:</strong> ${item.observaciones}</p>`;
        }

        if (item.fuente_informacion && item.fuente_informacion !== "") {
            info += `<p><strong><i class="fas fa-font"></i> Fuente Información:</strong> ${item.fuente_informacion}</p>`;
        }

        if (item.fecha_actualizacion && item.fecha_actualizacion !== "") {
            info += `<p><strong><i class="fas fa-calendar-check"></i> Fecha Actualización:</strong> ${item.fecha_actualizacion}</p>`;
        }

        if (item.estado && item.estado !== "") {
            info += `<p><strong><i class="fas fa-check-circle"></i> Estado:</strong> ${item.estado}</p>`;
        }

        return info || '<p class="text-muted">No hay información adicional disponible.</p>';
    }

    // =============================================
    // MÉTODOS FALTANTES
    // =============================================

    getBadgeClass(type) {
        if (!type) return 'badge-otros';

        const typeLower = type.toLowerCase();

        if (typeLower.includes('ambiental') || typeLower.includes('forestal') || typeLower.includes('conservación')) {
            return 'badge-eudr';
        } else if (typeLower.includes('hidrica') || typeLower.includes('hídrica')) {
            return 'badge-buffer';
        } else if (typeLower.includes('fauna')) {
            return 'badge-ap';
        } else {
            return 'badge-otros';
        }
    }

    exportRow(id) {
        const item = restrictionsData.find(row => row.ip_restriccion === id);
        if (!item) {
            this.showNotification('No se pudo encontrar el registro para exportar', true);
            return;
        }

        try {
            // Crear workbook y worksheet
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet([item]);

            // Añadir worksheet al workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Restricción');

            // Exportar el archivo
            XLSX.writeFile(wb, `restriccion_${id}.xlsx`);

            this.showNotification(`Restricción ${id} exportada correctamente`);
        } catch (error) {
            console.error('Error al exportar:', error);
            this.showNotification('Error al exportar el registro', true);
        }
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    showNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${isError ? 'error' : ''}`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}

// =============================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =============================================

const app = new RestrictionsApp();

$('#exportExcel').click(function () {
    const wb = XLSX.utils.book_new();
    const ws_data = [
        ["País", "ID Restricción", "Normativa", "Descripción", "Tipo", "Pertinencia EUDR", "Dataset", "Geoproceso"]
    ];

    filteredData.forEach(row => {
        ws_data.push([
            row.pais,
            row.ip_restriccion,
            row.normativa_aplicable,
            row.descripcion_restriccion,
            row.tipo_restriccion,
            row.eudr_cat,
            row.nombre_del_dataset || "No especificado",
            row.geoproceso_a_realizar || "No especificado"
        ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Restricciones");
    XLSX.writeFile(wb, "restricciones_eudr.xlsx");
});

$('#exportExcelAll').click(function () {
    if (!filteredData || filteredData.length === 0) {
        alert("No hay datos para exportar");
        return;
    }

    const wb = XLSX.utils.book_new();

    // 1. Obtener todas las propiedades únicas de los objetos
    const headers = Object.keys(filteredData[0]);

    // 2. Crear ws_data con encabezados
    const ws_data = [headers];

    // 3. Agregar cada fila con sus valores
    restrictionsData.forEach(row => {
        const rowData = headers.map(h => row[h] ?? "No especificado");
        ws_data.push(rowData);
    });

    // 4. Generar la hoja y guardar
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Restricciones");
    XLSX.writeFile(wb, "restricciones_todo.xlsx");
});

$('#exportPDF').click(function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Reporte de Restricciones Legales - EUDR", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableData = [];
    filteredData.forEach(row => {
        tableData.push([
            row.pais,
            row.ip_restriccion,
            row.normativa_aplicable.substring(0, 30) + (row.normativa_aplicable.length > 30 ? "..." : ""),
            row.descripcion_restriccion.substring(0, 50) + (row.descripcion_restriccion.length > 50 ? "..." : ""),
            row.tipo_restriccion,
            row.eudr_cat ? "Sí" : "No"
        ]);
    });

    doc.autoTable({
        head: [['País', 'ID Restricción', 'Normativa', 'Descripción', 'Tipo', 'Pertinencia EUDR']],
        body: tableData,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [40, 100, 200] }
    });

    doc.save('restricciones_eudr.pdf');
});