import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import { nanoid } from 'nanoid';
import { MongoClient, Db } from 'mongodb';

// MongoDB Client Initialization
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

async function getMongoDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (mongoDb) return mongoDb;
  try {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
    const dbName = process.env.MONGODB_DB_NAME || 'challengers_academy';
    mongoDb = mongoClient.db(dbName);
    console.log(` Connected to MongoDB Database: "${dbName}"`);
    return mongoDb;
  } catch (err: any) {
    console.warn('⚠️ MongoDB connection error:', err.message);
    return null;
  }
}

// Lazy init Stripe
let stripeInstance: Stripe | null = null;
function getStripe() {
  if (!stripeInstance) {
    const secret_key = process.env.STRIPE_SECRET_KEY;
    if (!secret_key) {
      console.warn('Stripe secret key missing. Using mock mode.');
      return null;
    }
    stripeInstance = new Stripe(secret_key, {
      apiVersion: '2025-01-27' as any,
    });
  }
  return stripeInstance;
}

// Session & Program Catalog with full metadata
export interface SessionCatalogItem {
  id: string;
  name: string;
  category: string;
  ageGroup: string;
  skillLevel: string;
  location: string;
  locationAddress: string;
  schedule: string;
  dates: string;
  time: string;
  price: number;
  capacity: number;
  filled: number;
  coach: string;
  description: string;
}

export const SESSIONS_CATALOG: Record<string, SessionCatalogItem> = {
  'little-spikers-fremont': {
    id: 'little-spikers-fremont',
    name: 'Little Spikers Foundation',
    category: 'Junior Training',
    ageGroup: 'Ages 5 - 10',
    skillLevel: 'Beginner / First Timers',
    location: 'Fremont Arena',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: 'Saturdays & Sundays',
    dates: 'Starting Next Weekend',
    time: '9:00 AM – 10:30 AM',
    price: 200,
    capacity: 20,
    filled: 12,
    coach: 'Wilson Mathew & Team',
    description: 'Motor skills, fun movement drills, basic ball control, and encouraging teamwork.'
  },
  'youth-foundations-fremont': {
    id: 'youth-foundations-fremont',
    name: 'Youth Foundations Intensive',
    category: 'Development Program',
    ageGroup: 'Ages 11 - 14',
    skillLevel: 'Beginner to Intermediate',
    location: 'Fremont Arena',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: 'Tuesday & Thursday Evenings',
    dates: 'Bi-Weekly Batches',
    time: '5:30 PM – 7:30 PM',
    price: 250,
    capacity: 25,
    filled: 18,
    coach: 'Coach Wilson Mathew',
    description: 'Technical serving power, passing precision, 6-2 rotation fundamentals, and school tryout prep.'
  },
  'high-school-prep-tracy': {
    id: 'high-school-prep-tracy',
    name: 'High School Prep & Varsity Camp',
    category: 'Elite Preparation',
    ageGroup: 'Ages 14 - 18',
    skillLevel: 'Intermediate to Advanced',
    location: 'Tracy Sports Complex',
    locationAddress: '1255 N Tracy Blvd, Tracy, CA',
    schedule: 'Monday, Wednesday & Friday',
    dates: 'Monthly Intensive',
    time: '6:00 PM – 8:00 PM',
    price: 300,
    capacity: 20,
    filled: 15,
    coach: 'Coach Sarah & Michael',
    description: 'High-speed game reads, jump float serves, aggressive blocking, and situational scrimmage play.'
  },
  'summer-camp-2026-fremont': {
    id: 'summer-camp-2026-fremont',
    name: 'Summer Elite 7-Day Camp',
    category: 'Summer Intensive',
    ageGroup: 'Ages 8 - 17 (Grouped by Skill)',
    skillLevel: 'All Skill Levels Welcome',
    location: 'Fremont Central Courts',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: 'Monday through Sunday (Full Week)',
    dates: 'July 14 – July 20, 2026',
    time: '9:00 AM – 1:00 PM (Half-Day)',
    price: 350,
    capacity: 50,
    filled: 42,
    coach: 'Wilson Mathew & Senior Staff',
    description: 'Immersive 7-day volleyball boot camp covering position specialization, competitive matches, and video breakdown.'
  },
  'starter-pack': {
    id: 'starter-pack',
    name: 'Starter Pack (4 Sessions)',
    category: 'Regular Coaching',
    ageGroup: 'All Ages Welcome',
    skillLevel: 'Beginner',
    location: 'Fremont Arena',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: 'Weekend Batches (Sat / Sun)',
    dates: 'Flexible Start',
    time: '10:00 AM – 12:00 PM',
    price: 200,
    capacity: 30,
    filled: 19,
    coach: 'Wilson Mathew',
    description: 'Four focused fundamental training sessions with personalized technique corrections.'
  },
  'get-serious': {
    id: 'get-serious',
    name: 'Get Serious Package (12 Sessions)',
    category: 'Regular Coaching',
    ageGroup: 'Ages 11 - 18',
    skillLevel: 'Intermediate to Advanced',
    location: 'Fremont / Tracy Facility',
    locationAddress: '43575 Mission Blvd, Fremont, CA',
    schedule: '3 Days / Week',
    dates: 'Rolling Monthly Enrollment',
    time: '5:00 PM – 7:00 PM',
    price: 550,
    capacity: 25,
    filled: 18,
    coach: 'Wilson Mathew & Specialist Staff',
    description: '12 dedicated sessions focused on position mastery, physical conditioning, and tournament prep.'
  },
  'all-in': {
    id: 'all-in',
    name: 'All-In Master Package (20 Sessions)',
    category: 'Regular Coaching',
    ageGroup: 'All Ages',
    skillLevel: 'Comprehensive Progression',
    location: 'All Academy Locations',
    locationAddress: 'Bay Area Training Centers',
    schedule: 'Flexible Schedule',
    dates: 'Full Season Pass',
    time: 'Flexible Booking',
    price: 900,
    capacity: 20,
    filled: 14,
    coach: 'Full Coaching Staff',
    description: 'Complete 20-session athlete development package with biomechanical analysis and radar speed checks.'
  }
};

