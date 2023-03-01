export function canAccessSessionStorage() {
    try {
        return !!sessionStorage && typeof window !== undefined
    } catch (e) {
        return false
    }
}