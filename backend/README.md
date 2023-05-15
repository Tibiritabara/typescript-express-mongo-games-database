# Games database: Backend

This backend was entirely built on top of Typescript, harnessing express. This is my first grasp at this language. It follows a design-first approach, where the OpenAPI specification was manually written, to better understand the expected objects, responses and contracts that this API will offer. Based on that, the needed types for its operation where generated.

## Project Structure

The codebase structure is organized according to the functional aspects of each file and dependency. Each folder hosts relevant data or code for each capability.

* `src`: holds the typescript source code
* `build`: holds the `docker-compose.yaml` as well as the `Dockerfile`'s for the API and the background jobs.
* `spec`: holds the OpenAPI spec file. This was generated manually as part of the solution design. The types within the frontend and the background jobs are derived from this specification.
* `trending`: holds the background jobs code written in Python.
* `docs`: contains resources needed for the overall project documentation.

## Stack

The project is fully [OpenAPI 3.0.1](https://www.openapis.org/) compatible, along with the implementation of the [JSON API](https://jsonapi.org/) spec, and the [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902), following the latest standards and recommendations for the development of a REST API.

It harnesses `MongoDB` for data storage, and `redis` for events. Internally, the project harnesses `yarn` for package management, the API runs on top of `express`, and it's tests were developed on top of `jest`.

## Project execution

### Running all components

The project can be easily executed on top of Docker and Docker compose. Please ensure these components are installed locally on your machine. The project includes a convenient `Makefile` to simplify the building process, so feel free to just execute:

```bash
make run
```

The app will use the ports `8081` for the API, `27017` for the MongoDB instance, and `6379`for Redis. You will be able to access the api by hitting [http://localhost:8081/docs](http://localhost:8081/docs)

### Executing the API test suite

The API can be tested harnessing Docker and docker compose. Please ensure these components are installed locally on your machine. The project includes a convenient `Makefile` to simplify the test execution process, so feel free to just run:

```bash
make test
```

The tests harness a containerized `MongoDB` and `redis` to simplify it's testing.
