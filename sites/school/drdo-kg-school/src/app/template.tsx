/** Re-mounts on every navigation, so each route gets the gentle CSS fade-in from globals.css. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
