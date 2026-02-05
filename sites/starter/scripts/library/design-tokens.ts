import { BaseComponent } from './base/basecomponent';

// START Figma API specific interfaces
class FigmaType  {
	public static Document: string = "DOCUMENT";
	public static Frame: string = "FRAME";
	public static Instance: string = "INSTANCE";
}

interface IFigmaObject {
	document: IFigmaNode;
}

interface IFigmaNode {
	id: string;
	name: string;
	type: string;
	children: IFigmaNode[];
	fills?: IFigmaFills[];
	style?: IFigmaStyle;
	absoluteBoundingBox?: IAbsoluteBoundingBox;
}

interface IFigmaFills {
	color: IRgb;
	type: string;
}

interface IRgb {
	r: number;
	g: number;
	b: number;
}

interface IFigmaStyle {
	fontFamily: string;
	fontPostScriptName: string;
	fontSize: number;
	fontWeight: number;
	lineHeightPercentFontSize: number;
	letterSpacing: number;
	paragraphSpacing: number;
	textDecoration: string;
	color: IRgb;
	type: string;
}

interface IAbsoluteBoundingBox {
	height: number;
	width: number;
	x: number;
	y: number;
}

// END Figma API specific interfaces

export class DesignToken extends BaseComponent {
	private readonly FORM__SELECTOR: string = ".js-form";

	constructor(element: HTMLElement) {
        super(element);

        if (!this.element) return;
        this.init();
	}

	init():void{
		this.initializeClick();
	}

	private initializeClick(){
		document.getElementById("btn").onclick = async () => {
			const figmaId = this.getFigmaId().toString();
			const figmaToken = this.getFigmaToken().toString();
			const figmaObjTree = await this.getFigmaObjTree(figmaId, figmaToken);

			console.log(figmaObjTree);

			const colors = this.generateColors(figmaObjTree.document);
			const typography = this.generateTypography(figmaObjTree.document);
			const spacings = this.generateSpacings(figmaObjTree.document);

			var tokensJSON = {
				token: {
					colors: colors,
					typography: typography,
					spacings: spacings
				}
			};

			this.download(
				JSON.stringify(tokensJSON, null, 4),
				"design-tokens.json",
				"application/json"
			)
		}
	}

	private getFigmaId(){
		var $formInputValue = document.querySelector<HTMLInputElement>('.js-figma-id').value;
		return $formInputValue;
	}

	private getFigmaToken(){
		var $formInputValue = document.querySelector<HTMLInputElement>('.js-figma-token').value;
		return $formInputValue;
	}

	private async getFigmaObjTree(id: string, token: string) {
		// g6awZ1ltyhv60oP6F2FoKU
		// 138565-861c679a-7f7c-496e-ab82-90948d0a7fce
		if(id != null || token != null){
			const result = await fetch("https://api.figma.com/v1/files/" + id , {
				method: "GET",
				headers: {
					"X-Figma-Token": token
				}
			});

			return await result.json() as IFigmaObject;
		}

		return null;
	}

	private findNode(node: IFigmaNode, name: string, type: string): IFigmaNode {
		if(!node) {
			return null;
		}

		if(node.name.indexOf(name) > -1 && node.type.indexOf(type) > -1) {
			return node;
		}

		if(!node.children || !node.children.length) {
			return null;
		}

		for(let x of node.children) {
			const node = this.findNode(x, name, type);

			if(node != null) {
				return node;
			}
		}

		return null;
	}

	private toRgbString(rgba: IRgb) {
		return `${Math.floor(rgba.r * 0xFF)},${Math.floor(rgba.g * 0xFF)},${Math.floor(rgba.b * 0xFF)}`;
	}

	private RGBtoHEX(rgb: string) {
		  var rgbValueArray = rgb.split(',');
		  var redValue = rgbValueArray[0];
		  var greenValue = rgbValueArray[1];
		  var blueValue = rgbValueArray[2];

		  var rgbToHex = function (rgb) {
			var hex = Number(rgb).toString(16);
			if (hex.length < 2) {
				 hex = "0" + hex;
			}
			return hex;
		  };

		  var fullColorHex = function(r,g,b) {
			var red = rgbToHex(r);
			var green = rgbToHex(g);
			var blue = rgbToHex(b);

			var hex = "#" + red + green + blue;
			return hex;
		  };

		  return fullColorHex(redValue, greenValue, blueValue);
	}

