export default interface IGeoclusterFilters {
	clusterSizeSelect: number;
	adminLevelSelect: number;
	geoPolRegionSelect: string;
	proximityToMarketChk: boolean
	proximityToWaterChk: boolean;
	proximityToRoadChk: boolean
	proximityToFieldOfficeChk: boolean
	neverVisitedChk: boolean;
	rangeTimeframeSelect: string;
	visitedInLastRange: number;
}
