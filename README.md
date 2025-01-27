# NodeJS Boilerplate V2

Stack:

- NodeJS
- Typescript
- Express
- PostgreSQL
- Prisma
- Redis

This project uses a modular structure, which allows for separating functionalities or parts of the system into distinct modules. For starters, there is an `auth` module.

Each module contains the following:
- A `<module>.service.ts` file that houses the service class which contains services as methods.
- A `<module>.controller.ts` file to house HTTP controllers that call the services
- A `<module>.dto.ts` file to store the validator classes
- A `<<module>.util.ts` to contain module scoped utils

```
# Modules Directory Structure

modules-v1/
├── auth/ # auth module
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   └── auth.dto.ts
│   └── auth.util.ts
```

Each module corresponds to a subdivision or sub-route of the API. E.g `modules-v1/auth` corresponds to the `/v1/auth/` route.

Using modules promotes separation of concerns and helps keep the code organized, making it easier to locate specific parts of the application.

## Database

Prisma is the ORM of choice for this boilerplate, offering seamless integration with TypeScript. 
PostgreSQL is the primary database, though MySQL can also be used.

The `database/repositories` directory houses repositories for the various tables. Repositories are used to abstract the data layer. Directly calling Prisma methods within services can make it difficult to test, swap ORMs, or modify functionality. By using repositories, we provide a consistent interface for services without exposing the underlying data-layer logic.

See [Why it's bad practice to not use repositories with Prisma.](https://www.reddit.com/r/nestjs/comments/1fc6weh/why_is_bad_practice_not_use_repository_with_prisma/?rdt=44896)

## Tests
Tests can be found in the `test` directory. We mostly work with integration tests but unit tests can also be written. 

There is `Documentator` instance used in the integration tests to help document API endpoints in an OpenAPI spec. The generated documentation can be found at `documentation/api.json`. This JSON data can be used in the [Swagger Editor](https://editor.swagger.io) to display the API documentation.