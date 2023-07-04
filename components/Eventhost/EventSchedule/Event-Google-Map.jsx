import React, { useRef, useState, useEffect } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, Marker, InfoWindow } from '@react-google-maps/api';
import { DeleteFilled } from "@ant-design/icons";
import { apiBaseUrl } from "@/utils/baseUrl";

const MapComponent = ({ polygons, setPolygons, setCenterAddress }) => {

	const mapRef = useRef();
	const polygonRefs = useRef([]);
	const activePolygonIndex = useRef();
	const autocompleteRef = useRef();
	const drawingManagerRef = useRef();
	const faviconUrl = `${apiBaseUrl}`;

	const defaultCenter = {
		lat: 28.626137,
		lng: 79.821603,
	}

	const markerOptions = {
		icon: {
			url: `${faviconUrl}/event.png`,
			scaledSize: new window.google.maps.Size(32, 32),
			origin: new window.google.maps.Point(0, 0),
			anchor: new window.google.maps.Point(16, 32)
		}
	}

	const [center, setCenter] = useState(defaultCenter);
	const [selectedAreaCenter, setSelectedAreaCenter] = useState(null);
	const [selectedMarker, setSelectedMarker] = useState(null);
	const onMarkerClick = (marker) => {
		// Handle marker click event
		setSelectedMarker(marker);
	}

	const containerStyle = {
		width: '100%',
		height: '400px',
	}

	const autocompleteStyle = {
		boxSizing: 'border-box',
		border: '1px solid transparent',
		width: '240px',
		height: '38px',
		padding: '0 12px',
		borderRadius: '3px',
		boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
		fontSize: '14px',
		outline: 'none',
		textOverflow: 'ellipses',
		position: 'absolute',
		right: '8%',
		top: '11px',
		marginLeft: '-120px',
	}

	const deleteIconStyle = {
		cursor: 'pointer',
		padding: '4px',
		height: '24px',
		width: '24px',
		marginTop: '5px',
		backgroundColor: '#fff',
		position: 'absolute',
		left: "53%",
		zIndex: 99999
	}

	const polygonOptions = {
		fillOpacity: 0.3,
		fillColor: '#ff0000',
		strokeColor: '#ff0000',
		strokeWeight: 2,
		draggable: true,
		editable: true
	}

	const drawingManagerOptions = {
		polygonOptions: polygonOptions,
		drawingControl: true,
		drawingControlOptions: {
			position: window.google?.maps?.ControlPosition?.TOP_CENTER,
			drawingModes: [
				window.google?.maps?.drawing?.OverlayType?.POLYGON
			]
		}
	}

	const onLoadMap = (map) => {
		mapRef.current = map;
	}

	const onLoadPolygon = (polygon, index) => {
		polygonRefs.current[index] = polygon;
	}

	const onClickPolygon = (index) => {
		activePolygonIndex.current = index;
	}

	const onLoadAutocomplete = (autocomplete) => {
		autocompleteRef.current = autocomplete;

		const options = {
			types: ['geocode'],
			componentRestrictions: { country: 'US' }
		};
		autocomplete.setOptions(options);
	}

	const onPlaceChanged = () => {
		const { geometry } = autocompleteRef.current.getPlace();
		const bounds = new window.google.maps.LatLngBounds();
		if (geometry.viewport) {
			bounds.union(geometry.viewport);
		} else {
			bounds.extend(geometry.location);
		}
		mapRef.current.fitBounds(bounds);
	}

	const onLoadDrawingManager = drawingManager => {
		drawingManagerRef.current = drawingManager;
	}

	const calculatePolygonCenter = (polygon) => {
		const bounds = new window.google.maps.LatLngBounds();
		polygon.forEach((point) => {
			bounds.extend(point);
		});
		return bounds.getCenter();
	}

	const onOverlayComplete = ($overlayEvent) => {
		drawingManagerRef.current.setDrawingMode(null);
		if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
			const newPolygon = $overlayEvent.overlay.getPath()
				.getArray()
				.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))

			// start and end point should be same for valid geojson
			const startPoint = newPolygon[0];
			newPolygon.push(startPoint);
			$overlayEvent.overlay?.setMap(null);
			setPolygons([newPolygon]);

			// Get selected area information
			const polygonBounds = new window.google.maps.LatLngBounds();
			newPolygon.forEach(point => {
				polygonBounds.extend(point);
			});
			const area = window.google.maps.geometry.spherical.computeArea(newPolygon);
			const center = polygonBounds.getCenter();

			const geocoder = new window.google.maps.Geocoder();
			geocoder.geocode({ location: center }, (results, status) => {
				if (status === "OK" && results[0]) {
					setCenterAddress({
						address: results[0].formatted_address,
						latitude: center.lat(),
						longitude: center.lng()
					})
				}
			});

			const newCenter = calculatePolygonCenter(newPolygon);
			setSelectedAreaCenter(newCenter);
		}
	}

	const onDeleteDrawing = () => {
		const filtered = polygons?.filter((polygon, index) => index !== activePolygonIndex.current)
		setPolygons(filtered)
	}

	const onEditPolygon = (index) => {
		const polygonRef = polygonRefs.current[index];
		if (polygonRef) {
			const coordinates = polygonRef.getPath()
				.getArray()
				.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }));

			const allPolygons = [...polygons];
			allPolygons[index] = coordinates;
			setPolygons(allPolygons);
			const newCenter = calculatePolygonCenter(allPolygons);
			setSelectedAreaCenter(newCenter);
		}
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords;
			setCenter({
				lat: latitude,
				lng: longitude,
			});
		});
	}, []);

	return (
		<div className='map-container' style={{ position: 'relative' }}>
			{
				drawingManagerRef.current
				&&
				<DeleteFilled
					onClick={onDeleteDrawing}
					style={deleteIconStyle}
					title='Delete shape'
				/>
			}
			<GoogleMap
				zoom={15}
				center={center}
				onLoad={onLoadMap}
				mapContainerStyle={containerStyle}
				onTilesLoaded={() => setCenter(null)}
			>
				<DrawingManager
					onLoad={onLoadDrawingManager}
					onOverlayComplete={onOverlayComplete}
					options={drawingManagerOptions}
				/>
				{
					polygons?.map((iterator, index) => (
						<React.Fragment key={index}>
							<Polygon
								key={index}
								onLoad={(event) => onLoadPolygon(event, index)}
								onMouseDown={() => onClickPolygon(index)}
								onMouseUp={() => onEditPolygon(index)}
								onDragEnd={() => onEditPolygon(index)}
								options={polygonOptions}
								paths={iterator}
								draggable
								editable
							/>
							{selectedAreaCenter && (
								<Marker
									position={selectedAreaCenter}
									onClick={() => onMarkerClick(selectedAreaCenter)}
									options={markerOptions}
								/>

							)}
							{selectedMarker && (
								<InfoWindow
									anchor={selectedMarker}
									onCloseClick={() => setSelectedMarker(null)}
								>
									<div>
										<h3>Marker Info Window</h3>
										<p>This is the info window content.</p>
									</div>
								</InfoWindow>
							)}
						</React.Fragment>
					))
				}
				<Autocomplete
					onLoad={onLoadAutocomplete}
					onPlaceChanged={onPlaceChanged}
				>
					<input
						type='text'
						placeholder='Search Location'
						style={autocompleteStyle}
					/>
				</Autocomplete>
			</GoogleMap>
		</div>

	);
}

export default MapComponent;
