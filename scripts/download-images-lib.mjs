export const originalUrl = (u) => u.split('/v1/')[0].split('?')[0];
export const slugify = (s) => (s || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, ' and ').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
