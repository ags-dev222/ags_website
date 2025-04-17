import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Association Of Ghana Startups API',
            version: '1.0.0',
            description: 'Backend API for AGS',
        },
        servers: [
            {
                url: "http://localhost:5173/api",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token in the format: Bearer <token>",
                },
            },
        },
        security: [
            {
                BearerAuth: []
            }
        ],
        tags: [
            { name: 'Authentication' },
            {name: 'Authorization' },
            { name: 'Blog' },
            { name: 'Event' },
            { name: 'Resource' },
            { name: 'Signup' },
            { name: 'Startup' },
            { name: 'Testimonial' },
            { name: 'Investors' }
        ]

    },
    apis: [
        './routes/auth.js',
        './routes/blogRoute.js',
        './routes/eventsRoute.js',
        './routes/resourcesRoute.js',
        './routes/signupRoute.js',
        './routes/StartupRoute.js',
        './routes/testimonialRoute.js',
        './routes/investorRoute.js',
        './models/Blog.js',
        './models/Event.js',
        './models/resources.js',
        './models/signup.js',
        './models/Startup.js',
        './models/Testimonial.js',
        './models/User.js',
        './models/Comment.js',
        './models/Investor.js',

    ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};

export { swaggerUi, swaggerSpec, swaggerDocs };
