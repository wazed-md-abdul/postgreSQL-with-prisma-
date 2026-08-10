import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/hello", (req, res) => {
  res.json({ message: "hello world" });
});

router.get("/users", (req, res) => {
  res.json({ message: "hello world" });
});


export default router;
