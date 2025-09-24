// backend/src/routes.ts
import { Router, Request, Response } from "express";
import { runBulkEmails } from "./controllers/emailController";
import { getState } from "./worker/bulkWorker";

const router = Router();

/**
 * Healthcheck
 */
router.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "email-api" });
});

/**
 * Iniciar el envío masivo (lee /data/abogados.json, 1 email/s, 499/día)
 * Body: { subject: string, message: string }
 */
router.post("/email/run-bulk", runBulkEmails);

/**
 * Estado del worker (opcional, útil para el dashboard)
 */
router.get("/email/status", (_req: Request, res: Response) => {
  try {
    const s = getState();
    res.json({ ok: true, ...s });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || String(e) });
  }
});

export default router;
