import type { APIRoute } from "astro";
import { simpleProxy } from "../../lib/simple-gtm-proxy";

export const prerender = false;

export const ALL: APIRoute = async ({ request, url }) => {
  return simpleProxy("GTM-5MHWC3NR.fps.goog", request, url);
};
