# Días laborables en Excel con nueve ejemplos verificables

Ejemplos de DIAS.LAB.INTL y DIA.LAB.INTL con fechas, cierres hipotéticos y resultados esperados. Sirven para comparar un recuento de calendario, Excel y la calculadora de CalcQuick.

[Guía con fórmulas y explicaciones](https://www.calcquick.net/es/blog/dias-laborables-excel/?utm_source=github&utm_medium=referral&utm_campaign=workday_excel_20261121&utm_content=readme)

[Calculadora de días laborables](https://www.calcquick.net/es/tools/workday-calculator/)

## Comprobar los nueve casos

Requiere Node.js 18 o posterior. No instala paquetes ni realiza solicitudes de red.

    node run-examples.mjs

La salida debe terminar con 9/9 ejemplos correctos. El script cuenta fechas UTC día a día y compara el resultado con cases.json. No ejecuta Excel ni valida el comportamiento de una instalación concreta de Office.

## Repetir un ejemplo en Excel

Con sábado y domingo no laborables y sin festivos:

    =DIA.LAB.INTL(FECHA(2026;8;24);10;1)

Resultado esperado: 7 de septiembre de 2026. El 24 de agosto es la base y no cuenta como día 1. Aplica formato Fecha a la celda si aparece un número de serie.

Para las fórmulas con cierres, prepara H2 = FECHA(2026;8;26), H3 = FECHA(2026;8;29) y H4 = FECHA(2026;8;31). Los nombres de funciones y los separadores dependen de la configuración de Excel.

En CalcQuick, selecciona Ninguno como calendario predefinido y añade solo los cierres indicados en cada caso. Para desplazar fechas, deja desactivada la opción de contar la fecha base.

## Casos incluidos

- Una semana completa y un intervalo que cruza el fin de semana.
- Un cierre entre semana y un intervalo sin ambos extremos.
- Sumar diez días, sumar con un cierre adicional y restar tres días.
- Fin de semana de viernes y sábado.
- Un festivo en sábado que no se descuenta dos veces.

Las fechas de cierre son ejemplos de empresa, no festivos nacionales. Para plazos contractuales o administrativos, verifica el calendario y las reglas aplicables.

## Referencias oficiales

- [Microsoft DIAS.LAB.INTL](https://support.microsoft.com/es-es/excel/functions/networkdays-intl-function)
- [Microsoft DIA.LAB.INTL](https://support.microsoft.com/es-es/excel/functions/workday-intl-function)

Preparado por CalcQuick. Revisión: 21 de noviembre de 2026.
