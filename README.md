# CLON X BACK END

## Información del Proyecto

**Materia:** Electiva 2

**Nombre completo del proyecto:** CLON X BACK END

**Integrantes:**
- Victor Daniel Hermoso Lopera
- Brandel Daniel Otero Arango

## Descripción

CLON X BACK END es una implementación del backend para un clon de la plataforma X (anteriormente conocida como Twitter). Este proyecto se desarrolla como parte de la materia Electiva 2 y tiene como objetivo replicar las funcionalidades principales de la red social X, incluyendo la creación de usuarios, publicación de tweets, interacciones entre usuarios, entre otras características.

## Instrucciones de Compilación y Ejecución

Este proyecto está desarrollado en Node.js. Para compilar y ejecutar el proyecto, sigue estos pasos:

1. Asegúrate de tener Node.js instalado en tu sistema. Puedes descargarlo de [nodejs.org](https://nodejs.org/).

2. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/CLON_X_BACK_END.git
   cd CLON_X_BACK_END
   ```

3. Instala las dependencias del proyecto:
   ```
   npm install
   ```

4. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Añade las variables necesarias (por ejemplo, `PORT`, `MONGODB_URI`, `JWT_SECRET`).

5. Inicia el servidor:
   ```
   npm start
   ```

   Para modo de desarrollo con recarga automática, puedes usar:
   ```
   npm run dev
   ```

6. El servidor debería estar corriendo en `http://localhost:3000` (o el puerto que hayas configurado).

## Características Principales

- Registro y autenticación de usuarios
- Creación, lectura, actualización y eliminación de tweets
- Sistema de seguimiento entre usuarios
- Likes y retweets
- API RESTful para integración con frontend

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB con Mongoose
- JSON Web Tokens (JWT) para autenticación
- Otras dependencias (ver `package.json` para la lista completa)

## Licencia

Este proyecto está licenciado bajo la Licencia Pública General de GNU (GPL). Para más detalles, consulta el archivo `LICENSE` en el repositorio.

## Agradecimientos

Agradecemos a la Universidad y a nuestros profesores por la orientación y el apoyo brindado durante el desarrollo de este proyecto.

---

Para cualquier consulta o problema, por favor abrir un issue en el repositorio del proyecto.
