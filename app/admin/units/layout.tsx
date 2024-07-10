export default async function layout({ children }: { children: React.ReactNode }) {
	return <div className="mx-auto">{children}</div>;
}
