export default function Header({ children }) {
  return (
    <div id="header">
      <img
        src="/investment-calculator-logo.png"
        alt="Investment Calculator Logo"
      />
      <h1>{children}</h1>
    </div>
  );
}
