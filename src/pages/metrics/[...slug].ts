import type { APIRoute } from "astro";

export const prerender = false;

export const ALL: APIRoute = async ({ request, url }) => {
  /*
  This is a trivial implementation of a measurement proxy, for experimentation purposes only.
  An real implementation should use a edge-based proxy as described in 
  [the documentation](https://developers.google.com/tag-platform/tag-manager/first-party/setup-guide?setup=manual).

  This implements the requirement "Override the Host header to be equal to GTM-5MHWC3NR.fps.goog. Allow all cookies and query strings to be forwarded."
  */
  const headers = {
    ...Object.fromEntries(Array.from(request.headers)),
    Host: "GTM-5MHWC3NR.fps.goog",
  };
  const targetUrl = `https://GTM-5MHWC3NR.fps.goog${url.pathname}${url.search}`;

  console.log("fetching", { targetUrl, headers });
  const r = await fetch(targetUrl, {
    headers,
  });

  console.log("returning", {
    headers: Object.fromEntries(Array.from(r.headers)),
    status: r.status,
  });
  return r;
};
