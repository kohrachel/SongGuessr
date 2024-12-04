export function SiteFooter(): JSX.Element {
  return (
    <footer className="bg-emerald-950 px-2 py-1 text-center justify-center w-screen">
      <p>Made with love by Rachel Koh :) | &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
