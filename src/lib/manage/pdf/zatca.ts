/**
 * ZATCA (Saudi tax authority) Phase-1 simplified tax-invoice QR code.
 *
 * The QR payload is a base64-encoded TLV (tag–length–value) sequence of five
 * fields, in this exact order:
 *
 *   1  seller name              2  seller VAT registration number
 *   3  invoice timestamp (ISO)  4  invoice total INCLUDING VAT
 *   5  VAT total
 *
 * Length is the byte length of the UTF-8 encoded value, not its character
 * count — Arabic seller names are multi-byte, so counting characters produces
 * a QR that scanners reject.
 */

function tlv(tag: number, value: string): Uint8Array {
  const bytes = new TextEncoder().encode(value);
  // A single length byte caps a field at 255 bytes. Nothing legitimate gets
  // near that, but truncate rather than emit a corrupt tag.
  const truncated = bytes.length > 255 ? bytes.slice(0, 255) : bytes;
  const out = new Uint8Array(truncated.length + 2);
  out[0] = tag;
  out[1] = truncated.length;
  out.set(truncated, 2);
  return out;
}

export type ZatcaFields = {
  sellerName: string;
  vatNumber: string;
  /** ISO-8601 timestamp of the invoice. */
  timestamp: string;
  /** Total payable, VAT included. */
  totalWithVat: number;
  /** VAT portion only. */
  vatTotal: number;
};

export function zatcaQrPayload(fields: ZatcaFields): string {
  const parts = [
    tlv(1, fields.sellerName),
    tlv(2, fields.vatNumber),
    tlv(3, fields.timestamp),
    tlv(4, fields.totalWithVat.toFixed(2)),
    tlv(5, fields.vatTotal.toFixed(2)),
  ];

  const total = parts.reduce((n, p) => n + p.length, 0);
  const buffer = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    buffer.set(part, offset);
    offset += part.length;
  }

  return Buffer.from(buffer).toString("base64");
}

/** A ZATCA QR is only meaningful when VAT was actually charged and the seller
 * has a registered VAT number. Everything else gets a plain invoice. */
export function shouldEmitZatcaQr(vatNumber: string | null | undefined, vatAmount: number) {
  return Boolean(vatNumber && vatNumber.trim()) && vatAmount > 0;
}
