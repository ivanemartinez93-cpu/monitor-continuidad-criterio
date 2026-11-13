# Monitor de continuidad: estados claros y pruebas

Aplicación de práctica para que Iván consulte la última ejecución pública del flujo de actualización de su tablero de demostración. Distingue ejecución disponible, respuesta vacía, carga y error. No accede a ClickUp, no requiere credenciales ni modifica tareas. Una ejecución exitosa no demuestra que el tablero esté actualizado; una lista vacía tampoco significa que el flujo funcione. GitHub puede limitar las consultas anónimas.

Esta es una copia aislada del monitor anterior, con cambios del curso Vibe coding con criterio profesional. La versión publicada anteriormente es https://ivanemartinez93-cpu.github.io/monitor-tablero-curso/ y no contiene necesariamente estos cambios.

## Instalación y uso

Requiere Node.js 22.12 o superior compatible con Vite 8 y acceso a npm para instalar dependencias. Clonar este repositorio y ejecutar:

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

Abrir la dirección que muestra Vite. No hay variables obligatorias: `VITE_API_URL` es opcional y por defecto apunta a `https://api.github.com`. Las variables VITE se publican al navegador: nunca guardar secretos en ellas. Sin base de datos.

## Arquitectura y decisiones asistidas

Codex analizó el monitor previo y realizó cambios incrementales en esta copia. `service.js` valida la respuesta y distingue vacío de estructura inválida; `controller.js` coordina la carga, resultado y errores; `ui.js` muestra el estado; `main.js` conecta la interfaz. La separación permite comprobar el ciclo con servicios simulados sin depender de Internet. Se mantuvo el origen público y se rechazan enlaces de ejecución ajenos al repositorio esperado. No se afirma una revisión humana de los cambios.

## Criterios y evidencia

| Criterio | Prueba o verificación |
| --- | --- |
| Ejecución válida devuelve resultado y fecha | Test de consulta válida; consulta real observada en navegador local |
| Lista vacía tiene estado propio | Tests de lista vacía y ciclo vacío, con datos simulados |
| Error de red o HTTP no se confunde con éxito | Tests de error HTTP/red y ciclo de error, con datos simulados |
| Estructura inválida se rechaza | Test de lista ausente o tipo inválido |
| La carga termina en todos los caminos | Tests de ciclo de éxito, vacío y error; no verifican visualmente la duración de carga |
| Pruebas sin red y compilación | `npm test` y `npm run build` |

## Resultados observados el 13/11/2026

- `npm run lint`: terminó sin errores para los cuatro módulos activos y el archivo de pruebas. La configuración usa reglas limitadas de variables no definidas, variables sin uso, código inalcanzable y condiciones constantes; no es una auditoría integral de seguridad ni de formato.
- `npm test`: 8 pruebas ejecutadas, 8 aprobadas, 0 fallidas. Incluye éxito, lista vacía, datos inválidos, enlace externo, HTTP 404, fallo de red y ciclo de actualización.
- `npm run build`: compilación Vite exitosa.
- `npm audit`: 0 vulnerabilidades informadas al momento de ejecutar; la situación puede cambiar.
- En navegador local se mostró la última ejecución pública y se repitió la consulta con el botón. Los estados vacío y error se comprobaron en pruebas simuladas, no visualmente en navegador.

```text
npm run lint
> eslint src/main.js src/service.js src/controller.js src/ui.js test/monitor.test.js

npm test
 tests 8
 pass 8
 fail 0

npm run build
✓ built
```

