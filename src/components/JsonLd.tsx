/**
 * Renders one or more JSON-LD structured-data blocks as <script> tags.
 * Use inside a server component (e.g. a page or layout).
 */

// Escape the characters that could let string content break out of the
// surrounding <script> tag (e.g. a literal "</script>" inside a blog title).
function serialize(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(item) }}
        />
      ))}
    </>
  );
}
