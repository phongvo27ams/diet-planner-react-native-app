import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const CreateMealPlan = mutation({
  args: {
    recipeId: v.id('recipes'),
    date: v.string(),
    mealType: v.string(),
    uid: v.id('users')
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('mealPlan', {
      recipeId: args.recipeId,
      date: args.date,
      mealType: args.mealType,
      uid: args.uid
    });
    return result;
  }
});

export const GetTodaysMealPlan = query({
  args: {
    uid: v.id('users'),
    date: v.string()
  },
  handler: async (ctx, args) => {
    // Fetch all meal plans
    const mealPlans = await ctx.db.query('mealPlan')
      .filter(q =>
        q.and(
          q.eq(q.field('uid'), args.uid),
          q.eq(q.field('date'), args.date)))
      .collect();

    // Fetch recipe belonging to meal plan
    const results = await Promise.all(
      mealPlans.map(async (mealPlan) => {
        const recipe = await ctx.db.get(mealPlan.recipeId);
        return {
          mealPlan,
          recipe
        }
      })
    )
    return results;
  }
});