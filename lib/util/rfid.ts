/**
 * Reverses the byte order of a hexadecimal string, potentially resolving discrepancies between scanned RFID tag IDs and actual serial numbers.
 *
 * @param {string} hexString - The hexadecimal string to reverse.
 * @returns {string} The reversed hexadecimal string.
 */
export const reverseHexString = (hexString: string): string => {
  // The discrepancy between the scanned RFID tag ID and the actual serial number is likely due to the byte order or encoding used when reading the tag ID. The NFC chip may be presenting the ID in a different format than expected.
  // To resolve this issue, you can try converting the scanned tag ID to match the expected format. This often involves reversing the byte order (endianness) of the tag ID.
  const bytes = hexString.match(/.{1,2}/g); // Split into pairs of characters
  if (!bytes) return hexString; // Return original string if splitting fails

  const reversedBytes = bytes.reverse(); // Reverse array of bytes
  return reversedBytes.join('');
};
