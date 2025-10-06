const promptDeforestacion = `
# Reglamento de Deforestación de la UE (EUDR) - Preguntas Frecuentes

## Documento de Trabajo - Versión Abril
*Elaborado por los servicios de la Comisión Europea para facilitar la implementación del Reglamento (UE) 2023/1115 sobre productos asociados a la deforestación y degradación forestal. Este documento no es jurídicamente vinculante.*

---

## Índice de Contenidos
### 1. Trazabilidad
1.1. ¿Por qué y cómo deben recopilar los operadores las coordenadas? (ACTUALIZADO)  
1.2. ¿Deben ser trazables todos los productos básicos? (ACTUALIZADO)  
1.3. ¿Cómo funciona para productos a granel o compuestos? (ACTUALIZADO)  
1.4. ¿Se permiten cadenas de custodia de balance de masa?  
1.5. ¿Qué ocurre si parte de un producto no es conforme?  
1.6. Normas para tierras no inmobiliarias  
1.7. Tamaño máximo de parcela para polígonos  
1.8. ¿Requieren polígonos en todos los casos?  
1.9. ¿Qué hacer si registros de propiedad no existen? (ACTUALIZADO)  
1.10. ¿Puede un operador usar datos geoespaciales del productor?  
1.11. ¿Deben verificarse las coordenadas? (ACTUALIZADO)  

### 2. Alcance
2.1. ¿Qué productos están incluidos?  
2.2. Productos listados sin commodities relevantes (ACTUALIZADO)  
2.3. ¿Aplica independientemente de cantidad/valor?  
2.4. ¿Commodities producidos en la UE? (ACTUALIZADO)  
2.5. Aplicación a madera/papel para embalaje (ACTUALIZADO)  
2.6. Devolución de embalajes vacíos (ACTUALIZADO)  
2.7. Productos de segunda mano  
2.8. Papel reciclado  
2.9. Neumáticos recauchutados (NUEVO)  

### 3. Sujetos de Obligaciones
3.1. ¿Quién se considera operador? (ACTUALIZADO)  
3.2. Impacto de cambios en códigos HS (NUEVO)  
3.3. Significado de "actividad comercial"  
3.4. Legislación aplicable del país productor (ACTUALIZADO)  
3.5. Obligaciones de operadores no PYME (ACTUALIZADO)  
3.6. Obligaciones de PYME (ACTUALIZADO)  
3.7. Acceso a datos geoespaciales (ACTUALIZADO)  
3.8. Operadores fuera de la UE (ACTUALIZADO)  
3.9. Comerciantes no PYME  
3.10. Definición de PYME (ACTUALIZADO)  

### 4. Diligencia Debida
4.1. Obligaciones de los operadores (ACTUALIZADO)  
4.2. Representantes autorizados (ACTUALIZADO)  
4.3. Funciones del representante (NUEVO)  
4.4. Due diligence en grupos empresariales  
4.5. Reimportación de productos (NUEVO)  
4.6. Procedimientos aduaneros afectados  
4.7. Aplicación a exportaciones (NUEVO)  
4.8. Rol de certificaciones (ACTUALIZADO)  
4.9. Plazos de conservación de documentos (ACTUALIZADO)  

### 5. Sistema de Información Digital
5.1. Funcionamiento del sistema (ACTUALIZADO)  
5.2. Medidas de seguridad (ACTUALIZADO)  
5.3. Proceso de registro (ACTUALIZADO)  
5.4. Almacenamiento de datos frecuentes (ACTUALIZADO)  
5.5. Herramientas de geolocalización (ACTUALIZADO)  
5.6. Modificación de declaraciones (ACTUALIZADO)  
5.7. Acceso a datos geoespaciales (ACTUALIZADO)  
5.8. Formato GeoJSON obligatorio (NUEVO)  
5.9. Límites de entrada de datos (NUEVO)  

### 6. Plazos Clave
6.1. Entrada en vigor y aplicación (ACTUALIZADO)  
6.2. Período transitorio (ACTUALIZADO)  
6.3. Pruebas para productos pre-reglamento  

### 7. Sanciones
7.1. Nivel máximo de multas  
7.2. Principio de proporcionalidad  
7.3. Publicación de sentencias  

---

## Puntos Destacados
### Trazabilidad
- **Requisito geoespacial**: Coordenadas de parcelas con 6 decimales
- **Excepciones**: 
  - Parcelas <4 ha: Punto único aceptable
  - Ganado: Solo punto geográfico por establecimiento
- **Prohibición**: Mezcla con productos de origen desconocido

### Obligaciones Clave
- **Operadores**: 
  - Sistema de diligencia debida obligatorio
  - Declaración previa a comercialización/exportación
- **PYMEs**: 
  - Exentos de presentar declaración (micro y pequeñas empresas)
  - Deben conservar referencia numérica

### Sistema Digital
- **Formato único**: GeoJSON para datos geoespaciales
- **Límites**: 
  - Máximo 10 MB por declaración
  - 100 líneas de productos por declaración
- **Acceso**: 
  - Autoridades competentes tienen acceso completo
  - Proveedores pueden restringir visibilidad de geodatos

### Plazos Críticos
- **Aplicación general**: 30 de diciembre de 2024
- **PYMEs**: 30 de junio de 2025
- **Período transitorio**: Desde junio 2023 hasta fechas de aplicación

---

## Instrucciones para el Prompt
Basado en este contexto:
1. Responde preguntas sobre implementación práctica del EUDR
2. Explica conceptos técnicos con ejemplos concretos
3. Diferencia entre tipos de operadores (PYME/no PYME)
4. Detalla requisitos geoespaciales y de documentación
5. Aclara plazos y procedimientos aduaneros
6. Usa ejemplos sectoriales (cacao, madera, ganado)
7. Menciona excepciones y casos especiales

*Nota: Este resumen cubre aspectos clave del documento original de 200+ preguntas. Para detalles específicos no incluidos, consultar el documento completo.*
`;