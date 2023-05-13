/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/games": {
    /**
     * Get and filter through all games 
     * @description Get and filter all games stored in the database
     */
    get: operations["getGames"];
    /**
     * Create a new Game 
     * @description Create and store a new game entry in the database
     */
    post: operations["createGame"];
  };
  "/games/{gameId}": {
    /**
     * Get a single game by Id 
     * @description Get a single game entry by its unique identifier
     */
    get: operations["getGameById"];
    /**
     * Update an existing game 
     * @description Update an existing game entry in the database
     */
    put: operations["updateGame"];
    /**
     * Delete an existing game 
     * @description Delete an existing game entry in the database
     */
    delete: operations["deleteGame"];
    /**
     * Partial update of game entry 
     * @description Execute a partial update of a given entry, harnessing the JSON Patch specification, or RFC 6902
     */
    patch: operations["patchGame"];
    parameters: {
      path: {
        gameId: components["parameters"]["GameId"];
      };
    };
  };
  "/trends/{period}": {
    /**
     * Calculate ranking 
     * @description Calculate the ranking for a given period
     */
    put: operations["getTrends"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @description Game object to be stored and managed by the service */
    Game: {
      /** @description Game title */
      title: string;
      /** @description Number of likes for the game */
      numberOfLikes?: number;
      /** @description Number of players for the game */
      numberOfPlayers?: number;
      /** @description Rank of the game */
      rank?: number;
      /**
       * Format: date-time 
       * @description Date and time when the game was created
       */
      createdAt?: string;
      /**
       * Format: date-time 
       * @description Date and time when the game was updated
       */
      updatedAt?: string;
    };
    /**
     * @description The type of an object 
     * @enum {string}
     */
    ObjectType: "games" | "trends";
    /** @description The id of an object */
    ObjectId: string;
    /** @description The attributes of an object */
    ObjectAttributes: components["schemas"]["Game"];
    /** @description Links to navigate paginated results */
    Links: {
      /**
       * Format: url 
       * @description The current page of the results
       */
      current?: string;
      /**
       * Format: url 
       * @description The first page of the results
       */
      first?: string;
      /**
       * Format: url 
       * @description The previous page of the results
       */
      prev?: string;
      /**
       * Format: url 
       * @description The next page of the results
       */
      next?: string;
      /**
       * Format: url 
       * @description The last page of the results
       */
      last?: string;
    };
    /** @description Metadata about the results */
    Meta: {
      /** @description additional status information relevant to the operation */
      status?: string;
      /** @description The number of results */
      count?: number;
    };
    /** @description A single object request */
    SingleObjectRequest: {
      data?: components["schemas"]["SingleObjectBody"];
    };
    /** @description A single object body */
    SingleObjectBody: {
      attributes?: components["schemas"]["Game"];
    };
    JsonPatchOperation: {
      /** @enum {string} */
      op: "add" | "remove" | "replace" | "move" | "copy" | "test" | "inc";
      /** @description The value to be changed/modified by the operation */
      value?: unknown;
      /** @description JSON Pointer, indicating the object attribute to be sourced for modification */
      from?: string;
      /** @description JSON pointer towards the target update location */
      path: string;
      /** @description The value to be incremented by the operation */
      inc?: number;
    };
    /** @description RFC6902 [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902) */
    JsonPatch: (components["schemas"]["JsonPatchOperation"])[];
    /** @description A single object response */
    SingleObjectResponse: {
      data?: components["schemas"]["SingleObjectData"];
      meta?: components["schemas"]["Meta"];
    };
    /** @description The data of a single object */
    SingleObjectData: {
      type?: components["schemas"]["ObjectType"];
      id?: components["schemas"]["ObjectId"];
      attributes?: components["schemas"]["ObjectAttributes"];
    };
    /** @description A multiple objects response */
    MultipleObjectsResponse: {
      data: (components["schemas"]["SingleObjectData"])[];
      links?: components["schemas"]["Links"];
      meta?: components["schemas"]["Meta"];
    };
    /** @description A pointer to a given error */
    ErrorPointer: {
      /** @description A JSON pointer following RFC6901 to the value on the request document that caused the error */
      pointer?: string;
    };
    /** @description A parameter that caused the error */
    ErrorParameter: {
      /** @description The name of the URI parameter that caused the error */
      parameter?: string;
    };
    /** @description Details and pointers to causes for a given error */
    ErrorDetails: {
      /** @description The title of the error */
      title: string;
      /** @description The details of the error */
      detail?: string;
      source?: components["schemas"]["ErrorPointer"] | components["schemas"]["ErrorParameter"];
    };
    /** @description An error response */
    ErrorResponse: {
      /**
       * Format: int32 
       * @description The error code 
       * @example 400
       */
      code?: number;
      errors?: (components["schemas"]["ErrorDetails"])[];
    };
  };
  responses: never;
  parameters: {
    /** @description ID of the game to be retrieved */
    GameId: components["schemas"]["ObjectId"];
    /** @description Page number to showcase the results */
    PageNumber?: number;
    /** @description Sort the results by game object attribute */
    Sort?: string;
    /** @description Number of results per page */
    PageSize?: number;
    /** @description Filter the results by title */
    Filter?: string;
    /** @description Period to get the trends for */
    TrendingPeriod: "day" | "week" | "month" | "year";
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /**
   * Get and filter through all games 
   * @description Get and filter all games stored in the database
   */
  getGames: {
    parameters: {
      query: {
        filter?: components["parameters"]["Filter"];
        "page[size]"?: components["parameters"]["PageSize"];
        "page[number]"?: components["parameters"]["PageNumber"];
        sort?: components["parameters"]["Sort"];
      };
    };
    responses: {
      /** @description Games retrieved */
      200: {
        content: {
          "application/vnd.api+json": components["schemas"]["MultipleObjectsResponse"];
        };
      };
      /** @description Bad request */
      400: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Games not found */
      404: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal server error */
      500: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  /**
   * Create a new Game 
   * @description Create and store a new game entry in the database
   */
  createGame: {
    /** @description Game object that needs to be added to the store */
    requestBody: {
      content: {
        "application/vnd.api+json": components["schemas"]["SingleObjectRequest"];
      };
    };
    responses: {
      /** @description Game created */
      201: {
        content: {
          "application/vnd.api+json": components["schemas"]["SingleObjectResponse"];
        };
      };
      /** @description Bad request */
      400: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal server error */
      500: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  /**
   * Get a single game by Id 
   * @description Get a single game entry by its unique identifier
   */
  getGameById: {
    parameters: {
      path: {
        gameId: components["parameters"]["GameId"];
      };
    };
    responses: {
      /** @description Game retrieved */
      200: {
        content: {
          "application/vnd.api+json": components["schemas"]["SingleObjectResponse"];
        };
      };
      /** @description Bad request */
      400: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Games not found */
      404: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal server error */
      500: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  /**
   * Update an existing game 
   * @description Update an existing game entry in the database
   */
  updateGame: {
    parameters: {
      path: {
        gameId: components["parameters"]["GameId"];
      };
    };
    /** @description Game object that needs to be updated in the store */
    requestBody: {
      content: {
        "application/vnd.api+json": components["schemas"]["SingleObjectRequest"];
      };
    };
    responses: {
      /** @description Game updated */
      200: {
        content: {
          "application/vnd.api+json": components["schemas"]["SingleObjectResponse"];
        };
      };
      /** @description Bad request */
      400: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Games not found */
      404: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal server error */
      500: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  /**
   * Delete an existing game 
   * @description Delete an existing game entry in the database
   */
  deleteGame: {
    parameters: {
      path: {
        gameId: components["parameters"]["GameId"];
      };
    };
    responses: {
      /** @description No content */
      204: never;
      /** @description Bad request */
      400: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal server error */
      500: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  /**
   * Partial update of game entry 
   * @description Execute a partial update of a given entry, harnessing the JSON Patch specification, or RFC 6902
   */
  patchGame: {
    parameters: {
      path: {
        gameId: components["parameters"]["GameId"];
      };
    };
    /** @description Game object that needs to be partially updated in the store */
    requestBody: {
      content: {
        "application/vnd.api+json": components["schemas"]["JsonPatch"];
      };
    };
    responses: {
      /** @description Game created */
      200: {
        content: {
          "application/vnd.api+json": components["schemas"]["SingleObjectResponse"];
        };
      };
      /** @description Games not found */
      404: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal server error */
      500: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
  /**
   * Calculate ranking 
   * @description Calculate the ranking for a given period
   */
  getTrends: {
    parameters: {
      path: {
        period: components["parameters"]["TrendingPeriod"];
      };
    };
    responses: {
      /** @description Game created */
      201: {
        content: {
          "application/vnd.api+json": components["schemas"]["SingleObjectResponse"];
        };
      };
      /** @description Bad request */
      400: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Internal server error */
      500: {
        content: {
          "application/vnd.api+json": components["schemas"]["ErrorResponse"];
        };
      };
    };
  };
}
