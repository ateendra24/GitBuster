export const API_KEY_STORAGE_KEY = 'user_gemini_api_key';
export const API_KEY_EVENT = 'user-api-key-changed';

export function getStoredApiKey(): string {
    if (typeof window === 'undefined') return '';
    try {
        return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
    } catch {
        return '';
    }
}

export function setStoredApiKey(key: string): void {
    if (typeof window === 'undefined') return;
    try {
        const trimmed = key.trim();
        if (trimmed) {
            localStorage.setItem(API_KEY_STORAGE_KEY, trimmed);
        } else {
            localStorage.removeItem(API_KEY_STORAGE_KEY);
        }
        window.dispatchEvent(new CustomEvent(API_KEY_EVENT, { detail: trimmed }));
    } catch (e) {
        console.error('Failed to store API key in localStorage:', e);
    }
}

export function removeStoredApiKey(): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(API_KEY_STORAGE_KEY);
        window.dispatchEvent(new CustomEvent(API_KEY_EVENT, { detail: '' }));
    } catch (e) {
        console.error('Failed to remove API key from localStorage:', e);
    }
}
