all: create_zip

deps:
	cd pokladna; npm install @patternfly/patternfly --save
	cd pokladna; ln -sf node_modules/@patternfly/patternfly/patternfly.css
	cd pokladna; ln -sf node_modules/@patternfly/patternfly/patternfly-addons.css

create_zip: deps
	zip -r build/pokladna.zip pokladna/index.html *.csv main.js *.css node*


