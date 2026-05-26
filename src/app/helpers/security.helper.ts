/**
 * Generates a nonce for Webview content security policies.
 *
 * @returns {string} Pseudo-random string used to gate inline scripts.
 */
export const getNonce = (): string => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let index = 0; index < 32; index++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
};
