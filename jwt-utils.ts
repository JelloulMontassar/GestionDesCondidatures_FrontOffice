export function decodeToken(token: string): any {
    if (!token) {
        return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts');
    }

    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
}

export function getUserIdFromToken(token: string): string | null {
    const decodedToken = decodeToken(token);
    return decodedToken ? decodedToken.id : null; // Adjust based on your token structure
}
