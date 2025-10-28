const Footer: React.FC = () => (
  <footer className="border-t border-emerald-100/70 backdrop-blur dark:border-gray-800">
    <div className="px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p>© <span>{new Date().getFullYear()}</span> Bloom — Minimal Plant Shop</p>
        <p className="opacity-80">Web-Frontend Develop</p>
      </div>
    </div>
  </footer>
);
export default Footer;
