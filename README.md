# clone-from

Este módulo permite clonar plantillas desde un repositorio especial. Ya no tienes que configurar una y otra vez tu proyecto, almacena tu configuración en un repositorio y usalo cuado quieras.

## Instalación

Puedes instalar este paquete globalmente usando npm o pnpm:

```bash
npm install -g clone-from
```

## Como usar
1) El primer paso es crear un repositorio público con los diferentes templates y la siguiente estructura<br/>
**Root**<br/>
├── template-1<br/>
│ ├── subtemplate-1<br/>
│ ├── subtemplate-2<br/>
├── template-2<br/>
│ ├── subtemplate-1<br/>
│ ├── subtemplate-2<br/>
├── template-3<br/>
Puedes ver este repo de ejemplo: [mis templates](https://github.com/zenx5/templates)
2) Luego solo resta configurar con tu usuario y nombre del repositorio, para esto usa `clone-from --config`
3) Ahora si, ya puedes usar el template `clone-from [nombre-proyecto]` <br/>
   ![image](https://github.com/user-attachments/assets/ee4fcf8b-289a-47aa-9673-cc95a1cc823d)
