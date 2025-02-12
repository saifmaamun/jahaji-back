import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

// import router from './app/routes';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api', router);

app.get('/', (req: Request, res) => {
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fashion - Backend Overview</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            color: #333;
        }

        .container {
            flex: 1;
            width: 90%;
            max-width: 1000px;
            margin: 40px auto;
        }

        h1 {
            font-size: 2.5rem;
            color: #0d2040;
            text-align: center;
            margin-bottom: 20px;
        }

        .overview, .section {
            margin-bottom: 40px;
        }

        p, ul {
            font-size: 1rem;
            line-height: 1.7;
            color: #555;
        }

        ul {
            list-style: none;
        }

        ul li {
            position: relative;
            margin-bottom: 10px;
        }

        ul li::before {
            content: '•';
            color: #1a73e8;
            font-weight: bold;
            margin-right: 10px;
            font-size: 1.2rem;
        }

        a {
            color: #1a73e8;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        footer {
            background-color: #bfdbff;
            color: white;
            text-align: center;
            padding: 20px 0;
            margin-top: auto;
            font-size: 0.9rem;
        }

        footer p {
            margin-bottom: 5px;
        }

        footer a {
            color: black;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Welcome to the Men’s Pants Store!</h1>

        <div class="overview">
            <p>
                <strong>Men's Pants Store</strong> is an e-commerce platform offering a wide variety of stylish and comfortable pants for men. Our platform provides easy browsing, secure payment options, and fast shipping. Explore our collections, manage your cart, and shop your perfect fit.
            </p>
        </div>

        <div class="section">
            <h2>E-Commerce Details</h2>
            <ul>
                <li><strong>Tech Stack:</strong> Node.js, Express.js, MongoDB, Mongoose</li>
                <li><strong>Frontend:</strong> React, Redux, TypeScript (separate management)</li>
                <li><strong>Deployment:</strong> Vercel for frontend, backend hosted here</li>
                <li><strong>API Routes:</strong> Manage products, users, orders, and payment processing via REST APIs.</li>
            </ul>
        </div>

        <div class="section">
            <h2>Key Features</h2>
            <ul>
                <li>Product Catalog (Men's Pants in various styles and sizes)</li>
                <li>Customer Registration and Login</li>
                <li>Shopping Cart and Checkout</li>
                <li>Order Tracking and History</li>
                <li>Payment Integration (Credit Card, PayPal, etc.)</li>
                <li>Profile and Address Management</li>
                <li>Product Search and Filters (Size, Color, Price Range)</li>
                <li>Discounts and Promotions</li>
            </ul>
        </div>

        <div class="section">
            <h2>Developer Information</h2>
            <p>
                This backend is built and maintained by a dedicated team of developers. For more details, contributions, or to report issues, visit our GitHub repository.
            </p>
            <p><a href="https://github.com/saifmaamun">View on GitHub</a></p>
        </div>
    </div>

    <footer>
        <p>© 2024 Men's Pants Store | Powered by Node.js & MongoDB</p>
        <p><a href="https://github.com/saifmaamun">GitHub Repository</a></p>
    </footer>

</body>

</html>

                `);
});


app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
