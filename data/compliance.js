const promptComplianceEUDR = `
# Guía de Cumplimiento del Reglamento EUDR
*Basado en el documento de la Comisión Europea "EUDR COMPLIANCE: UNDERSTANDING YOUR COMPANY POSITION IN BEEF, COCOA, COFFEE, PALM OIL, RUBBER, SOY, AND WOOD SUPPLY CHAINS" (Enero 2025, actualizado Julio 2025)*

---

## NATURALEZA Y ALCANCE
Este documento proporciona orientación sobre cómo aplicar las obligaciones del **Reglamento (UE) 2023/1115 (EUDR)** según:
- Tipo de empresa (operador/comerciante)
- Tamaño (PYME/no PYME)
- Posición en la cadena de suministro

**Importante:** Este documento es meramente informativo, no es jurídicamente vinculante y no sustituye las disposiciones legales del EUDR.

**Productos cubiertos:** Carne de bovino, cacao, café, aceite de palma, caucho, soja y madera.

---

## OBLIGACIONES CLAVE SEGÚN TIPO DE EMPRESA

### Tabla 1: Resumen de Obligaciones
| Tipo de Empresa                  | Acción Principal                          | Obligaciones de DD       | Declaración DDS          | Responsabilidad          |
|----------------------------------|------------------------------------------|--------------------------|-------------------------|--------------------------|
| **Operador Upstream** (No PYME)   | Primera introducción/exportación         | DD completa (Art. 8)    | Presentar DDS (Art. 4.2)| Asume cumplimiento (Art. 4.3) |
| **Operador Upstream** (PYME)      | Primera introducción/exportación         | DD completa (Art. 8)    | Presentar DDS (Art. 4.2)| Asume cumplimiento (Art. 4.3) |
| **Operador Downstream** (No PYME) | Productos ya cubiertos por DDS          | Comprobar DD previa (Art. 4.9) | Referenciar DDS existente | Retiene responsabilidad (Art. 4.10) |
| **Comerciante** (No PYME)         | Pone a disposición productos cubiertos    | Comprobar DD previa (Art. 4.9) | Referenciar DDS existente | Retiene responsabilidad (Art. 4.10) |
| **Operador Downstream** (PYME)    | Productos ya cubiertos por DDS          | **Ninguna**              | **Ninguna**             | **Ninguna** (solo registra referencia) |
| **Comerciante** (PYME)            | Pone a disposición productos relevantes   | **Ninguna**              | **Ninguna**             | **Ninguna** (solo registros) |

---

## DETALLES POR TIPO DE EMPRESA

### 1. Operador Upstream (No PYME y PYME)
- **Acción:** Introduce o exporta productos **no cubiertos** por DDS previa
- **Obligaciones:**
  - Ejercer diligencia debida completa (Art. 8 EUDR)
  - Presentar DDS en el Sistema de Información (Art. 4.2)
  - Asumir responsabilidad por cumplimiento (Art. 4.3, 6.1)
- **Nota:** Puede autorizar representante para presentar DDS, pero mantiene responsabilidad

### 2. Operador Downstream (No PYME) y Comerciante (No PYME)
- **Acción:** Comercializa productos **ya cubiertos** por DDS
- **Obligaciones:**
  - **Comprobar** (Ascertain) que la DD previa se realizó correctamente (Art. 4.9)
  - **Referenciar** número de referencia y verificación de DDS existente
  - Retienen responsabilidad por cumplimiento (Art. 4.10, 6.1)
- **Nota:** Obligaciones idénticas para operadores y comerciantes no PYME

### 3. Operador Downstream (PYME)
- **Acción:** Comercializa productos cubiertos por DDS previa
- **Obligaciones:**
  - **Ninguna obligación de DD ni presentar DDS**
  - Registrar número de referencia de DDS (Art. 4.8)
  - **No asumen responsabilidad** por el producto

### 4. Comerciante (PYME)
- **Acción:** Pone a disposición productos relevantes
- **Obligaciones:**
  - **Ninguna obligación de DD ni presentar DDS**
  - Registrar información de proveedores, clientes y referencias DDS (Art. 5.3-4)
  - **No asumen responsabilidad** por los productos

---

## REQUISITOS DE DILIGENCIA DEBIDA Y TRAZABILIDAD

### Contenido de la DDS
- **Geolocalización:** Todas las parcelas de producción de materias primas
- **Información descriptiva:** Datos del operador y productos
- **Referencias:** Se pueden referenciar geolocalizaciones ya incluidas en DDS previas

### Declaraciones para Múltiples Lotes
- **Período:** Hasta 1 año por DDS
- **Condiciones:**
  - DD realizada/determinada para todos los productos
  - Todas las geolocalizaciones declaradas
  - Reducción de carga administrativa

### Requisitos Aduaneros
- **Importación:** Número DDS requerido para "puesta en libre circulación"
- **Exportación:** Número DDS requerido para declaración de exportación

### Trazabilidad Estricta
- **Prohibición:** Cadenas de custodia de balance de masas (mass balance)
- **Requisito:** Segregación de productos en toda la cadena de suministro
- **Objetivo:** Evitar mezcla con productos de origen desconocido o no libres de deforestación

### Productos Compuestos
- **Ejemplo:** Madera sin DDS previa (importada)
- **Requisito:** Ejercer DD completa sobre esos productos relevantes

### Productos No Relevantes (Exentos)
- **Ejemplos:**
  - Cosméticos (HS 3304)
  - Tensioactivos (HS 3402)
  - Alimentos compuestos (HS 2309)
  - Calzado fabricado con cuero
- **Condición:** No listados en Anexo I del EUDR

---

## INSTRUCCIONES PARA EL PROMPT
Basado en esta guía:
1. Identifica el tipo de empresa (operador/comerciante, PYME/no PYME)
2. Determina la posición en la cadena de suministro
3. Aplica las obligaciones correspondientes según la Tabla 1
4. Verifica requisitos específicos de trazabilidad y DDS
5. Considera excepciones para productos no relevantes
6. Explica con ejemplos prácticos de cada sector (carne, cacao, etc.)

*Nota: Para casos complejos o interpretación legal, consultar siempre el texto completo del Reglamento EUDR.*
`;