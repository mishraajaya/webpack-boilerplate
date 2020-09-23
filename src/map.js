import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { transform } from 'ol/proj'

import { TileWMS, OSM } from 'ol/source'
/* OR
import TileWMS from 'ol/source/TileWMS'
import OSM from 'ol/source/OSM'
*/

import MousePosition from 'ol/control/MousePosition'
import { defaults } from 'ol/control'
import { createStringXY } from 'ol/coordinate'


const centerCoordinate = transform([84.05, 28.4], 'EPSG:4326', 'EPSG:3857')

const backgroundLayer = new TileLayer({
  source: new OSM()
})

const nepalBoundaryLayer = new TileLayer({
  source: new TileWMS({
    url: 'http://localhost:8080/geoserver/webgisCSIT/wms',
    params: {
      'layers': 'webgisCSIT:nepal_boundary'
    }
  }),
  opacity: 0.3
})

const view = new View({
  center: centerCoordinate,
  zoom: 7
})

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  target: 'mouse-position',
  undefinedHTML: '&nbsp;'
})

new Map({
  target: 'map',
  layers: [backgroundLayer, nepalBoundaryLayer],
  view: view,
  controls: defaults({
    attribution: false
  }).extend([mousePositionControl])
});