type Geometry =
	| Point
	| MultiPoint
	| LineString
	| MultiLineString
	| Polygon
	| MultiPolygon
	| GeometryCollection;

type GeometryType = Geometry["type"];

type GeoJson = Geometry | IFeature | IFeatureCollection;
type GeoJsonType = GeoJson["type"];

type Position = [latitude: number, longitude: number, elevation?: number];

type Record = { [key in string | number]: unknown };

interface GeometryBase extends Record {
	bbox?: number[];
}

interface Point extends GeometryBase {
	type: "Point";
	coordinates: Position;
}

interface MultiPoint extends GeometryBase {
	type: "MultiPoint";
	coordinates: Position[];
}

interface LineString extends GeometryBase {
	type: "LineString";
	coordinates: { 0: Position; 1: Position } & Position[];
}

interface MultiLineString extends GeometryBase {
	type: "MultiLineString";
	coordinates: LineString["coordinates"][];
}

type LinearRing = { 0: Position; 1: Position; 2: Position; 3: Position } & Position[];

interface Polygon extends GeometryBase {
	type: "Polygon";
	coordinates: LinearRing[];
}

interface MultiPolygon extends GeometryBase {
	type: "MultiPolygon";
	coordinates: Polygon["coordinates"][];
}

interface GeometryCollection {
	type: "GeometryCollection";
	geometries: Geometry[];
}

// GeoJSON Types
interface IFeature {
	type: "Feature";
	id?: string | number;
	geometry: Geometry | null;
	properties: Record | null;
}

export default interface IFeatureCollection {
	type: "FeatureCollection";
	features: IFeature[];
}
