export function Botonera({ setContent, content, catalog, scrollToTop }) {
  return (
    <div id="botonera">
      <button
        onClick={() => {
          scrollToTop();
          setContent(catalog?.helados);
          /* window.scrollTo(0, 0); */
        }}
        className={content === catalog?.helados && content ? "active" : ""}
      >
        Helados
      </button>

      <button
        onClick={() => {
          setContent(catalog?.escabio);
          scrollToTop();
          /* window.scrollTo(0, 0); */
        }}
        className={content === catalog?.escabio && content ? "active" : ""}
      >
        Bebidas
      </button>
      <button
        onClick={() => {
          setContent(null);
          scrollToTop();
        }}
        className={content === null && catalog ? "active" : ""}
      >
        Snacks
      </button>
    </div>
  );
}
