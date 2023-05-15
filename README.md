# Game Database: Storage and Trending

This project consists of a REST API on top of MongoDB and Redis, allowing users to perform CRUD operations on Game data. Additionally, to provide valuable insights to the users, I built a couple of background jobs that aggregate the relevant game statistics in a periodic basis, and calculates the rank and relevance of the game objects using a ZScore.

The components are highly customizable, with interfaces in all moving places to properly replace and enhance the functionality. The REST API was built on top of typescript and the backend jobs with Python.

The REST API is fully OpenAPI V3 and JSON:API compliant for easy consumption and integration.

## Architecture

![Architecture diagram](./docs/img/rest-api-diagram.png)

The REST API is the front facing part of the application and it was written in Typescript. It manages user input and store Game objects on MongoDB. It also exposes a couple endpoints to publish messages to a couple Redis queues: one to trigger stats accumulation for the game objects on a daily, and eventually monthly and yearly basis; and a second one to calculate how the game ranks among all other games in the database, so the trending objects can be explored.

Both Jobs run on top of Python, which opens the door for different types of data manipulation and analysis capabilities. They listen to messages on the Redis queues, do the stats accumulation, and write the final rankings back to the Mongo database.

For more details on each one of these components please go the ![REST API documentation](./backend/README.md) and the ![Jobs documentation](./trending/README.md).

### Project Structure

The codebase structure is organized according to the functional aspects of each file and dependency. Each folder hosts relevant data or code for each capability.

* `backend`: holds the entire REST API implementation using Typescript.
* `build`: holds the `docker-compose.yaml` as well as the `Dockerfile`'s for the API and the background jobs.
* `spec`: holds the OpenAPI spec file. This was generated manually as part of the solution design. The types within the frontend and the background jobs are derived from this specification.
* `trending`: holds the background jobs code written in Python.
* `docs`: contains resources needed for the overall project documentation.

## How to run the project

The project can be easily executed on top of Docker and Docker compose. Please ensure these components are installed locally on your machine. It includes a convenient `Makefile` to simplify the building process, so feel free to just execute:

```bash
make run-locally
```

## How to contribute

Any contributions you make are greatly appreciated. If you have a suggestion that would make this better, please fork the repo and create a pull request. For more details follow the ![Contribution guidelines](./CONTRIBUTING.md).

## Contact

Ricardo Santos Diaz - https://www.linkedin.com/in/ricardosantosdiaz/
