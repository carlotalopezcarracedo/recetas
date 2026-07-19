type VersionBadgeProps = { version: string };

export function VersionBadge({ version }: VersionBadgeProps) {
  return <span className="version-badge">Versión {version}</span>;
}
