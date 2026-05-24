type Props = {
  kicker?: string;
  title: string;
  description?: string;
};

export function PageHeader({ kicker, title, description }: Props) {
  return (
    <header className="content-header">
      {kicker && <p className="content-kicker">{kicker}</p>}
      <h1 className="content-title">{title}</h1>
      {description && <p className="content-desc">{description}</p>}
    </header>
  );
}
