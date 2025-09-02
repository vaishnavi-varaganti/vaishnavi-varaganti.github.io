import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server - ultra minimal setup for serving static assets only
  const httpServer = createServer(app);
  return httpServer;
}
