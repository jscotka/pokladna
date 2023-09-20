deps:
	npm install @patternfly/patternfly --save
	cp node_modules/@patternfly/patternfly/patternfly.css patternfly.css
	cp node_modules/@patternfly/patternfly/patternfly-addons.css
create_zip: deps
	zip pokladna.zip index.html *.csv main.js

all: creta_zip

