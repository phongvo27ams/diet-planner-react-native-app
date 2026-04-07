import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  User: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.optional(v.string()),
    subscriptionId: v.optional(v.string()),
    credit: v.number(),
    height: v.optional(v.string()),
    weight: v.optional(v.string()),
    gender: v.optional(v.string()),
    goal: v.optional(v.string())
  })
})