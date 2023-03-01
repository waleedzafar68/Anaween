export function canAccessLocalStorage() {
    try {
        return !!localStorage && typeof window !== undefined
    } catch (e) {
        return false
    }
}