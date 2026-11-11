type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className="brand">
      <img className="brand__mark" src="./icon.svg" alt="" width="40" height="40" />
      {!compact && <span className="brand__name">vn studio</span>}
    </span>
  );
}
