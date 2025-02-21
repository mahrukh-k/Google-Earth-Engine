// ================= Processing Google Earth Engine data ==========================

// 1) Generate a basic map 

// Step-1: import data using ImageCollection ID
var d1 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG');

// Step-2: filter for date range and select band of interest
var d2 = d1.filter(ee.Filter.date('2024-05-01', '2024-05-30'))
                  .select('avg_rad');
                  
// Step-3: visualize
// Map.addLayer(d2, {palette: ['black', 'white'],  min:0, max: 10}, 'VIIRS May 2024')

// 2) Generate country map

// Step-1: country boundary from LSIB 2017: Large Scale International Boundary Polygons
var country_boundary = ee.FeatureCollection('USDOS/LSIB/2017')
  .filter(ee.Filter.eq('COUNTRY_NA', 'Pakistan'));
  
Map.addLayer(country_boundary, {}, 'Pakistan');
Map.centerObject(country_boundary, 6)

// Step-2: import data from VIIRS Stray Light Corrected Nighttime Day/Night Band Composites Version 1
var data = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
                  .filter(ee.Filter.date('2024-05-01', '2024-05-30'))
                  .select('avg_rad');
                  
// Step-3: clip data to country boundary                  
var data_clipped = data.median().clipToCollection(country_boundary)

Map.addLayer(data_clipped, {palette: ['black', 'white'], min:0, max: 7}, 'Pakistan VIIRS May 2024');

// 3) Generate country map for multiple years

// Step-1: country boundary from LSIB 2017: Large Scale International Boundary Polygons

var country_boundary = ee.FeatureCollection('USDOS/LSIB/2017')
  .filter(ee.Filter.eq('COUNTRY_NA', 'Pakistan'));
  
Map.addLayer(country_boundary, {}, 'Pakistan');
Map.centerObject(country_boundary, 6)

// Step-2: import data from VIIRS Stray Light Corrected Nighttime Day/Night Band Composites Version 1
var data1 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
                  .filter(ee.Filter.calendarRange(2014, 2014, 'year'))
                  .select('avg_rad');
                  
var data2 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
                  .filter(ee.Filter.calendarRange(2024, 2024, 'year'))
                  .select('avg_rad');          
                  
// Step-3: clip data to country boundary                  
var data1_clipped = data.median().clipToCollection(country_boundary)
var data2_clipped = data.median().clipToCollection(country_boundary)

Map.addLayer(data1_clipped, {palette: ['black', 'white'], min:0, max: 7}, 'Pakistan VIIRS 2014');
Map.addLayer(data2_clipped, {palette: ['black', 'white'], min:0, max: 7}, 'Pakistan VIIRS 2024');