// Detect inline limiters and middleware variables initialized from the limiter factories.
module.exports = (context, route) => {
  const args = `${route.mountArgs || ""},${route.args}`;
  if (/rateLimit|Limiter|limiter/i.test(args)) return true;
  const identifiers = new Set(args.match(/\b[A-Za-z_]\w*\b/g) || []);
  for (const match of context.read(route.routeFile).matchAll(/\bconst\s+(\w+)\s*=\s*(?:pageRateLimit|createRateLimiter)\s*\(/g)) {
    if (identifiers.has(match[1])) return true;
  }
  return false;
};
