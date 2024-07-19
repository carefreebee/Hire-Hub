export function RemoveExtension(fileName: string): string {
	if (fileName.endsWith(".pdf")) {
		return fileName.slice(0, -4);
	} else if (fileName.endsWith(".docx")) {
		return fileName.slice(0, -5);
	}

	return fileName;
}
