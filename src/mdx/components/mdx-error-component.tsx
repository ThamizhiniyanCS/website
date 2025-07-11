type Props = {
  error: Error | string;
};

export default function MdxErrorComponent({ error }: Props) {
  return (
    <div id="mdx-error">
      <pre style={{ color: "var(--error)" }}>
        <h1>Error</h1>
        <code>{typeof error === "string" ? error : error.message}</code>
      </pre>
    </div>
  );
}
