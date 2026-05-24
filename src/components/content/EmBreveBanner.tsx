type Props = {
  title?: string;
  message?: string;
  hint?: string;
};

export function EmBreveBanner({
  title = "Em breve",
  message = "Estamos preparando esta seção para você.",
  hint,
}: Props) {
  return (
    <div className="em-breve" role="status">
      <span className="em-breve__badge">{title}</span>
      <p className="em-breve__msg">{message}</p>
      {hint && <p className="em-breve__hint">{hint}</p>}
    </div>
  );
}