	private RGBtoHSL(rgb: string) {
		var rgbValueArray = rgb.split(',');
		var redValue = rgbValueArray[0];
		var redValueNumber = parseInt(redValue);
		var greenValue = rgbValueArray[1];
		var greenValueNumber = parseInt(greenValue);
		var blueValue = rgbValueArray[2];
		var blueValueNumber = parseInt(blueValue);

		// make r, g, and b fractions of 1
		let r = redValueNumber / 255,
		g = greenValueNumber / 255,
		b = blueValueNumber / 255,

		// find greatest and smallest channel values
		cmin = Math.min(r,g,b),
		cmax = Math.max(r,g,b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

		// calculate hue
		// no difference
		if (delta == 0)
		h = 0;
		// red is max
		else if (cmax == r)
		h = ((g - b) / delta) % 6;
		// green is max
		else if (cmax == g)
		h = (b - r) / delta + 2;
		// blue is max
		else
		h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// make negative hues positive behind 360°
		if (h < 0)
		h += 360;

		// calculate lightness
		l = (cmax + cmin) / 2;

		// calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return "hsl(" + h + "," + s + "%," + l + "%)";
	}

	private generateColors(node: IFigmaNode): any {
		const map = <any>{};

		// Find the correct Colors node.
		const colorsNode = this.findNode(this.findNode(node, "VI / Colors", FigmaType.Frame), "Colors", FigmaType.Frame);

		for(let node of colorsNode.children) {
			for(let nodeChild of node.children) {
				for(let color of nodeChild.children) {
					var rgbValue = this.toRgbString(color.fills[0].color);
					map[color.name.toLowerCase()] = {
						name: color.name.toLowerCase(),
						rgb: rgbValue,
						hex: this.RGBtoHEX(rgbValue),
						hsl: this.RGBtoHSL(rgbValue),
						type: "color"
					}
				}
			}
		}

		return map;
	}

	private generateTypography(node: IFigmaNode): any {
		const map = <any>{};

		// Find the correct Colors node.
		const typographyNode = this.findNode(this.findNode(node, "VI / Typography", FigmaType.Frame), "Typography", FigmaType.Frame);

		for(let node of typographyNode.children) {
			for(let nodeChild of node.children) {
				for(let style of nodeChild.children) {
					var rgbValue = this.toRgbString(style.fills[0].color);

					map[style.name.toLowerCase()] = {
						name: style.name.toLowerCase(),
						fontFamily: style.style.fontFamily,
						fontPostScriptName: style.style.fontPostScriptName,
						fontSize: style.style.fontSize + "px",
						fontWeight: style.style.fontWeight,
						lineHeightPercentFontSize: Math.floor(style.style.lineHeightPercentFontSize) + "%",
						letterSpacing: style.style.letterSpacing + "px",
						paragraphSpacing: style.style.paragraphSpacing + "px",
						textDecoration: style.style.textDecoration,
						rgb: rgbValue,
						hex: this.RGBtoHEX(rgbValue),
						type: "typography"
					}
				}
			}
		}

		return map;
	}

	private generateSpacings(node: IFigmaNode): any {
		const map = <any>{};

		// Find the correct Colors node.
		const spacingsNode = this.findNode(this.findNode(node, "VI / Spacing", FigmaType.Frame), "Spacing", FigmaType.Frame);

		for(let node of spacingsNode.children) {
			for(let spacing of node.children) {
				map[spacing.name.toLowerCase()] = {
					name: spacing.name.toLowerCase(),
					value: spacing.absoluteBoundingBox.height + "px",
					type: "spacing"
				}
			}
		}

		return map;
	}

	private download(content, fileName, contentType) {
		var a = document.createElement("a");
		var file = new Blob([content], { type: contentType });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}
}
