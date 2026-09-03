export function TranslateLoader() {
  return (
    <div
      id="hbk-translate-loader"
      className="notranslate"
      translate="no"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="hbk-translate-spinner" />
    </div>
  );
}
