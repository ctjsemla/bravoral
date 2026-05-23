export function Footer() {
  return (
    <footer className="mt-24 border-t border-[#E5E7EB]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-4 py-6 text-xs text-[#6B7280] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} BrasilOdds</p>
        <p>Este site não oferece conselhos de apostas. Odds apenas para comparação.</p>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-[#0A0A0A]">
            CBF
          </a>
          <a href="#" className="hover:text-[#0A0A0A]">
            Série A
          </a>
          <a href="#" className="hover:text-[#0A0A0A]">
            Copa do Brasil
          </a>
        </nav>
      </div>
    </footer>
  );
}
