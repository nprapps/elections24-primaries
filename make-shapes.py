"""
Shapefiles are from https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html
"""

import csv 
import subprocess
import os

try: 
	os.mkdir("counties")
	os.mkdir("states")
except:
	pass

with open("FIPS_codes.csv") as f:
	reader = csv.DictReader(f)
	for row in reader:
		state = row["Postal code"]
		fips = row["FIPS code"]
		lat = row["Lat"]
		lon = row["Lon"]
		countyCommand = '''mapshaper cb_2018_us_county_5m.shp -proj +proj=ortho +lat_0=%s +lon_0=%s +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs -filter "STATEFP == \'%s\'" -each "id = 'fips-' + STATEFP + COUNTYFP" -o format=svg id-field=id counties/%s.svg''' % (lat,lon,fips,state)
		stateCommand = '''mapshaper cb_2018_us_state_5m.shp -proj +proj=ortho +lat_0=%s +lon_0=%s +x_0=0 +y_0=0 +a=6371000 +b=6371000 +units=m +no_defs -filter "STATEFP == \'%s\'" -o format=svg states/%s.svg''' % (lat,lon,fips,state)
		subprocess.call(countyCommand, shell = True)
		subprocess.call(stateCommand, shell = True)

