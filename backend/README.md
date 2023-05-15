# Games database: Backend

This backend was entirely built on top of Typescript, harnessing express. This is my first grasp at this language. It follows a design-first approach, where the OpenAPI specification was manually written, to better understand the expected objects, responses and contracts that this API will offer. Based on that, the needed types for its operation where generated.

## Project Structure

The codebase structure is organized according to the functional aspects of each file and dependency. Each folder hosts relevant data or code for each capability.

* `src`: holds the typescript source code
* `build`: holds the `docker-compose.yaml` as well as the `Dockerfile`'s for the API and the background jobs.
* `spec`: holds the OpenAPI spec file. This was generated manually as part of the solution design. The types within the frontend and the background jobs are derived from this specification.
* `trending`: holds the background jobs code written in Python.
* `docs`: contains resources needed for the overall project documentation.
