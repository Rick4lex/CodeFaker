export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {currentYear} Code Foco. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
