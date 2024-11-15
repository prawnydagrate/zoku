import { loadGridstr } from '$lib/utils.js';
import { error } from '@sveltejs/kit';

export async function load({ params: { gridstr } }) {
    return loadGridstr(gridstr);
}