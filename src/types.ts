export interface dataConfig {
	BaseImageUrl: string;
	Id: string;
	TemplateId: string;
	ConfigId: string;
	StyleId: string;
	StyleName: string;
	Positions: Position[];
}

export interface Color {
	Id: string;
	Name: string;
	SwatchUrl: string;
}

export interface Material {
	Id: string;
	Name: string;
	Colors: Color[];
}

export interface Position {
	ImageUrl: string;
	Position: string;
	Materials: Material[];
}
