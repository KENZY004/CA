import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import { nanoid } from 'nanoid';

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

// In-memory mock DB
const leads: Record<string, any> = {
  'lead_1': {
    id: 'lead_1',
    fullName: 'Marcus Thompson',
    email: 'marcus@example.com',
    phone: '555-0123',
    programId: 'p-elite',
    batch: 'Batch A (Mon/Wed)',
    status: 'confirmed',
    createdAt: Date.now() - 1000 * 60 * 60 * 2 // 2 hours ago
  },
  'lead_2': {
    id: 'lead_2',
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '555-0456',
    programId: 'p-intermediate',
    batch: 'Batch B (Tue/Thu)',
    status: 'inquiry',
    createdAt: Date.now() - 1000 * 60 * 15 // 15 mins ago
  },
  'lead_3': {
    id: 'lead_3',
    fullName: 'David Chen',
    email: 'd.chen@example.com',
    phone: '555-0789',
    programId: 'p-beginner',
    batch: 'Batch C (Sat)',
    status: 'confirmed',
    createdAt: Date.now() - 1000 * 60 * 60 * 5 // 5 hours ago
  }
};

let galleryItems = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc', title: 'Elite Training Session', description: 'Core strength and tactical positioning.' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04', title: 'Championship Finals', description: 'The moment of victory for our under-17 squad.' },
  { id: '3', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-basketball-player-practicing-a-slam-dunk-2045-large.mp4', title: 'Dunk Highlights', description: 'Advanced aerial maneuvers workshop.' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a', title: 'Outdoor Drills', description: 'Building endurance in natural environments.' }
];

const PROGRAM_CAPACITY: Record<string, { filled: number, capacity: number, fee: number }> = {
  'little-spikers': { filled: 12, capacity: 20, fee: 200 },
  'youth-foundations': { filled: 18, capacity: 25, fee: 250 },
  'high-school-prep': { filled: 15, capacity: 20, fee: 300 },
  'all-ages-clinics': { filled: 25, capacity: 40, fee: 150 },
  'competitive-league': { filled: 30, capacity: 40, fee: 350 },
  'summer-camp-2026-fremont': { filled: 45, capacity: 50, fee: 350 },
  'skills-clinic-tracy': { filled: 12, capacity: 20, fee: 150 },
};

