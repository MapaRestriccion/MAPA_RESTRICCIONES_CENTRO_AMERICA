const promptRegulacionEUDR = `
# Resumen del Reglamento de la UE sobre Productos Libres de Deforestación (EUDR)
*Basado en documentos de orientación de la Comisión Europea*

---

## 📅 APLICACIÓN Y PLAZOS

| Fecha                     | Aplicabilidad                                                                 |
|---------------------------|-------------------------------------------------------------------------------|
| **29 junio 2023**         | Entrada en vigor del Reglamento (UE) 2023/1115                                 |
| **30 diciembre 2025**     | Aplicación general para medianos y grandes operadores/comerciantes               |
| **30 junio 2026**        | Aplicación diferida para microempresas y PYME                                |

---

## 🌾 ALCANCE DE PRODUCTOS Y MATERIAS PRIMAS

### Materias Primas Relevantes
- **Aceite de palma** y derivados
- **Ganado** (carne de bovino) y productos cárnicos
- **Soja** y derivados
- **Café** y derivados
- **Cacao** y derivados (ej: chocolate)
- **Madera** y productos madereros (ej: muebles)
- **Caucho** y derivados

### Reglas de Aplicación
- **Solo productos listados en Anexo I** que contengan o estén hechos de materias primas del Anexo I
- **Prefijo "ex" en códigos HS**: Indica extracto de todos los productos clasificables bajo ese código (ej: solo asientos de madera bajo código 9401)

### Productos Compuestos
- **Regla**: DD solo requerida para materia prima principal y derivados relevantes
- **Ejemplo**: Barra de chocolate (código 1806) → DD solo para polvo de cacao y manteca de cacao

### Exclusiones Importantes
| Tipo de Producto                          | Cubierto por EUDR |
|-------------------------------------------|-------------------|
| Materiales de embalaje (soporte/protección) | **NO**           |
| Productos 100% reciclados (ciclo completado) | **NO**           |
| Productos con % de material virgen         | **SÍ** (solo parte virgen) |

---

## 🌳 DEFINICIONES CLAVE DE CUMPLIMIENTO

### Libre de Deforestación
- **Requisito**: Producto producido en tierras no deforestadas después del 31 de diciembre de 2020

### Deforestación
- **Definición**: Conversión de bosque a uso agrícola (humana o natural)
- **Exclusiones**: Conversión a usos no agrícolas (desarrollo urbano, infraestructura, energía renovable, prevención de incendios)

### Bosque (Criterios FAO)
- **Superficie**: > 0.5 hectáreas
- **Altura árboles**: > 5 metros
- **Cobertura de copa**: > 10%
- **Exclusión**: Tierras predominantemente agrícolas o urbanas

### Plantaciones Agrícolas
- **Ejemplos**: Caucho, árboles frutales, palma aceitera
- **Tratamiento**: Excluidas de definición de "bosque"
- **Importante**: Su reemplazo de bosque SÍ se considera deforestación

### Degradación Forestal
- **Definición**: Cambios estructurales como conversión de bosques primarios/regenerados en bosques de plantación
- **Requisito madera**: Cosechada sin inducir degradación después del 31 de diciembre de 2020

---

## 👥 ROLES Y RESPONSABILIDADES EN LA CADENA

### Operador
- **Definición**: Persona que introduce por primera vez un producto en el mercado UE o lo exporta
- **Responsabilidad**: Todos los operadores retienen responsabilidad por cumplimiento

### Comerciante
- **Definición**: Persona que pone productos relevantes a disposición en el mercado (sin ser operador)

### Tabla de Obligaciones por Rol
| Tipo de Empresa                  | Obligaciones de DD       | Presentar DDS | Responsabilidad |
|----------------------------------|--------------------------|---------------|-----------------|
| **Operador (No PYME)**           | DD completa              | Sí            | Total           |
| **Operador (PYME)**              | DD completa              | Sí            | Total           |
| **Operador Downstream (No PYME)** | Comprobar DD previa      | Sí (referencia) | Total           |
| **Comerciante (No PYME)**         | Comprobar DD previa      | Sí (referencia) | Total           |
| **Operador Downstream (PYME)**    | Ninguna (partes con DD) | No            | Ninguna         |
| **Comerciante (PYME)**            | Ninguna                  | No            | Ninguna         |

### Detalles de Obligaciones
- **Operadores Downstream (PYME)**: 
  - Obtener y proporcionar números de referencia DDS a autoridades si se solicita
- **Comerciantes (PYME)**:
  - Mantener registros de trazabilidad (proveedores, clientes, números DDS) por ≥5 años

---

## 🔍 OBLIGACIÓN DE DILIGENCIA DEBIDA (DD)

### Proceso de DD (3 Pasos)
1. **Recolección de información**
   - Incluye geolocalización de parcelas de tierra
2. **Evaluación de riesgos**
   - Comparar información con criterios de riesgo
3. **Mitigación de riesgos**
   - Asegurar riesgo despreciable ("negligible risk")

### Requisitos de Trazabilidad
- **Geolocalización**: Requerida para todas las parcelas de producción de materias primas
- **Prohibición**: Cadenas de custodia de balance de masas (mezclar productos libres con origen desconocido)
- **Segregación**: Productos deben mantenerse separados en cada paso de la cadena

### Declaraciones de Diligencia Debida (DDS)
- **Presentación**: Electrónica en Sistema de Información de la Comisión
- **Operativo desde**: 4 de diciembre de 2024
- **Flexibilidad**: Una DDS puede cubrir múltiples lotes/envíos durante ≤1 año

### Certificaciones
- **Utilidad**: Pueden ayudar en evaluación de riesgos
- **Limitaciones**: 
  - No sustituyen obligación legal de DD completa
  - No eliminan responsabilidad del operador
  - No constituyen "vía verde" (green lane)

---

## 📋 INSTRUCCIONES PARA EL PROMPT
Basado en este resumen:
1. Identifica el tipo de empresa (operador/comerciante, PYME/no PYME)
2. Determina las obligaciones según fechas de aplicación
3. Verifica si el producto está dentro del alcance del EUDR
4. Aplica correctamente las definiciones de deforestación y bosque
5. Asigna las responsabilidades según el rol en la cadena
6. Explica el proceso de DD paso a paso
7. Considera exclusiones y casos especiales (productos reciclados, compuestos)

*Nota: Para interpretación legal definitiva, consultar siempre el texto completo del Reglamento (UE) 2023/1115.*
`;