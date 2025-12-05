// Cloudflare Worker with Static Assets
// The ASSETS binding is configured in wrangler.jsonc

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Example: Handle API routes differently
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ message: 'API endpoint' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Serve static assets using the ASSETS binding
    try {
      const response = await env.ASSETS.fetch(request);
      
      // Add security headers
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('X-Content-Type-Options', 'nosniff');
      newResponse.headers.set('X-Frame-Options', 'DENY');
      
      return newResponse;
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  },
};
