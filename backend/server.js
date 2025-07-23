const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = require('./app');
const errorHandler = require('./middleware/errorHandler');
const validateEnv = require('./utils/validateEnv');
const userRoutes = require('./routes/userRoutes');
const lawyerRoutes = require('./routes/lawyerRoutes');

dotenv.config();

const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5175', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Legal Data endpoint
app.get('/api/legal-data', (req, res) => {
  res.json({
    general: {
      greeting: "Hello! I'm your legal assistant. How can I help you today?",
      farewell: "Thank you for using our service. Have a great day!",
      commonQuestions: [
        "What are my basic legal rights?",
        "How do I find the right lawyer?",
        "What should I do in case of legal emergency?"
      ]
    },
    criminal: {
      basics: {
        rights: ["Right to remain silent", "Right to legal representation", "Right to fair trial"],
        procedures: ["Filing FIR", "Bail process", "Court appearances"],
        commonOffenses: ["Theft", "Assault", "Cybercrime", "Fraud"]
      },
      bail: {
        types: ["Regular bail", "Anticipatory bail", "Interim bail"],
        process: "Steps for bail application and requirements"
      },
      penalties: {
        categories: ["Fines", "Imprisonment", "Community service"],
        factors: ["Nature of crime", "Previous record", "Circumstances"]
      }
    },
    civil: {
      categories: {
        property: ["Land disputes", "Tenant rights", "Property registration"],
        family: ["Divorce", "Child custody", "Inheritance"],
        contracts: ["Business agreements", "Employment contracts", "Consumer disputes"]
      },
      procedures: {
        filing: "Steps to file civil suit",
        timeline: "Expected duration and important dates",
        documentation: "Required documents and evidence"
      },
      remedies: ["Compensation", "Specific performance", "Injunction"]
    },
    corporate: {
      business: {
        registration: ["Company formation", "Partnership", "LLP"],
        compliance: ["Annual filings", "Tax obligations", "Labor laws"],
        disputes: ["Shareholder conflicts", "Contract breaches", "Mergers"]
      },
      intellectual: {
        patents: "Patent registration and protection",
        trademark: "Trademark filing and infringement",
        copyright: "Copyright registration and duration"
      }
    },
    family: {
      marriage: {
        registration: "Marriage registration process",
        rights: "Marital rights and obligations",
        disputes: "Matrimonial dispute resolution"
      },
      divorce: {
        grounds: ["Mutual consent", "Cruelty", "Desertion"],
        process: "Divorce filing and procedure",
        alimony: "Maintenance and settlements"
      },
      custody: {
        types: ["Physical custody", "Legal custody", "Joint custody"],
        factors: "Best interest of child principles"
      }
    },
    consumer: {
      rights: ["Right to safety", "Right to information", "Right to choice"],
      complaints: {
        process: "Filing consumer complaints",
        forum: ["District", "State", "National commission"],
        remedies: "Available compensations"
      },
      protection: {
        online: "E-commerce consumer protection",
        services: "Service provider obligations",
        products: "Product liability"
      }
    }
  });
});

// Routes
app.use('/api', userRoutes);
app.use('/api/lawyer', lawyerRoutes);

// Import models
require('./models');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// MongoDB Connection with port handling
const findAvailablePort = async (startPort) => {
  const net = require('net');
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
    server.listen(startPort, () => {
      server.close(() => {
        resolve(startPort);
      });
    });
  });
};

const startServer = async () => {
  try {
    await connectDB();
    const port = await findAvailablePort(process.env.PORT || 3001);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`API URL: http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error('Server error:', error);
    process.exit(1);
  }
};

startServer();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Add error handler after all routes
app.use(errorHandler);

validateEnv();