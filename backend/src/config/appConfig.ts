const AppConfig = {
    app: {
        name: process.env.APP_NAME || 'game-trend-api',
        server: process.env.APP_SERVER || 'localhost',
        isDevelopment: ['development', 'dev', 'local'].includes(
            <string>process.env.NODE_ENV
        ),
        port: parseInt(<string>process.env.APP_PORT, 10) || 3000,
        apiVersion: process.env.API_VERSION || 'v1',
        secret: process.env.SECRET || 'secret',
        specFile: process.env.SPEC_FILE || 'main.yaml',
    },
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        usernameLocal: process.env.DB_USERNAME,
        passwordLocal: process.env.DB_PASSWORD,
        port: parseInt(<string>process.env.DB_PORT, 10) || 27017,
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(<string>process.env.REDIS_PORT, 10) || 6379,
        queue: process.env.REDIS_QUEUE || 'gamestats',
    }
};

export default Object.freeze(AppConfig);