async function startServer() {
  const app = express();
  const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Registration Flow API
  app.get('/api/availability', (req, res) => {
    res.json({ success: true, availability: PROGRAM_CAPACITY });
  });

  app.post('/api/leads', (req, res) => {
    const { programId } = req.body;
    const cap = PROGRAM_CAPACITY[programId as keyof typeof PROGRAM_CAPACITY];
    
    if (cap && cap.filled >= cap.capacity) {
      return res.status(400).json({ success: false, message: 'Program is full' });
    }

    const leadId = nanoid();
    const lead = {
      ...req.body,
      id: leadId,
      status: 'inquiry',
      createdAt: Date.now()
    };
    leads[leadId] = lead;
    console.log('Lead captured:', lead);
    res.json({ success: true, leadId });
  });

  app.get('/api/leads/:id', (req, res) => {
    const lead = leads[req.params.id];
    if (lead) {
      res.json({ success: true, lead });
    } else {
      res.status(404).json({ success: false, message: 'Lead not found' });
    }
  });

  app.post('/api/create-payment-intent', async (req, res) => {
    const { leadId } = req.body;
    const lead = leads[leadId];
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    
    const cap = PROGRAM_CAPACITY[lead.programId as keyof typeof PROGRAM_CAPACITY];
    const amount = cap ? cap.fee : 500;

    const stripe = getStripe();

    if (!stripe) {
      // Mock order for demo if keys are missing
      return res.json({ 
        success: true, 
        clientSecret: 'mock_secret_' + nanoid(), 
        amount: amount * 100
      });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // amount in cents
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        metadata: { leadId },
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Payment intent creation failed' });
    }
  });

  app.post('/api/verify-payment', async (req, res) => {
    const { paymentIntentId, leadId } = req.body;
    
    const stripe = getStripe();
    if (!stripe || paymentIntentId.startsWith('mock_')) {
      // Mock success
      if (leads[leadId]) {
        leads[leadId].status = 'confirmed';
        const progId = leads[leadId].programId;
        if (PROGRAM_CAPACITY[progId as keyof typeof PROGRAM_CAPACITY]) {
          PROGRAM_CAPACITY[progId as keyof typeof PROGRAM_CAPACITY].filled++;
        }
      }
      return res.json({ success: true });
    }

    try {
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (intent.status === 'succeeded') {
        if (leads[leadId]) {
          leads[leadId].status = 'confirmed';
          const progId = leads[leadId].programId;
          if (PROGRAM_CAPACITY[progId as keyof typeof PROGRAM_CAPACITY]) {
            PROGRAM_CAPACITY[progId as keyof typeof PROGRAM_CAPACITY].filled++;
          }
        }
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false, message: 'Payment not successful' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Verification failed' });
    }
  });

  app.post('/api/submit-waiver', (req, res) => {
    const { leadId, signedName } = req.body;
    if (leads[leadId]) {
      leads[leadId].waiverSigned = true;
      leads[leadId].signedName = signedName;
      leads[leadId].signedAt = Date.now();
      leads[leadId].ip = req.ip;
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Lead not found' });
    }
  });

  app.post('/api/contact', (req, res) => {
    console.log('Contact form submission:', req.body);
    res.json({ success: true, message: 'Message sent successfully.' });
  });

  // Admin API (Simple Auth)
  app.get('/api/admin/stats', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== 'Bearer admin123') return res.status(401).json({ success: false });

    const allLeads = Object.values(leads);
    const confirmedLeads = allLeads.filter(l => l.status === 'confirmed');

    // Registration trends (last 7 days)
    const trends = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString();
      const count = allLeads.filter(l => new Date(l.createdAt).toLocaleDateString() === dateStr).length;
      return { date: dateStr, count };
    }).reverse();

    // Program distribution
    const distribution = Object.keys(PROGRAM_CAPACITY).map(id => ({
      name: id,
      value: confirmedLeads.filter(l => l.programId === id).length
    }));

    res.json({
      success: true,
      stats: {
        totalLeads: allLeads.length,
        totalConfirmed: confirmedLeads.length,
        capacity: PROGRAM_CAPACITY,
        trends,
        distribution
      },
      leads: allLeads.sort((a, b) => b.createdAt - a.createdAt),
      gallery: galleryItems
    });
  });

  // Public Gallery API
  app.get('/api/gallery', (req, res) => {
    res.json({ success: true, items: galleryItems });
  });

  // Admin Gallery CRUD
  app.post('/api/admin/gallery', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== 'Bearer admin123') return res.status(401).json({ success: false });

    const { type, url, title, description } = req.body;
    const newItem = {
      id: Math.random().toString(36).slice(2, 9),
      type,
      url,
      title,
      description
    };
    galleryItems.unshift(newItem);
    res.json({ success: true, item: newItem });
  });

  app.put('/api/admin/gallery/:id', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== 'Bearer admin123') return res.status(401).json({ success: false });

    const { id } = req.params;
    const { type, url, title, description } = req.body;
    const index = galleryItems.findIndex(i => i.id === id);
    
    if (index !== -1) {
      galleryItems[index] = { ...galleryItems[index], type, url, title, description };
      res.json({ success: true, item: galleryItems[index] });
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
    }
  });

  app.delete('/api/admin/gallery/:id', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== 'Bearer admin123') return res.status(401).json({ success: false });

    const { id } = req.params;
    galleryItems = galleryItems.filter(i => i.id !== id);
    res.json({ success: true });
  });

  app.delete('/api/admin/leads/:id', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== 'Bearer admin123') return res.status(401).json({ success: false });

    const { id } = req.params;
    if (leads[id]) {
      delete leads[id];
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Lead not found' });
    }
  });

  app.delete('/api/admin/programs/:id', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== 'Bearer admin123') return res.status(401).json({ success: false });

    const { id } = req.params;
    if (PROGRAM_CAPACITY[id as keyof typeof PROGRAM_CAPACITY]) {
      delete PROGRAM_CAPACITY[id as keyof typeof PROGRAM_CAPACITY];
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Program not found' });
    }
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