// In-memory Database for Leads and Confirmed Registrations
export interface RegistrationRecord {
  registrationId: string;
  sessionId: string;
  sessionName: string;
  playerName: string;
  parentName?: string;
  email: string;
  phone: string;
  dob?: string;
  age?: string;
  location: string;
  schedule: string;
  amountPaid: number;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  waiverAccepted: boolean;
  registeredAt: number;
}

const registrations: Record<string, RegistrationRecord> = {};
const leads: Record<string, any> = {};

// Helper: Save registration to memory and MongoDB
async function saveRegistrationToDb(reg: RegistrationRecord) {
  registrations[reg.registrationId] = reg;
  const db = await getMongoDb();
  if (db) {
    try {
      await db.collection('registrations').updateOne(
        { registrationId: reg.registrationId },
        { $set: reg },
        { upsert: true }
      );
      console.log(` Saved registration ${reg.registrationId} to MongoDB`);
    } catch (err: any) {
      console.error('MongoDB save registration error:', err.message);
    }
  }
}

// Helper: Save lead to memory and MongoDB
async function saveLeadToDb(lead: any) {
  leads[lead.id] = lead;
  const db = await getMongoDb();
  if (db) {
    try {
      await db.collection('leads').updateOne(
        { id: lead.id },
        { $set: lead },
        { upsert: true }
      );
    } catch (err: any) {
      console.error('MongoDB save lead error:', err.message);
    }
  }
}

// Helper: Generate unique CVA Registration ID
function generateRegistrationId(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `CVA-${num}`;
}

// Automated Email Notification Service
async function sendAdminNotificationEmail(reg: RegistrationRecord) {
  const adminEmail = process.env.ACADEMY_ADMIN_EMAIL || 'admin@challengersvolleyball.com';
  console.log(`\n======================================================`);
  console.log(`📧 [EMAIL DISPATCH] → ADMIN NOTIFICATION`);
  console.log(`To: ${adminEmail}`);
  console.log(`Subject: New Session Registration & Payment Received 🎉`);
  console.log(`------------------------------------------------------`);
  console.log(`Player Name:       ${reg.playerName}`);
  console.log(`Parent/Guardian:   ${reg.parentName || 'N/A'}`);
  console.log(`Customer Email:    ${reg.email}`);
  console.log(`Phone Number:      ${reg.phone}`);
  console.log(`Program/Session:   ${reg.sessionName}`);
  console.log(`Schedule & Dates:  ${reg.schedule}`);
  console.log(`Location:          ${reg.location}`);
  console.log(`Registration ID:   ${reg.registrationId}`);
  console.log(`Stripe Payment ID: ${reg.stripePaymentIntentId || reg.stripeSessionId || 'N/A'}`);
  console.log(`Amount Paid:       $${reg.amountPaid}`);
  console.log(`Payment Status:    ${reg.paymentStatus}`);
  console.log(`Timestamp:         ${new Date(reg.registeredAt).toISOString()}`);
  console.log(`Dashboard Link:    http://localhost:3000/admin?id=${reg.registrationId}`);
  console.log(`======================================================\n`);
}

