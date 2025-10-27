const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger yapılandırması
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Address Book API',
      version: '1.0.0',
      description: 'REST API for managing contacts in an address book',
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', './server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// In-memory database
let contacts = [
  {
    id: 1,
    firstName: 'Alan',
    lastName: 'Turing',
    email: 'alan.turing@suring.com',
    phone: '+1-555-0101',
    tag: 'Work'
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Curie',
    email: 'marie.curie@science.com',
    phone: '+1-555-0102',
    tag: 'Work'
  },
  {
    id: 3,
    firstName: 'Katherine',
    lastName: 'Johnson',
    email: 'katherine.johnson@nasa.com',
    phone: '+1-555-0103',
    tag: 'Family'
  },
  {
    id: 4,
    firstName: 'Charles',
    lastName: 'Darwin',
    email: 'charles.darwin@evolution.com',
    phone: '+1-555-0104',
    tag: 'Friend'
  }
];

let nextId = 5;

// Contact Service
const contactService = {
  getAll: (query) => {
    if (!query) return contacts;
    
    const searchTerm = query.toLowerCase();
    return contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(searchTerm) ||
      contact.lastName.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.tag.toLowerCase().includes(searchTerm) ||
      contact.phone.includes(searchTerm)
    );
  },
  
  getById: (id) => {
    return contacts.find(c => c.id === id);
  },
  
  create: (contactData) => {
    const newContact = {
      id: nextId++,
      ...contactData
    };
    contacts.push(newContact);
    return newContact;
  },
  
  update: (id, contactData) => {
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    contacts[index] = {
      ...contacts[index],
      ...contactData
    };
    return contacts[index];
  },
  
  delete: (id) => {
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    return contacts.splice(index, 1)[0];
  }
};

// Routes
/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts or search contacts
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, email, phone, or tag
 *     responses:
 *       200:
 *         description: List of contacts
 */
app.get('/api/contacts', (req, res) => {
  const contacts = contactService.getAll(req.query.search);
  res.json(contacts);
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Contact not found
 */
app.get('/api/contacts/:id', (req, res) => {
  const contact = contactService.getById(parseInt(req.params.id));
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.json(contact);
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               tag:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 */
app.post('/api/contacts', (req, res) => {
  const { firstName, lastName, email, phone, tag } = req.body;
  
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'FirstName, LastName, and Email are required' });
  }
  
  const newContact = contactService.create({ firstName, lastName, email, phone, tag });
  res.status(201).json(newContact);
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               tag:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 */
app.put('/api/contacts/:id', (req, res) => {
  const updated = contactService.update(parseInt(req.params.id), req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.json(updated);
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 */
app.delete('/api/contacts/:id', (req, res) => {
  const deleted = contactService.delete(parseInt(req.params.id));
  if (!deleted) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.json(deleted);
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Address Book API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Address Book API',
    version: '1.0.0',
    endpoints: {
      contacts: '/api/contacts',
      swagger: '/api-docs'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Address Book API is running on http://localhost:${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;

