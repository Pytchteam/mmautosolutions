import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });

  // API Endpoints
  app.post("/api/financing-application", async (req, res) => {
    const data = req.body;
    const referenceId = `FA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    console.log("Financing Application Received:", data);

    // Send Email Notification if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'M&M Auto Solutions <notifications@mm-auto.solutions>',
          to: ['team@pytchmarketing.com'], // Admin email
          subject: `New Financing Application: ${referenceId}`,
          html: `
            <h1>New Financing Application</h1>
            <p><strong>Reference ID:</strong> ${referenceId}</p>
            <p><strong>Customer:</strong> ${data.customer_name}</p>
            <p><strong>Phone:</strong> ${data.customer_phone}</p>
            <p><strong>Asset Type:</strong> ${data.asset_type}</p>
            <p><strong>Quote Amount:</strong> JMD ${data.quote_amount}</p>
            <p><strong>Income Band:</strong> ${data.income_band}</p>
            <hr />
            <p>Please log in to the admin portal to review this application.</p>
          `
        });
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    }

    res.json({ success: true, referenceId });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