async function sendCustomerConfirmationEmail(reg: RegistrationRecord) {
  console.log(`\n======================================================`);
  console.log(`📧 [EMAIL DISPATCH] → CUSTOMER CONFIRMATION`);
  console.log(`To: ${reg.email}`);
  console.log(`Subject: Registration Confirmed! 🎉 - Challengers Volleyball Academy`);
  console.log(`------------------------------------------------------`);
  console.log(`Dear ${reg.parentName ? reg.parentName + ' (' + reg.playerName + ')' : reg.playerName},`);
  console.log(`Thank you for enrolling in Challengers Volleyball Academy!`);
  console.log(`Booking ID:   ${reg.registrationId}`);
  console.log(`Program:      ${reg.sessionName}`);
  console.log(`Location:     ${reg.location}`);
  console.log(`Schedule:     ${reg.schedule}`);
  console.log(`Total Paid:   $${reg.amountPaid} (PAID)`);
  console.log(`Questions? Contact us at info@challengersvolleyball.com | (510) 555-0199`);
  console.log(`======================================================\n`);
}

let galleryItems = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc', title: 'Elite Training Session', description: 'Core strength and tactical positioning.' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04', title: 'Championship Finals', description: 'The moment of victory for our under-17 squad.' },
  { id: '3', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-basketball-player-practicing-a-slam-dunk-2045-large.mp4', title: 'Dunk Highlights', description: 'Advanced aerial maneuvers workshop.' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a', title: 'Outdoor Drills', description: 'Building endurance in natural environments.' }
];

