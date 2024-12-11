import type { APIRoute } from "astro";
import { simpleProxy } from "../../lib/simple-gtm-proxy";

export const prerender = false;

export const ALL: APIRoute = async ({ request, url }) => {
  return simpleProxy("G-8S62NVDMP9.fps.goog", request, url);
};
