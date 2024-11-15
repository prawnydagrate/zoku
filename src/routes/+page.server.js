import { redirect } from "@sveltejs/kit";

export function load() {
    redirect(302, `/edit/${"0".repeat(81)}`);
}