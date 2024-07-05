export function CheckPathname(pathname: string) {
	const segments = pathname.split("/");
	return segments[segments.length - 1];
}