async function startServer() {
  const app = express();
  const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // 1. Stripe Raw Webhook Endpoint (MUST be before express.json() for signature verification)
  app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripe = getStripe();

    let event: Stripe.Event | any = null;

    if (stripe && webhookSecret && sig) {
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch (err: any) {
        console.error(`⚠️ Webhook signature verification failed:`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    } else {
      // Fallback parser for testing/mock webhook events
      try {
        event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      } catch {
        event = req.body;
      }
    }

    console.log(`🔔 Stripe Webhook Received: ${event?.type || 'unknown_event'}`);

    if (event?.type === 'payment_intent.succeeded' || event?.type === 'checkout.session.completed') {
      const sessionOrIntent = event.data?.object;
      const metadata = sessionOrIntent?.metadata || {};
      const registrationId = metadata.registrationId || `CVA-${Math.floor(10000 + Math.random() * 90000)}`;

      // Idempotency check: prevent duplicate registration if already confirmed
      if (registrations[registrationId]) {
        console.log(`ℹ️ Registration ${registrationId} already confirmed. Skipping duplicate.`);
        return res.json({ received: true, alreadyProcessed: true });
      }

      const sessionId = metadata.sessionId || 'starter-pack';
      const sessionItem = SESSIONS_CATALOG[sessionId];
      const amountPaid = sessionOrIntent.amount_total 
        ? sessionOrIntent.amount_total / 100 
        : (sessionOrIntent.amount ? sessionOrIntent.amount / 100 : (sessionItem?.price || 200));

      const newRegistration: RegistrationRecord = {
        registrationId,
        sessionId,
        sessionName: metadata.sessionName || sessionItem?.name || 'Challengers Coaching Session',
        playerName: metadata.playerName || metadata.studentName || 'Student Athlete',
        parentName: metadata.parentName || '',
        email: metadata.email || metadata.primaryEmail || sessionOrIntent.customer_details?.email || 'customer@example.com',
        phone: metadata.phone || metadata.primaryPhone || 'N/A',
        dob: metadata.dob || '',
        location: metadata.location || sessionItem?.location || 'Fremont Arena',
        schedule: metadata.schedule || sessionItem?.schedule || 'Weekend Sessions',
        amountPaid,
        paymentStatus: 'PAID',
        stripePaymentIntentId: sessionOrIntent.payment_intent || sessionOrIntent.id,
        stripeSessionId: sessionOrIntent.id,
        emergencyContactName: metadata.emergencyContactName || '',
        emergencyContactPhone: metadata.emergencyContactPhone || '',
        waiverAccepted: metadata.waiverAccepted === 'true' || metadata.waiverAccepted === true,
        registeredAt: Date.now()
      };

      // Save to database (memory + Firestore)
      await saveRegistrationToDb(newRegistration);

      // Increment booked spots
      if (sessionItem && sessionItem.filled < sessionItem.capacity) {
        sessionItem.filled += 1;
      }

      // Update lead if linked
      if (metadata.leadId && leads[metadata.leadId]) {
        leads[metadata.leadId].status = 'confirmed';
        leads[metadata.leadId].registrationId = registrationId;
      }

      // Dispatch automated emails
      await sendAdminNotificationEmail(newRegistration);
      await sendCustomerConfirmationEmail(newRegistration);
    }

    res.json({ received: true });
  });

  // Standard JSON parser for all subsequent endpoints
  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Session Catalogue & Availability API
  app.get('/api/sessions', (req, res) => {
    res.json({ success: true, sessions: Object.values(SESSIONS_CATALOG) });
  });

  app.get('/api/sessions/:id', (req, res) => {
    const session = SESSIONS_CATALOG[req.params.id];
    if (session) {
      res.json({ success: true, session });
    } else {
      res.status(404).json({ success: false, message: 'Session not found' });
    }
  });

  // Create Registration & Payment Intent Flow
  app.post('/api/create-payment-intent', async (req, res) => {
    const {
      sessionId,
      playerName,
      parentName,
      email,
      phone,
      dob,
      emergencyContactName,
      emergencyContactPhone,
      waiverAccepted
    } = req.body;

    const session = SESSIONS_CATALOG[sessionId] || SESSIONS_CATALOG['starter-pack'];
    if (!session) {
      return res.status(400).json({ success: false, message: 'Invalid session selected' });
    }

    if (session.filled >= session.capacity) {
      return res.status(400).json({ success: false, message: 'This session is currently at full capacity.' });
    }

    const registrationId = generateRegistrationId();
    const leadId = nanoid();
    const amountInCents = Math.round(session.price * 100);

    const metadata: Record<string, string> = {
      registrationId,
      leadId,
      sessionId: session.id,
      sessionName: session.name,
      playerName: playerName || '',
      parentName: parentName || '',
      email: email || '',
      phone: phone || '',
      dob: dob || '',
      location: session.location,
      schedule: session.schedule,
      emergencyContactName: emergencyContactName || '',
      emergencyContactPhone: emergencyContactPhone || '',
      waiverAccepted: String(waiverAccepted)
    };

    // Pre-save lead in memory
    leads[leadId] = {
      id: leadId,
      registrationId,
      ...metadata,
      amount: session.price,
      status: 'pending_payment',
      createdAt: Date.now()
    };

    const stripe = getStripe();

    if (!stripe) {
      // Mock clientSecret for development/testing when Stripe key is not configured
      const mockSecret = `mock_pi_${registrationId}_secret_${nanoid(8)}`;
      return res.json({
        success: true,
        clientSecret: mockSecret,
        registrationId,
        leadId,
        amount: session.price,
        session
      });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        receipt_email: email,
        metadata
      });

      res.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        registrationId,
        leadId,
        amount: session.price,
        session
      });
    } catch (err: any) {
      console.error('Payment intent creation failed:', err);
      res.status(500).json({ success: false, message: err.message || 'Payment initiation failed' });
    }
  });

  // Verify and finalize payment (supports instant webhook fallback and mock confirmations)
  app.post('/api/verify-payment', async (req, res) => {
    const { paymentIntentId, registrationId, leadId } = req.body;

    // Check if webhook already confirmed this registration
    if (registrationId && registrations[registrationId]) {
      return res.json({ success: true, registration: registrations[registrationId] });
    }

    const lead = leadId ? leads[leadId] : null;
    const regId = registrationId || lead?.registrationId || generateRegistrationId();
    const sessionId = lead?.sessionId || 'starter-pack';
    const session = SESSIONS_CATALOG[sessionId];

    const stripe = getStripe();

    if (!stripe || (paymentIntentId && paymentIntentId.startsWith('mock_'))) {
      // Confirmed in development / mock mode
      const confirmedReg: RegistrationRecord = {
        registrationId: regId,
        sessionId: session?.id || 'starter-pack',
        sessionName: session?.name || 'Challengers Coaching Session',
        playerName: lead?.playerName || 'Student Athlete',
        parentName: lead?.parentName || '',
        email: lead?.email || 'customer@example.com',
        phone: lead?.phone || 'N/A',
        dob: lead?.dob || '',
        location: session?.location || 'Fremont Arena',
        schedule: session?.schedule || 'Weekend Sessions',
        amountPaid: session?.price || 200,
        paymentStatus: 'PAID',
        stripePaymentIntentId: paymentIntentId || `mock_pi_${regId}`,
        emergencyContactName: lead?.emergencyContactName || '',
        emergencyContactPhone: lead?.emergencyContactPhone || '',
        waiverAccepted: true,
        registeredAt: Date.now()
      };

      await saveRegistrationToDb(confirmedReg);
      if (session && session.filled < session.capacity) {
        session.filled += 1;
      }
      if (lead) {
        lead.status = 'confirmed';
      }

      await sendAdminNotificationEmail(confirmedReg);
      await sendCustomerConfirmationEmail(confirmedReg);

      return res.json({ success: true, registration: confirmedReg });
    }

    try {
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (intent.status === 'succeeded') {
        const metadata = intent.metadata || {};
        const confirmedReg: RegistrationRecord = {
          registrationId: regId,
          sessionId: metadata.sessionId || session?.id || 'starter-pack',
          sessionName: metadata.sessionName || session?.name || 'Challengers Coaching Session',
          playerName: metadata.playerName || lead?.playerName || 'Student Athlete',
          parentName: metadata.parentName || lead?.parentName || '',
          email: metadata.email || lead?.email || intent.receipt_email || 'customer@example.com',
          phone: metadata.phone || lead?.phone || 'N/A',
          dob: metadata.dob || lead?.dob || '',
          location: metadata.location || session?.location || 'Fremont Arena',
          schedule: metadata.schedule || session?.schedule || 'Weekend Sessions',
          amountPaid: intent.amount / 100,
          paymentStatus: 'PAID',
          stripePaymentIntentId: intent.id,
          emergencyContactName: metadata.emergencyContactName || '',
          emergencyContactPhone: metadata.emergencyContactPhone || '',
          waiverAccepted: true,
          registeredAt: Date.now()
        };

        await saveRegistrationToDb(confirmedReg);
        if (session && session.filled < session.capacity) {
          session.filled += 1;
        }

        await sendAdminNotificationEmail(confirmedReg);
        await sendCustomerConfirmationEmail(confirmedReg);

        res.json({ success: true, registration: confirmedReg });
      } else {
        res.status(400).json({ success: false, message: `Payment status: ${intent.status}` });
      }
    } catch (err: any) {
      console.error('Payment verification failed:', err);
      res.status(500).json({ success: false, message: 'Verification error' });
    }
  });

  // Query Registration by ID (for confirmation refresh & admin)
  app.get('/api/registrations/:id', async (req, res) => {
    let reg = registrations[req.params.id];
    if (!reg) {
      const db = await getMongoDb();
      if (db) {
        try {
          const doc = await db.collection('registrations').findOne({ registrationId: req.params.id });
          if (doc) reg = doc as any;
        } catch (err: any) {
          console.error('MongoDB find registration error:', err.message);
        }
      }
    }
    if (reg) {
      res.json({ success: true, registration: reg });
    } else {
      res.status(404).json({ success: false, message: 'Registration not found' });
    }
  });

  // Contact Form API
  app.post('/api/contact', (req, res) => {
    console.log('Contact form submission:', req.body);
    res.json({ success: true, message: 'Message sent successfully.' });
  });

  // Admin API (Secured)
  app.get('/api/admin/stats', async (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== 'Bearer admin123') return res.status(401).json({ success: false });

    let allRegistrations = Object.values(registrations);
    let allLeads = Object.values(leads);

    const db = await getMongoDb();
    if (db) {
      try {
        const mongoRegs = await db.collection('registrations').find().toArray();
        if (mongoRegs.length > 0) allRegistrations = mongoRegs as any;
        const mongoLeads = await db.collection('leads').find().toArray();
        if (mongoLeads.length > 0) allLeads = mongoLeads as any;
      } catch (err: any) {
        console.error('MongoDB stats query error:', err.message);
      }
    }

    res.json({
      success: true,
      stats: {
        totalRegistrations: allRegistrations.length,
        totalRevenue: allRegistrations.reduce((sum, r) => sum + r.amountPaid, 0),
        sessions: SESSIONS_CATALOG
      },
      registrations: allRegistrations.sort((a, b) => b.registeredAt - a.registeredAt),
      leads: allLeads.sort((a, b) => b.createdAt - a.createdAt),
      gallery: galleryItems
    });
  });

  // Public Gallery API
  app.get('/api/gallery', (req, res) => {
    res.json({ success: true, items: galleryItems });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  function listen(port: number) {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`\n  🚀 Server running on http://localhost:${port}\n`);
    });

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`  ⚠️  Port ${port} is already in use. Trying port ${port + 1}...`);
        listen(port + 1);
      } else {
        console.error('Failed to start server:', err);
        process.exit(1);
      }
    });
  }

  listen(DEFAULT_PORT);
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
