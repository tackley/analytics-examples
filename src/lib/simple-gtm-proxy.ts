export async function simpleProxy(
  targetHost: string,
  request: Request,
  requestedUrl: URL
): Promise<Response> {
  /*
  This is a trivial implementation of a measurement proxy, for experimentation purposes only.
  An real implementation should use a edge-based proxy as described in 
  [the documentation](https://developers.google.com/tag-platform/tag-manager/first-party/setup-guide?setup=manual).

  This implements the requirement "Override the Host header to be equal to GTM-5MHWC3NR.fps.goog. Allow all cookies and query strings to be forwarded."
  */
  const headers = {
    ...Object.fromEntries(Array.from(request.headers)),
    Host: targetHost,
  };
  const targetUrl = `https://${targetHost}${requestedUrl.pathname}${requestedUrl.search}`;

  console.log("fetching", { targetUrl, headers });
  const r = await fetch(targetUrl, {
    headers,
    method: request.method,
  });

  // fetch transparently decompresses responses, but leaves the encoding header
  // so return the uncompressed response but remove the header
  const responseHeaders = Object.fromEntries(Array.from(r.headers));
  delete responseHeaders["content-encoding"];
  delete responseHeaders["content-length"];

  console.log("returning", {
    headers: responseHeaders,
    status: r.status,
  });

  return new Response(r.body, {
    headers: responseHeaders,
    status: r.status,
  });
}
