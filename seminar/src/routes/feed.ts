import express from "express";
import feedStore from "../modules/feedStore";
import { z } from "zod";

const router = express.Router();

router.get("/getFeed", (req, res) => {
  try {
    const requestCount = parseInt(req.query.count as string, 10);
    const storeRes = feedStore.selectItems(requestCount);
    if (storeRes.success) {
      res.json(storeRes.data);
    } else {
      res.status(400).json(storeRes.data);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/addFeed", (req, res) => {
  try {
    const addSchema = z.object({
      title: z.string(),
      content: z.string(),
    });
    const { title, content } = addSchema.parse(req.body);
    const storeRes = feedStore.insertItem({ title, content });
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/deleteFeed", (req, res) => {
  try {
    const delSchema = z.object({
      id: z.string(),
    });
    const { id } = delSchema.parse(req.body);
    const storeRes = feedStore.deleteItem(parseInt(id as string, 10));
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/editFeed", (req, res) => {
  try {
    const editSchema = z.object({
      id: z.number(),
      newTitle: z.string(),
      newContent: z.string(),
    });
    const { id, newTitle, newContent } = editSchema.parse(req.body);
    const storeRes = feedStore.editItem(id,{newTitle, newContent});
    if (storeRes) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
