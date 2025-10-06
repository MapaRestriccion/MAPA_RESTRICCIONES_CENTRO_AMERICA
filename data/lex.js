const promptLexEUDR = `
# Guía de Implementación del Reglamento EUDR - Documento de Orientación
*Basado en el Aviso de la Comisión C/2025/4524 para el Reglamento (UE) 2023/1115 sobre Productos Libres de Deforestación*

---

## NATURALEZA Y ALCANCE DEL DOCUMENTO
- **Tipo:** Aviso de la Comisión Europea (no jurídicamente vinculante)
- **Propósito:** Facilitar implementación armonizada del EUDR
- **Limitación:** No reemplaza ni modifica las disposiciones legales del Reglamento
- **Entrada en vigor:** 29 de junio de 2023

---

## FECHAS CLAVE DE IMPLEMENTACIÓN

| Fecha                     | Aplicabilidad                                                                 |
|---------------------------|-------------------------------------------------------------------------------|
| **30 diciembre 2025**     | Obligaciones generales para operadores y comerciantes                         |
| **30 junio 2026**        | Microempresas y pequeñas empresas (establecidas antes 31 dic 2020)           |
| **Excepción:**            | Madera y productos madereros cubiertos por Reglamento (UE) 995/2010 (EUTR) |

---

## OBLIGACIONES FUNDAMENTALES DEL EUDR
Los productos pertinentes solo pueden ser comercializados si cumplen **TRES condiciones**:

### 1. Libres de Deforestación
- Producidos en tierras no deforestadas después del 31 de diciembre de 2020

### 2. Legalidad en Producción
- Producidos según legislación pertinente del país de producción

### 3. Declaración de Diligencia Debida (DDS)
- Cubiertos por una DDS presentada en el Sistema de Información

---

## PROCESO DE DILIGENCIA DEBIDA (DD)

### Pasos Obligatorios para Operadores
1. **Recopilar información** sobre productos y cadena de suministro
2. **Verificar la información** recopilada
3. **Realizar evaluación de riesgos** para determinar riesgo despreciable

### Criterios de Evaluación de Riesgos
- País de producción
- Riesgos específicos del producto
- Indicaciones de prácticas ilegales en la cadena
- Complejidad de la cadena de suministro
- Nivel de corrupción en el país de origen

### Resultado de la Evaluación
- **Riesgo despreciable:** Producto puede comercializarse
- **Riesgo NO despreciable:** Producto NO debe introducirse/exportarse

---

## ROLES SEGÚN TIPO DE EMPRESA

### Operadores (PYME y no PYME)
- **Obligación:** Ejercer DD completa
- **Excepción PYME downstream:** Obligaciones modificadas si productos ya tienen DD previa

### Comerciantes no PYME
- **Obligaciones:** Iguales a operadores
- **Requisito:** Asegurar DD correcta en fases anteriores de la cadena

### Comerciantes PYME
- **Obligaciones de DD:** **Ninguna**
- **Requisitos:** 
  - Recopilar y mantener información para trazabilidad
  - Identificar proveedores y clientes corporativos
  - Registrar números de referencia de DDS existentes

---

## DEFINICIONES DE MERCADO

### Colocación en el Mercado
- **Definición:** Primera puesta a disposición en el mercado de la Unión
- **Aplica:** Productos o materias primas pertinentes

### Puesta a Disposición
- **Definición:** Suministro para distribución, consumo o uso
- **Contexto:** Actividad comercial en el mercado de la Unión

### Exportación
- **Definición:** Procedimiento aduanero para retirar mercancías del territorio aduanero
- **Excluido:** Reexportación (no está dentro del alcance del EUDR)

---

## PRODUCTOS COMPUESTOS Y ÁMBITO DE APLICACIÓN

### Productos Compuestos
- **Requisito:** DD para todas las partes que contengan productos del Anexo I
- **Ejemplo:** Chocolate (cacao) con aceite de palma → DD para ambos ingredientes

### Materiales de Embalaje
| Situación                          | Cubierto por EUDR |
|-------------------------------------|-------------------|
| Usado exclusivamente para embalar    | **NO**           |
| Comercializado como producto autónomo | **SÍ**           |

### Residuos y Materiales Reciclados
| Tipo de Material                     | Cubierto por EUDR |
|-------------------------------------|-------------------|
| 100% reciclado o ciclo completado    | **NO**           |
| Con cualquier % de material virgen   | **SÍ** (solo parte virgen) |

---

## DEFINICIONES TÉCNICAS CLAVE

### Deforestación
- **Definición:** Conversión de bosque a uso agrícola
- **Alcance:** Incluye conversión inducida por humanos o natural
- **Fecha límite:** Tierras no deforestadas después de 31 dic 2020

### Bosque (Criterios)
- **Superficie:** > 0.5 hectáreas
- **Altura árboles:** > 5 metros
- **Cobertura de copa:** > 10%
- **Exclusiones:** Tierras predominantemente agrícolas o urbanas

### Uso Agrícola
- **Definición:** Propósito agrícola del uso de la tierra
- **Incluye:** 
  - Plantaciones agrícolas
  - Áreas agrícolas reservadas (set-aside)
  - Cría de ganado
- **Nota:** Las plantaciones agrícolas quedan excluidas de la definición de "bosque"

### Conversiones NO Consideradas Deforestación
- Infraestructura urbana
- Sitios industriales no agrícolas
- Despliegue de energía renovable
- Prevención de incendios forestales

---

## CERTIFICACIONES Y VERIFICACIÓN POR TERCEROS

### Utilidad en DD
- **Propósito:** Proporcionar información útil para evaluación de riesgos
- **Evidencia:** Pueden demostrar legalidad y ausencia de deforestación

### Limitaciones Importantes
- **No son requisito legal**
- **No sustituyen responsabilidad del operador**
- **No implican "vía verde" (green lane)**
- **No eximen de realizar diligencia debida completa

---

## INSTRUCCIONES PARA EL PROMPT
Basado en esta guía:
1. Identifica el tipo de empresa (operador/comerciante, PYME/no PYME)
2. Determina las obligaciones según fecha de aplicación
3. Aplica el proceso de DD paso a paso
4. Verifica definiciones técnicas para productos específicos
5. Considera excepciones para residuos y materiales reciclados
6. Evalúa correctamente el alcance de productos compuestos

*Nota: Para interpretación legal definitiva, consultar siempre el texto completo del Reglamento (UE) 2023/1115.*
`;